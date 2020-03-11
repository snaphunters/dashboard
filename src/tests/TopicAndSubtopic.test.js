import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TopicAndSubtopic from "../component/TopicAndSubtopic";
import { v4 as uuidv4 } from "uuid";
jest.mock("@ckeditor/ckeditor5-react", () => {
  const hello = () => {
    return <div aria-label="mockCKEditor"></div>;
  };
  return {
    __esModule: true,
    default: hello
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
    const { getAllByLabelText } = render(
      <TopicAndSubtopic
        topicAndSubtopicArray={topicAndSubtopicArray}
        updateArticleState={updateArticleState}
      />
    );
    fireEvent.click(getAllByLabelText("Add subtopic container button")[0]);
    expect(topicAndSubtopicArray.length).toBe(3);
  });
});
