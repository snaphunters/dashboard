import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TextBlock from "../component/TextBlock";

describe("TextBlock.js", () => {
  test("<TextBlock> should render", () => {
    const { getByText } = render(<TextBlock index="0" />);
    const TextBlockComponent = getByText("Content");
    expect(TextBlockComponent).toBeInTheDocument();
  });
  test("TextBlock <Input> Box shows user typed value", () => {
    const onEventMock = jest.fn();
    const { getByLabelText } = render(
      <TextBlock index="0" updateInputText={onEventMock} />
    );
    const TextBlockBox = getByLabelText("Article Content Block");
    fireEvent.change(TextBlockBox, { target: { value: "Snapi" } });
    expect(onEventMock).toHaveBeenCalledWith("Snapi");
  });
});
