import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import Editor from "../container/Editor";
import axios from "../utils/axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

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
  test("TextBox is rendered when add text box button is clicked", () => {
    const { getByLabelText, getAllByLabelText } = render(<Editor />);
    const insertTextButton = getByLabelText("Add Text Button");
    fireEvent.click(insertTextButton);
    const textBlock = getAllByLabelText("Article Content Block");
    expect(textBlock).toHaveLength(2);
  });
  test("TextBox input is rendered on the editor", () => {
    const { getByLabelText, getAllByLabelText, getByDisplayValue } = render(
      <Editor />
    );
    const insertTextButton = getByLabelText("Add Text Button");
    fireEvent.click(insertTextButton);
    const textBlock = getAllByLabelText("Article Content Block");
    fireEvent.change(textBlock[1], { target: { value: "SnapiLOL" } });
    const TextBoxText = getByDisplayValue("SnapiLOL");
    expect(TextBoxText.value).toEqual("SnapiLOL");
  });

  test("Article Title <Input> Box is rendered with no text when creating new article", () => {
    const { getByLabelText } = render(<Editor />);
    const articleTitleInputBox = getByLabelText("Article Title Input Box");
    expect(articleTitleInputBox).toBeInTheDocument();
    expect(articleTitleInputBox.value).toEqual("");
  });
  test("Article Content Block is rendered with no text when creating new article", () => {
    const { getByLabelText } = render(<Editor />);
    const articleContentBlock = getByLabelText("Article Content Block");
    expect(articleContentBlock).toBeInTheDocument();
    expect(articleContentBlock.value).toEqual("");
  });
  test("Article Content Block is rendered with no text and uuid v4 string in placeholder creating new article", () => {
    const { getByLabelText } = render(<Editor />);
    const articleContentBlock = getByLabelText("Article Content Block");
    expect(articleContentBlock).toBeInTheDocument();
    expect(articleContentBlock.placeholder).toMatch(/-/);
    expect(articleContentBlock.placeholder).toHaveLength(36);
  });
  test("Article Content Block renders user-typed values", () => {
    const { getByLabelText, getByDisplayValue } = render(<Editor />);
    const articleContentBlock = getByLabelText("Article Content Block");
    fireEvent.change(articleContentBlock, { target: { value: "lol" } });
    const articleContentBlockText = getByDisplayValue("lol");
    expect(articleContentBlockText.value).toEqual("lol");
  });
  test("should render 'successfully saved!' after axios is successfully", async () => {
    const { getByText, getByLabelText } = render(<Editor />);
    // axios.post = jest.fn();
    // axios.post.mockImplementationOnce(() => Promise.resolve({}));
    mockAxios
      .onPost("https://snaphunt-demo-backend.herokuapp.com/articles")
      .reply(201);

    const textBlock = getByLabelText("Article Title Input Box");
    fireEvent.change(textBlock, { target: { value: "Snapi" } });
    const saveButton = getByLabelText("Save Button");
    fireEvent.click(saveButton);
    await (() => expect(getByText("Successfully saved!")).toBeInTheDocument());
  });
  test("should render Error message when axios fail to accept empty article title", async () => {
    const { getByText, getByLabelText } = render(<Editor />);
    mockAxios
      .onPost("https://snaphunt-demo-backend.herokuapp.com/articles")
      .reply(400);

    const textBlock = getByLabelText("Article Title Input Box");
    fireEvent.change(textBlock, { target: { value: "" } });
    const saveButton = getByLabelText("Save Button");
    fireEvent.click(saveButton);
    await wait(() =>
      expect(getByText("Title cannot be empty.")).toBeInTheDocument()
    );
  });
  test("should render Error message when axios fail to accept whitespace only title", async () => {
    const { getByText, getByLabelText } = render(<Editor />);
    mockAxios
      .onPost("https://snaphunt-demo-backend.herokuapp.com/articles")
      .reply(400);

    const textBlock = getByLabelText("Article Title Input Box");
    fireEvent.change(textBlock, { target: { value: "       " } });
    const saveButton = getByLabelText("Save Button");
    fireEvent.click(saveButton);
    await wait(() =>
      expect(getByText("Title cannot be empty.")).toBeInTheDocument()
    );
  });
  test("should render Error message when article title already exist", async () => {
    const { getByText, getByLabelText } = render(<Editor />);
    mockAxios
      .onPost("https://snaphunt-demo-backend.herokuapp.com/articles")
      .reply(400);

    const textBlock = getByLabelText("Article Title Input Box");
    fireEvent.change(textBlock, { target: { value: "this is nic" } });
    const saveButton = getByLabelText("Save Button");
    fireEvent.click(saveButton);

    await wait(() =>
      expect(
        getByText(
          "Your article might have the same title as an existing article."
        )
      ).toBeInTheDocument()
    );
  });
});
