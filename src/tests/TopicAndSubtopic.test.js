import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TopicAndSubtopic from "../component/TopicAndSubtopic";

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
const updateArticleState = jest.fn();

describe("TopicAndSUbtopic.test.js", () => {
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
