import React from "react";
import {
  Button,
  Container,
  Header,
  Segment,
  Menu,
  Label
} from "semantic-ui-react";
import axios from "../utils/axios";
import CategoryBar from "../component/CategoryBar";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleArray: [],
      activeCategory: "",
      categoryArray: [],
      topicsInCategoryArray: []
    };
  }
  componentDidMount() {
    this.getArticles();
    this.getCategoryList();
  }

  getArticles = async () => {
    const Articles = await axios.get("/articles");
    this.setState({
      articleArray: Articles.data
    });
  };

  getCategoryList = async () => {
    const categories = await axios.get("/categories");
    this.setState({ categoryArray: categories.data });
  };

  updateActiveCategory = (event, { name }) =>
    this.setState({ activeCategory: name });

  getTopicsInCategory = async () => {
    const topicsInCategory = await axios.get(
      `categories/${this.state.activeCategory}`
    );
    this.setState({
      topicsInCategoryArray: topicsInCategory.data
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeCategory !== prevState.activeCategory) {
      this.getTopicsInCategory();
    }
  }

  render = () => {
    const welcomeMsg = "Please Select a Category from Above to Begin";
    const { createNewArticle } = this.props;
    const { articleArray, activeCategory, topicsInCategoryArray } = this.state;
    return (
      <Container textAlign="center" aria-label="Dashboard">
        <Button
          content="Create New Article"
          onClick={createNewArticle}
          aria-label="Create New Article"
        />
        <CategoryBar
          categoryArray={this.state.categoryArray}
          updateActiveCategory={this.updateActiveCategory}
          activeCategory={this.state.activeCategory}
        />
        <Container>
          <Menu
            aria-label="article-title-container"
            vertical
            fluid
            size="massive"
          >
            {activeCategory === "" && <Menu.Item>{welcomeMsg}</Menu.Item>}
            {topicsInCategoryArray
              .map(topicId => articleArray.find(topic => topic.id === topicId))
              .filter(item => Boolean(item))
              .map(topicToShow => {
                return (
                  <Segment aria-label="article-title" key={topicToShow._id}>
                    <Menu.Item horizontal="true">
                      <Button
                        basic
                        active
                        size="massive"
                        fluid
                        onClick={this.props.editArticle}
                      >
                        {topicToShow.title}
                      </Button>

                      <Label
                        aria-label="article-publish-status"
                        aria-hidden="false"
                      >
                        {topicToShow.isPublished === false
                          ? "DRAFT"
                          : "PUBLISHED"}
                      </Label>
                      {topicToShow.topicAndSubtopicArray.map(
                        (subtopic, idx) =>
                          !(idx === 0) && (
                            <Header
                              key={subtopic._id}
                              size="tiny"
                              content={subtopic.title}
                            />
                          )
                      )}
                    </Menu.Item>
                  </Segment>
                );
              })}
          </Menu>
        </Container>
      </Container>
    );
  };
}
export default Dashboard;
