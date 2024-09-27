const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createNewBlog, postNewUser } = require('./helper')

let localUrl = 'http://localhost:5173'
let backUrl = 'http://localhost:3003'

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post(backUrl + '/api/testing/reset')
        await postNewUser(request, 'Edgard Pazos', 'epazos', 'prana', backUrl)
        await page.goto(localUrl)
    })


    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByTestId("loginForm");

        await expect(locator).toBeVisible()
        await expect(page.getByText('Please log in to see your blogs')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with the correct credentials', async ({ page }) => {
            await loginWith(page, 'epazos', 'prana')

            await expect(page.getByTestId('message')).toBeVisible()
            await expect(page.getByTestId('message')).toHaveText('Successfull log in')
        })

        test('fails with the wrong credentials', async ({ page }) => {
            await loginWith(page, 'epazos', 'pran')

            await expect(page.getByTestId('message')).toBeVisible()
            await expect(page.getByTestId('message')).toHaveText('Invalid username or password')
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
           await loginWith(page, 'epazos', 'prana')
        })

        test('a new blog can be created', async ({ page }) => {
            await createNewBlog(page, 'new blog', 'Edgard Pazos', 'www.google.com')

            await expect(page.getByTestId('message')).toBeVisible()
            // Expect the message of succesfull blog created
            await expect(page.getByTestId('message'))
                .toHaveText("A new blog with the title 'new blog' by 'Edgard Pazos' has been added")
            await expect(page.getByTestId('blog-title'))
                .toHaveText('new blog')
            await expect(page.getByTestId('blog-author'))
                .toHaveText('Edgard Pazos')
        })

        test('a blog can be liked', async ({ page }) => {
            await createNewBlog(page, 'harry potter', 'J.K. Rowling', 'potterhead.dev')
            await page.getByTestId('view-blog-details-button').click()
            let likesBlog = await page.getByTestId('blog-likes')
            await expect(likesBlog).toHaveText('0like')

            await page.getByTestId('like-button').click()

            await expect(page.getByTestId('message')).toBeVisible()
            await expect(page.getByTestId('message'))
                    .toHaveText('Blog successfully liked 👍')

            await expect(page.getByTestId('blog-likes')).toHaveText('1like')
        })

        test('only the user who create the blog can delete the blog', async ({ page }) => {
            await createNewBlog(page, 'mario bros', 'Guadalupe', 'bros.com')
            await page.getByTestId('view-blog-details-button').click()
            
            page.on('dialog', async (dialog) => await dialog.accept())
            await page.getByTestId('delete-blog-button').click()

            await expect(page.getByTestId('message')).toBeVisible()
            await expect(page.getByTestId('message'))
                    .toHaveText('Blog successfully deleted')
        })

        test('only the user who create the blog can see the delete button', async ({ page }) => {
            await createNewBlog(page, 'mario bros', 'Guadalupe', 'bros.com')
            await page.getByTestId('view-blog-details-button').click()

            await expect(page.getByTestId('delete-blog-button')).toBeVisible()
        })

        test('if its not the creator cannot see the delete blog button', async ({ page, request }) => {
            await createNewBlog(page, 'mario bros', 'Guadalupe', 'bros.com')
            await page.getByTestId('logout-button').click()

            await postNewUser(request, 'Usuario', 'user', 'password', backUrl)
            await loginWith(page, 'user', 'password')

            
            await page.getByTestId('view-blog-details-button').click()
            await expect(page.getByTestId('delete-blog-button')).toBeHidden()
        })

        test('blogs are arranged by likes in descending order', async ({ page }) => {
            await createNewBlog(page, 'Blog 1', 'Author 1', 'blog1.com')
            await createNewBlog(page, 'Blog 2', 'Author 2', 'blog2.com')
            await createNewBlog(page, 'Blog 3', 'Author 3', 'blog3.com')

            await page.waitForTimeout(250);

            // Manually like the second blog
            await page.locator('[data-testid="view-blog-details-button"]').nth(1).waitFor({ state: 'visible' });
            await page.locator('[data-testid="view-blog-details-button"]').nth(1).click()
            await page.getByTestId('like-button').click()
            // To hidde the details of the second blog
            await page.locator('[data-testid="view-blog-details-button"]').nth(1).click()

            // Manually like two times the third blog
            await page.locator('[data-testid="view-blog-details-button"]').nth(2).waitFor({ state: 'visible' });
            await page.locator('[data-testid="view-blog-details-button"]').nth(2).click()
            await page.locator('[data-testid="view-blog-details-button"]').nth(2).click()
            await page.waitForTimeout(500);
            await page.locator('[data-testid="view-blog-details-button"]').nth(2).click()
            await page.waitForTimeout(500);


            const blogElements = await page.locator('[data-testid="blog-item"]');

        
            const likes = await blogElements.evaluateAll((blogs) =>
                blogs.map(blog => {
                    const likeElement = blog.querySelector('[data-testid="blog-likes"]');
                    if (likeElement) {
                        const likesText = likeElement.innerText.match(/\d+/);
                        return likesText ? parseInt(likesText[0], 10) : 0;
                      } else {
                        return 0;
                      }
                })
            )
            

            const isSorted = likes.every((like, i) => i === 0 || likes[i - 1] >= like)
    
            expect(isSorted).toBe(true)
        })
    })

})