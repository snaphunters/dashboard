import React from "react";
import { render } from "@testing-library/react";
import RichTextMediaBlock from "../component/RichTextMediaBlock";
jest.mock("@ckeditor/ckeditor5-react");
jest.mock("@ckeditor/ckeditor5-build-inline");
describe("RichTextMediaBlock.js", () => {
  test("<RichTextMediaBlock> should render", () => {
    const { getByLabelText } = render(<RichTextMediaBlock index="0" />);
    const RichTextMediaComponent = getByLabelText("RichTextMediaBlock");
    expect(RichTextMediaComponent).toBeInTheDocument();
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
