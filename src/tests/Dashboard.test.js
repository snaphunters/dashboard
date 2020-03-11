import React from "react";
import { render, fireEvent, wait, within } from "@testing-library/react";
import Dashboard from "../container/Dashboard";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

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

  test("Should return parent container that contains all article titles", async () => {
    const { getByLabelText } = render(<Dashboard />);
    const articleTitleContainer = await getByLabelText(
      "article-title-container"
    );
    expect(articleTitleContainer).toBeInTheDocument();
  });

  test.only("Should render article titles", async () => {
    const expectedTitle = "This is a title";
    mockAxios
      .onGet("https://snaphunt-demo-backend.herokuapp.com/articles")
      .reply(200, [
        {
          isPublished: false,
          _id: "5e5e20a625449a001708e64f",
          subCategories: [],
          blocks: [],
          published: false,
          title: expectedTitle,
          id: "48c78302-ff67-41c3-891d-920cc3efd04d",
          createdAt: "2020-03-03T09:17:26.312Z",
          updatedAt: "2020-03-03T09:17:26.312Z",
          __v: 0,
          topicAndSubtopicArray: []
        }
      ]);
    const { getByLabelText } = render(<Dashboard />);
    await wait(() => getByLabelText("article-title"));
    const { getByText } = within(getByLabelText("article-title"));
    expect(getByText(`1. ${expectedTitle}`)).toBeInTheDocument();
  });
});
