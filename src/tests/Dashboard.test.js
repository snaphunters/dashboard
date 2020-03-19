import React from "react";
import {
  render,
  fireEvent,
  wait,
  within,
  handleResponse
} from "@testing-library/react";
import Dashboard from "../container/Dashboard";
import axios from "../utils/axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

const mockSingleArticle = [
  {
    isPublished: true,
    _id: "5e72d92d6905ea00175d885c",
    title: "Types of accounts",
    topicAndSubtopicArray: [
      {
        blockArray: ["<p>Some types of accounts</p>"],
        _id: "5e72d92d6905ea00175d885d",
        title: "Types of accounts"
      },
      {
        blockArray: ["<p>some stand alone accounts</p>"],
        _id: "5e72d92d6905ea00175d885e",
        title: "Stand-alone accounts"
      }
    ],
    id: "49c6a924-5ddb-4939-ab88-e941aee93485",
    createdAt: "2020-03-19T02:30:05.394Z",
    updatedAt: "2020-03-19T02:30:05.394Z",
    __v: 0
  }
];

describe("Dashboard.js", () => {
  test("<Dashboard> should render", () => {
    const { getByLabelText } = render(<Dashboard />);
    mockAxios
      .onGet("/categories")
      .reply(200, ["Lemonade", "Lemonade2", "Uncategorized"]);
    mockAxios.onGet("/articles").reply(200, mockSingleArticle);
    const DashboardComponent = getByLabelText("Dashboard");
    expect(DashboardComponent).toBeInTheDocument();
  });
  test("Create New Article <Button> should render", () => {
    const { getByLabelText } = render(<Dashboard />);
    mockAxios
      .onGet("/categories")
      .reply(200, ["Lemonade", "Lemonade2", "Uncategorized"]);
    mockAxios.onGet("/articles").reply(200, mockSingleArticle);
    const addNewArticleButton = getByLabelText("Create New Article");
    expect(addNewArticleButton).toBeInTheDocument();
  });
  test("Test functionality of Create New Article Button", () => {
    const createNewArticle = jest.fn();
    const { getByLabelText } = render(
      <Dashboard createNewArticle={createNewArticle} />
    );
    mockAxios
      .onGet("/categories")
      .reply(200, ["Lemonade", "Lemonade2", "Uncategorized"]);
    mockAxios.onGet("/articles").reply(200, mockSingleArticle);
    const addNewArticleButton = getByLabelText("Create New Article");
    fireEvent.click(addNewArticleButton);
    expect(createNewArticle).toHaveBeenCalled();
  });
  test("Should return parent container that contains all article titles", () => {
    const { getByLabelText } = render(<Dashboard />);
    mockAxios
      .onGet("/categories")
      .reply(200, ["Lemonade", "Lemonade2", "Uncategorized"]);
    mockAxios.onGet("/articles").reply(200, mockSingleArticle);
    const articleTitleContainer = getByLabelText("article-title-container");
    expect(articleTitleContainer).toBeInTheDocument();
  });

  test("Should render article titles and subtopics", async () => {
    const { getByLabelText, getAllByLabelText } = render(<Dashboard />);
    mockAxios
      .onGet("/categories")
      .reply(200, ["Lemonade", "Lemonade2", "Uncategorized"]);
    mockAxios.onGet("/articles").reply(200, mockSingleArticle);
    mockAxios
      .onGet("/categories/Lemonade")
      .reply(200, [mockSingleArticle[0].id]);
    await wait(() => getAllByLabelText("CategoryTab"));
    const [firstCategoryTab] = getAllByLabelText("CategoryTab");
    fireEvent.click(firstCategoryTab);
    await wait(() => getByLabelText("article-title"));
    const { getByText } = within(getByLabelText("article-title"));
    expect(getByText(`${mockSingleArticle[0].title}`)).toBeInTheDocument();
    expect(getByText("Types of accounts")).toBeInTheDocument();
    expect(getByText("Stand-alone accounts")).toBeInTheDocument();
  });

  test("Should render correct article when draft/published article is accessed", async () => {
    const editArticle = jest.fn();
    const { getByLabelText, getAllByLabelText } = render(
      <Dashboard editArticle={editArticle} />
    );
    mockAxios
      .onGet("/categories")
      .reply(200, ["Lemonade", "Lemonade2", "Uncategorized"]);
    mockAxios.onGet("/articles").reply(200, mockSingleArticle);
    mockAxios
      .onGet("/categories/Lemonade")
      .reply(200, [mockSingleArticle[0].id]);
    await wait(() => getAllByLabelText("CategoryTab"));
    const [firstCategoryTab] = getAllByLabelText("CategoryTab");
    fireEvent.click(firstCategoryTab);
    await wait(() => getByLabelText("article-title"));
    const { getByText } = within(getByLabelText("article-title"));
    const articleTitle = getByText("Types of accounts");
    fireEvent.click(articleTitle);
    expect(editArticle).toHaveBeenCalled();
  });

  test("Should throw error if URL is invalid", async () => {
    const GET = async url => {
      const response = await axios.get(url, { withCredentials: true });
      return handleResponse(response);
    };
    mockAxios.onGet("/articles").reply(500, []);
    const expectedError = async () => {
      await GET("/articles");
    };
    return expect(expectedError()).rejects.toThrowError();
  });

  describe("CategoryBar.js", () => {
    test("Should render category bar when dashboard loads", () => {
      const { getByLabelText } = render(<Dashboard />);
      mockAxios
        .onGet("/categories")
        .reply(200, ["Lemonade", "Lemonade2", "Uncategorized"]);
      mockAxios.onGet("/articles").reply(200, mockSingleArticle);
      const CategoryBarComponent = getByLabelText("Category Bar");
      expect(CategoryBarComponent).toBeInTheDocument();
    });
  });

  test("Dashboard on render should show welcome message", async () => {
    const welcomeMsg = "Please Select a Category from Above to Begin";
    const { getByText } = render(<Dashboard />);
    expect(getByText(welcomeMsg)).toBeInTheDocument();
  });
});
