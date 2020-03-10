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
    const { getByLabelText } = render(
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
});
