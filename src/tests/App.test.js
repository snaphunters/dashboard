import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
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

describe("App.js", () => {
  test("<Dashboard> should render", () => {
    const { getByText } = render(<App />);
    const dashBoardComponent = getByText("Dashboard");
    expect(dashBoardComponent).toBeInTheDocument();
  });
  test("Test functionality of Create New Article", () => {
    const { getByLabelText } = render(<App />);
    const addNewArticleButton = getByLabelText("Create New Article");
    fireEvent.click(addNewArticleButton);
    const EditorComponent = getByLabelText("Editor");
    expect(EditorComponent).toBeInTheDocument();
  });
});
