import React from "react";
import { render, fireEvent, wait, within } from "@testing-library/react";
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
    mockAxios.onPost("/articles").reply(201);
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
    mockAxios.onPost("/articles").reply(201);
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

  test("should render Error message when article title is empty", () => {
    const { getByText, getByLabelText } = render(<Editor />);
    const saveButton = getByLabelText("Save Button");
    fireEvent.click(saveButton);
    const modalBox = getByText("Title cannot be empty.");
    expect(modalBox).toBeInTheDocument();
  });

  test("should render Error message when topic title is filled but subtopic title is not", async () => {
    const { getByText, getByLabelText } = render(<Editor />);
    const topicTitleInputBox = getByLabelText("Topic Title");
    fireEvent.change(topicTitleInputBox, { target: { value: "Snapi" } });
    const saveButton = getByLabelText("Save Button");
    fireEvent.click(saveButton);
    wait(() => expect(getByText("Title cannot be empty.")).toBeInTheDocument());
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
    mockAxios.onPost("/articles").reply(422);
    const { getByText, getByLabelText } = render(<Editor />);
    const topicTitleInputBox = getByLabelText("Topic Title");
    const subtopicTitleInputBox = getByLabelText("Sub-Topic Title");
    fireEvent.change(topicTitleInputBox, { target: { value: "Snapi" } });
    fireEvent.change(subtopicTitleInputBox, { target: { value: "Snapi2" } });
    const saveButton = getByLabelText("Save Button");
    fireEvent.click(saveButton);
    wait(() =>
      expect(
        getByText(
          "Your article might have the same title as an existing article."
        )
      ).toBeInTheDocument()
    );
  });
  test("Return to Dashboard <Button> should render", () => {
    const { getByLabelText } = render(<Editor />);
    const returnToDashContainer = getByLabelText("return to dashboard");
    const returnToDashBtn = within(returnToDashContainer).getByLabelText(
      "Return to Dashboard"
    );
    expect(returnToDashBtn).toBeInTheDocument();
  });

  test("Return to Dashboard <Button> should return to dashboard on click", async () => {
    const returnToDashboard = jest.fn();
    const { getByLabelText } = render(
      <Editor returnToDashboard={returnToDashboard} />
    );
    const returnToDashContainer = getByLabelText("return to dashboard");
    const returnToDashBtn = within(returnToDashContainer).getByLabelText(
      "Return to Dashboard"
    );
    fireEvent.click(returnToDashBtn);
    expect(returnToDashboard).toHaveBeenCalled();
  });
  test("Edit and Preview <Button> should render", () => {
    const { getByLabelText } = render(<Editor />);
    const editBtn = getByLabelText("Edit Button");
    const previewBtn = getByLabelText("Preview Button");
    expect(editBtn).toBeInTheDocument();
    expect(previewBtn).toBeInTheDocument();
  });
  test("Click Preview and all add/delete buttons should not render", () => {
    const { getByLabelText, queryAllByLabelText } = render(<Editor />);
    const regex = new RegExp(/^(add|delete).*button/, "i");
    const addBlockBtn = getByLabelText("add topicSubtopic 0 block button 0");
    const previewBtn = getByLabelText("Preview Button");
    fireEvent.click(addBlockBtn); //to make the block delete button render
    fireEvent.click(previewBtn);
    const allAddDeleteBtn = queryAllByLabelText(regex);
    expect(allAddDeleteBtn).toEqual([]);
  });
  test("Click Preview then Edit and all add/delete buttons should render", () => {
    const { getByLabelText, getAllByLabelText } = render(<Editor />);
    const regex = new RegExp(/^(add|delete).*button/, "i");
    const addBlockBtn = getByLabelText("add topicSubtopic 0 block button 0");
    const editBtn = getByLabelText("Edit Button");
    const previewBtn = getByLabelText("Preview Button");
    fireEvent.click(addBlockBtn); //to make the block delete button render
    fireEvent.click(previewBtn);
    fireEvent.click(editBtn);
    const allAddDeleteBtn = getAllByLabelText(regex);
    expect(allAddDeleteBtn.length).toBe(7);
  });
});
