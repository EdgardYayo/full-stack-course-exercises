const loginWith = async (page, username, password) => {
    await page.getByTestId('username-input').fill(username)
    await page.getByTestId('password-input').fill(password)
    await page.getByTestId('login-button').click()
}

const postNewUser = async (request, name, username, password, backUrl) => {
    await request.post(backUrl + '/api/users', {
        data: {
            name,
            username,
            password
        }
    })
}

const createNewBlog = async (page, title, author, url) => {
    await page.getByTestId('open-blog-form-btn').click()
    await page.getByTestId('title-input').fill(title)
    await page.getByTestId('author-input').fill(author)
    await page.getByTestId('url-input').fill(url)

    await page.getByTestId('create-blog-button').click()
}


export { loginWith, postNewUser, createNewBlog }