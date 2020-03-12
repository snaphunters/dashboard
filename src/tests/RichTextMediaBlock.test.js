import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RichTextMediaBlock from "../component/RichTextMediaBlock";
import Editor from "../container/Editor";
jest.mock("@ckeditor/ckeditor5-react", () => {
  const mockCKEditor = ({ data, onChange }) => {
    return (
      <input
        aria-label="mockCKEditor"
        value={data}
        onChange={e => onChange(null, { getData: () => e.target.value })}
      />
    );
  };
  return {
    __esModule: true,
    default: mockCKEditor
  };
});

const topicAndSubtopicArray = [
  {
    name: "",
    blockArray: [""]
  },
  {
    name: "",
    blockArray: [""]
  }
];
const mockUpdateArticleState = jest.fn();

const blockArray = [""];

describe("RichTextMediaBlock.js", () => {
  test("<RichTextMediaBlock> should render", () => {
    const { getByLabelText } = render(
      <RichTextMediaBlock
        topicAndSubtopicArray={topicAndSubtopicArray}
        updateArticleState={mockUpdateArticleState}
        blockArray={blockArray}
      />
    );
    const mockCKEditor = getByLabelText("mockCKEditor");

    expect(mockCKEditor).toBeInTheDocument();
  });
  test("<CKEditorContainer> should render", () => {
    const { getByLabelText } = render(
      <RichTextMediaBlock
        topicAndSubtopicArray={topicAndSubtopicArray}
        updateArticleState={mockUpdateArticleState}
        blockArray={blockArray}
      />
    );
    const ckEditorContainer = getByLabelText("CKEditorContainer 0");
    expect(ckEditorContainer).toBeInTheDocument();
  });
  test("addBlock should make testBlockArray have 2 blocks in total", () => {
    const testBlockArray = ["a"];
    const { getByLabelText } = render(
      <RichTextMediaBlock
        topicAndSubtopicArray={topicAndSubtopicArray}
        updateArticleState={mockUpdateArticleState}
        blockArray={testBlockArray}
        topicSubtopicIndex={0}
      />
    );
    const buttonComponent = getByLabelText(
      `add topicSubtopic 0 block button 0`
    );
    fireEvent.click(buttonComponent);
    expect(testBlockArray.length).toBe(2);
  });
  test("addBlock should create new new block just below the first block", () => {
    const testBlockArray = ["a", "c"];
    const expectedBlockArray = ["a", "", "c"];
    const { getByLabelText } = render(
      <RichTextMediaBlock
        topicAndSubtopicArray={topicAndSubtopicArray}
        updateArticleState={mockUpdateArticleState}
        blockArray={testBlockArray}
        topicSubtopicIndex={0}
      />
    );
    const buttonComponent = getByLabelText(
      `add topicSubtopic 0 block button 0`
    );
    fireEvent.click(buttonComponent);
    expect(testBlockArray).toStrictEqual(expectedBlockArray);
  });
  test("delete button should not be available for first block of any topic/subtopic", () => {
    const topicIndex = 0;
    const testBlockArray = ["first block text"];
    const { queryByLabelText } = render(
      <RichTextMediaBlock
        topicAndSubtopicArray={topicAndSubtopicArray}
        updateArticleState={mockUpdateArticleState}
        blockArray={testBlockArray}
        topicSubtopicIndex={topicIndex}
      />
    );
    const buttonComponent = queryByLabelText(
      "delete topicSubtopic 0 block button 0"
    );
    expect(buttonComponent).toBe(null);
  });
  test("delete button should be available for non-first blocks of any topic/subtopic ", () => {
    const { getByLabelText } = render(<Editor />);
    const addButton = getByLabelText("add topicSubtopic 0 block button 0");
    fireEvent.click(addButton);
    const deleteButton = getByLabelText(
      "delete topicSubtopic 0 block button 1"
    );
    expect(deleteButton).toBeInTheDocument();
  });

  test("click delete button should remmove corresponding block", () => {
    const { getByLabelText } = render(<Editor />);
    const addButton = getByLabelText("add topicSubtopic 0 block button 0");
    fireEvent.click(addButton);
    const deleteButton = getByLabelText(
      "delete topicSubtopic 0 block button 1"
    );
    const newAddedBlock = getByLabelText("CKEditorContainer 1");
    fireEvent.click(deleteButton);
    expect(newAddedBlock).not.toBeInTheDocument();
  });
  test("type into block should reflect changes", () => {
    const { getAllByLabelText, getByDisplayValue } = render(<Editor />);
    const mockCKEditor = getAllByLabelText("mockCKEditor");
    fireEvent.change(mockCKEditor[0], { target: { value: "some Ck text" } });
    const mockCKEditorText = getByDisplayValue("some Ck text");
    expect(mockCKEditorText).toBeInTheDocument();
  });
});
