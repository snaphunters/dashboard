import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CKEditor from "@ckeditor/ckeditor5-react";
import RichTextMediaBlock from "../component/RichTextMediaBlock";
jest.mock("@ckeditor/ckeditor5-react");

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
const blockArray = [""];

describe("RichTextMediaBlock.js", () => {
  test("<RichTextMediaBlock> should render", () => {
    render(
      <RichTextMediaBlock
        topicAndSubtopicArray={topicAndSubtopicArray}
        updateArticleState={updateArticleState}
        blocksArray={blockArray}
      />
    );
    CKEditor.mockReturnValueOnce();
    expect(CKEditor).toHaveBeenCalled();
  });

  test("<CKEditorContainer> should render", () => {
    const { getByLabelText } = render(
      <RichTextMediaBlock
        topicAndSubtopicArray={topicAndSubtopicArray}
        updateArticleState={updateArticleState}
        blocksArray={blockArray}
      />
    );
    const ckEditorContainer = getByLabelText("CKEditorContainer");
    expect(ckEditorContainer).toBeInTheDocument();
  });
  test("addBlock should make testBlockArray have 2 blocks in total", () => {
    const testBlockArray = ["a"];
    const { getByLabelText } = render(
      <RichTextMediaBlock
        topicAndSubtopicArray={topicAndSubtopicArray}
        updateArticleState={updateArticleState}
        blocksArray={testBlockArray}
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
        updateArticleState={updateArticleState}
        blocksArray={testBlockArray}
        topicSubtopicIndex={0}
      />
    );
    const buttonComponent = getByLabelText(
      `add topicSubtopic 0 block button 0`
    );
    fireEvent.click(buttonComponent);
    expect(testBlockArray).toStrictEqual(expectedBlockArray);
  });
});
