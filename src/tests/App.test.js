import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
describe("App.js", () => {
  test("<Dashboard> should render", () => {
    const { getByText } = render(<App />);
    const dashBoardComponent = getByText("Dashboard");
    expect(dashBoardComponent).toBeInTheDocument();
  });
});
