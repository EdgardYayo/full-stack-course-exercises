import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
// import { expect, test, describe } from 'vitest'

describe('Blog component renders', () => {

  const blog = {
    title: 'Simple blog',
    author: 'Edgard Allan',
    url: 'www.google.com',
    likes: 12
  }

  test('renders the title and the author of a blog', () => {
    render(<Blog blog={blog} />)

    const title = screen.getByText('Simple blog')
    const author = screen.getByText('Edgard Allan')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })

  test('not render the url and the likes by default', () => {
    render(<Blog blog={blog} />)

    const url = screen.queryByText('www.google.com')
    const likes = screen.queryByText('12')

    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders the url and likes when button is clicked', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('www.google.com')
    const likes = screen.getByText('12')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('if likes button is clicked twice the event fires twice', async () => {

    const mockHandler = vi.fn()

    render(<Blog blog={blog} handleLikes={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.dblClick(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})