import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Editor from "../container/Editor";

describe("Editor.js", () => {
  test("<Editor> should render", () => {
    const { getByText } = render(<Editor />);
    const EditorComponent = getByText("Editor");
    expect(EditorComponent).toBeInTheDocument();
  });
  test("Article Title <Input> Box should render", () => {
    const { getByLabelText } = render(<Editor />);
    const articleTitleInputBox = getByLabelText("Article Title Input Box");
    expect(articleTitleInputBox).toBeInTheDocument();
  });
  test("Main Article <Container> should render", () => {
    const { getByLabelText } = render(<Editor />);
    const mainArticleContainer = getByLabelText("Main Article Container");
    expect(mainArticleContainer).toBeInTheDocument();
  });
  test("Article Title <Input> Box shows user typed value", () => {
    const { getByLabelText, getByDisplayValue } = render(<Editor />);
    const articleTitleInputBox = getByLabelText("Article Title Input Box");
    fireEvent.change(articleTitleInputBox, { target: { value: "snapi" } });
    const articleTitleText = getByDisplayValue("snapi");
    expect(articleTitleText).toBeInTheDocument();
  });
});
