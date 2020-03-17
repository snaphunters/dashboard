import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TopicAndSubtopic from "../component/TopicAndSubtopic";
import Editor from "../container/Editor";
import { v4 as uuidv4 } from "uuid";
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
    containerId: uuidv4(),
    name: "",
    blockArray: [""]
  },
  {
    containerId: uuidv4(),
    name: "",
    blockArray: [""]
  }
];
const updateArticleState = jest.fn();

describe("TopicAndSubtopic.test.js", () => {
  test("when add subtopic button is clicked, new subtopic container is added.", () => {
    const { getByLabelText } = render(
      <TopicAndSubtopic
        isEditable={true}
        topicAndSubtopicArray={topicAndSubtopicArray}
        updateArticleState={updateArticleState}
      />
    );
    fireEvent.click(getByLabelText("Add subtopic container button 0"));
    expect(topicAndSubtopicArray.length).toBe(3);
  });
  test("on render delete button shows on subtopic container", () => {
    const { getByLabelText } = render(<Editor />);
    const deleteSubTopicButton = getByLabelText(
      "Delete subtopic container button 1"
    );
    expect(deleteSubTopicButton).toBeInTheDocument();
  });
  test("add subtopic then new subtopic has delete button", () => {
    const { getByLabelText } = render(<Editor />);
    const addNewArticleButton = getByLabelText(
      "Add subtopic container button 1"
    );
    fireEvent.click(addNewArticleButton);
    const deleteSubTopicButton = getByLabelText(
      "Delete subtopic container button 2"
    );
    expect(deleteSubTopicButton).toBeInTheDocument();
  });
  test("click delete subtopic button, the whole subtopic removed", () => {
    const { getByLabelText } = render(<Editor />);
    const deleteSubTopicButton = getByLabelText(
      "Delete subtopic container button 1"
    );
    const subTopicContainer = getByLabelText("topicSubtopicContainer 1");
    fireEvent.click(deleteSubTopicButton);
    expect(subTopicContainer).not.toBeInTheDocument();
  });
});
