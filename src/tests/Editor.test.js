import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import Editor from "../container/Editor";
import axios from "../utils/axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);
jest.mock("@ckeditor/ckeditor5-react", () => {
  const hello = () => {
    return <div></div>;
  };
  return {
    __esModule: true,
    default: hello
  };
});

describe("Editor.js", () => {
  test("<Editor> should render", () => {
    const { getByLabelText } = render(<Editor />);
    const EditorComponent = getByLabelText("Editor");
    expect(EditorComponent).toBeInTheDocument();
  });
  test("Topic Title <Input> Box should render", () => {
    const { getByLabelText } = render(<Editor />);
    const TitleComponent = getByLabelText("Topic Title");
    expect(TitleComponent).toBeInTheDocument();
  });
  test("Topic Title <Input> Box is rendered with no text when creating new article", () => {
    const { getByLabelText } = render(<Editor />);
    const TitleComponent = getByLabelText("Topic Title");
    expect(TitleComponent).toBeInTheDocument();
    expect(TitleComponent.value).toEqual("");
  });
  test("Sub-Topic Title <Input> Box should render", () => {
    const { getByLabelText } = render(<Editor />);
    const TitleComponent = getByLabelText("Sub-Topic Title");
    expect(TitleComponent).toBeInTheDocument();
  });
  test("Sub-Topic Title <Input> Box is rendered with no text when creating new article", () => {
    const { getByLabelText } = render(<Editor />);
    const TitleComponent = getByLabelText("Sub-Topic Title");
    expect(TitleComponent).toBeInTheDocument();
    expect(TitleComponent.value).toEqual("");
  });

  test("Topic Title <Input> Box shows user typed value", () => {
    const { getByLabelText, getByDisplayValue } = render(<Editor />);
    const TitleComponent = getByLabelText("Topic Title");
    fireEvent.change(TitleComponent, {
      target: { value: "snapi topic title" }
    });
    const TopicTitleText = getByDisplayValue("snapi topic title");
    expect(TopicTitleText).toBeInTheDocument();
  });
  test("Sub-Topic Title <Input> Box shows user typed value", () => {
    const { getByLabelText, getByDisplayValue } = render(<Editor />);
    const TitleComponent = getByLabelText("Sub-Topic Title");
    fireEvent.change(TitleComponent, {
      target: { value: "snapi subtopic title" }
    });
    const SubTopicTitleText = getByDisplayValue("snapi subtopic title");
    expect(SubTopicTitleText).toBeInTheDocument();
  });

  test("should render 'successfully saved!' after axios is successfully", async () => {
    const { getByText, getByLabelText } = render(<Editor />);
    mockAxios
      .onPost("https://snaphunt-demo-backend.herokuapp.com/articles")
      .reply(201);
    const topicTitleInputBox = getByLabelText("Topic Title");
    const subtopicTitleInputBox = getByLabelText("Sub-Topic Title");
    fireEvent.change(topicTitleInputBox, { target: { value: "Snapi" } });
    fireEvent.change(subtopicTitleInputBox, { target: { value: "Snapi2" } });
    const saveButton = getByLabelText("Save Button");
    fireEvent.click(saveButton);
    await wait(() =>
      expect(getByText("Successfully saved!")).toBeInTheDocument()
    );
  });

  test("Save modal box should close when clicked", async () => {
    const { queryByText, getByLabelText } = render(<Editor />);
    mockAxios
      .onPost("https://snaphunt-demo-backend.herokuapp.com/articles")
      .reply(201);
    const topicTitleInputBox = getByLabelText("Topic Title");
    const subtopicTitleInputBox = getByLabelText("Sub-Topic Title");
    fireEvent.change(topicTitleInputBox, { target: { value: "Snapi" } });
    fireEvent.change(subtopicTitleInputBox, { target: { value: "Snapi2" } });
    const saveButton = getByLabelText("Save Button");
    fireEvent.click(saveButton);
    await wait(() => fireEvent.click(getByLabelText("close save message")));
    const modalBox = queryByText("Successfully saved!");
    expect(modalBox).not.toBeInTheDocument();
  });

  test("should render Error message when axios fail to accept empty article title", () => {
    const { getByText, getByLabelText } = render(<Editor />);
    const saveButton = getByLabelText("Save Button");
    fireEvent.click(saveButton);
    const modalBox = getByText("Title cannot be empty.");
    expect(modalBox).toBeInTheDocument();
  });

  test("Error modal box should close when clicked", () => {
    const { queryByText, getByLabelText } = render(<Editor />);
    const saveButton = getByLabelText("Save Button");
    fireEvent.click(saveButton);
    const closeErrorButton = getByLabelText("close error message");
    fireEvent.click(closeErrorButton);
    const modalBox = queryByText("Title cannot be empty.");
    expect(modalBox).not.toBeInTheDocument();
  });

  test("should render Error message when axios fail to accept duplicate article title", async () => {
    mockAxios
      .onPost("https://snaphunt-demo-backend.herokuapp.com/articles")
      .reply(422);
    const { getByText, getByLabelText } = render(<Editor />);
    const topicTitleInputBox = getByLabelText("Topic Title");
    const subtopicTitleInputBox = getByLabelText("Sub-Topic Title");
    fireEvent.change(topicTitleInputBox, { target: { value: "Snapi" } });
    fireEvent.change(subtopicTitleInputBox, { target: { value: "Snapi2" } });
    const saveButton = getByLabelText("Save Button");
    fireEvent.click(saveButton);
    await wait(() =>
      getByText(
        "Your article might have the same title as an existing article."
      )
    );
    expect(
      getByText(
        "Your article might have the same title as an existing article."
      )
    ).toBeInTheDocument();
  });
});
