import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import CKEditor from "@ckeditor/ckeditor5-react";

jest.mock("@ckeditor/ckeditor5-react");

describe("RichTextMediaBlock.js", () => {
  test("<RichTextMediaBlock> should render", () => {
    const { getByLabelText } = render(<App />);
    const addNewArticleButton = getByLabelText("Create New Article");
    fireEvent.click(addNewArticleButton);
    CKEditor.mockReturnValueOnce();
    expect(CKEditor).toHaveBeenCalled();
  });
  // test("Block <Input> Box shows user typed value", () => {
  //   const onEventMock = jest.fn();
  //   const { getByLabelText } = render(
  //     <Block index="0" updateInputText={onEventMock} />
  //   );
  //   const BlockBox = getByLabelText("Text Block");
  //   fireEvent.change(BlockBox, { target: { value: "Snapi" } });
  //   expect(onEventMock).toHaveBeenCalledWith("0", "Snapi");
  // });
});
