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
      categoryArray: [],
      activeCategory: ""
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

  render = () => {
    const { createNewArticle } = this.props;
    const { articleArray } = this.state;
    return (
      <Container textAlign="center">
        <Header as="h1">Dashboard</Header>
        <Button
          onClick={createNewArticle}
          icon="plus circle"
          aria-label="Create New Article"
        ></Button>
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
            {articleArray.map((item, idx) => {
              return (
                <Segment aria-label="article-title" key={item._id}>
                  <Menu.Item horizontal="true">
                    <Button
                      basic
                      active
                      size="massive"
                      fluid
                      onClick={this.props.editArticle}
                    >
                      {item.title}
                    </Button>

                    <Label
                      aria-label="article-publish-status"
                      aria-hidden="false"
                    >
                      {item.isPublished === false ? "DRAFT" : "PUBLISHED"}
                    </Label>
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
