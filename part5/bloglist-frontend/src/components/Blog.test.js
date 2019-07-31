import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

afterEach(cleanup);

const blog = {
  title: "a blog",
  author: "Ivan",
  likes: 10,
  url: "lytovka.com",
  id: "12123132",
  user: {
    name: "Ivan Lytovka",
    username: "lytovka",
    id: "984398493"
  }
};

let component;
let mockHandler;

beforeEach(() => {
  mockHandler - jest.fn();
  component = render(
    <Blog blog={blog} enableRemoveButton={true} onClick={mockHandler}/>
  );
});

test("render initial state of Blog component", () => {
  expect(component.container).toHaveTextContent("a blog");
});

test("Testing appearance of a single blog post", () => {
  component.debug();
  const showFull = component.container.querySelector(".showFullBlog");
  expect(showFull).toHaveStyle("dispay: none");

  const button = component.getByText("show more");
  fireEvent.click(button);
  fireEvent.click(component.getByText("hide"));
  expect(showFull).toHaveStyle("");
});