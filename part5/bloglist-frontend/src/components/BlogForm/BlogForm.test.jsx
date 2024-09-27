import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

describe('BlogForm component renders', () => {

  //   let newBlog = {
  //     title: 'new blog',
  //     author: 'Teysimone Aroyuki',
  //     url: 'www.dev.com'
  //   }

  test('calls the event handler when created new blog', async () => {
    const submitNewBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm handleSubmitNewBlog={submitNewBlog} />)

    const titleInput = screen.getByPlaceholderText('title of the new blog...')
    const authorInput = screen.getByPlaceholderText('author of the new blog...')
    const urlInput = screen.getByPlaceholderText('url of the new blog...')


    await user.type(titleInput, 'new blog')
    await user.type(authorInput, 'Teysimone Aroyuki')
    await user.type(urlInput, 'www.dev.com')

    const submitButton = screen.getByText('Create')
    await user.click(submitButton)


    expect(submitNewBlog.mock.calls).toHaveLength(1)
    expect(submitNewBlog.mock.calls[0][1].title).toBe('new blog')
    expect(submitNewBlog.mock.calls[0][1].author).toBe('Teysimone Aroyuki')
    expect(submitNewBlog.mock.calls[0][1].url).toBe('www.dev.com')
  })
})