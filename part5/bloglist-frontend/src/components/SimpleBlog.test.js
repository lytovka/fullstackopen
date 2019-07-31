import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup);

const simpleBlog = {
    author: "Ivan",
    title: "a simple blog",
    likes: 10
}

let component 
let mockHandler

beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
        <SimpleBlog blog={simpleBlog} onClick={mockHandler}/>
    )
})

test('render content', () => {
    component.debug()
    expect(component.container).toHaveTextContent('a simple blog')
})

test('click like button twice', () => {

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})