import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
  test("Test functionality of Create New Article Button", () => {
    const createNewArticle = jest.fn();
    const { getByLabelText } = render(
      <Dashboard createNewArticle={createNewArticle} />
    );
    const addNewArticleButton = getByLabelText("Create New Article");
    fireEvent.click(addNewArticleButton);
    expect(createNewArticle).toHaveBeenCalled();
  });
});
