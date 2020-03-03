import React from "react";

import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import Dashboard from "../container/Dashboard";

describe("Dashboard.js", () => {
  test("<Dashboard> should render", () => {
    const { getByText } = render(<Dashboard />);
    const DashboardComponent = getByText("Dashboard");
    expect(DashboardComponent).toBeInTheDocument();
  });
  test("Create New Article <Button> should render", () => {
    const { getByLabelText } = render(<Dashboard />);
    const addNewArticleButton = getByLabelText("Create New Article");
    expect(addNewArticleButton).toBeInTheDocument();
  });
  test("Click Create New Article <Button> should render <Editor>", () => {
    const { getByLabelText, getByText } = render(<App />);
    const addNewArticleButton = getByLabelText("Create New Article");
    fireEvent.click(addNewArticleButton);
    const EditorComponent = getByText("Editor");
    expect(EditorComponent).toBeInTheDocument();
  });
});
