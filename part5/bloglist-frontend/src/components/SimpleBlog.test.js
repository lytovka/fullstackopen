import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup);

test('render content', () => {
    const simpleBlog = {
        author: "Ivan",
        title: "a simple blog",
        likes: 10
    }
    
    const component = render(
        <SimpleBlog blog={simpleBlog} />
    )
    component.debug()

    expect(component.container).toHaveTextContent('a simple blog')
})

test('click like button twice', () => {
    const simpleBlog = {
        author: "Ivan",
        title: "a simple blog",
        likes: 10
    };

    const mockHandler = jest.fn();

    const {getByText} = render(
        <SimpleBlog blog={simpleBlog} onClick={mockHandler}/>
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})