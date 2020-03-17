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
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleArray: []
    };
  }
  componentDidMount() {
    axios
      .get("articles")
      .then(response => {
        this.setState({
          articleArray: response.data
        });
      })
      .catch(error => {
        return error;
      });
  }

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
                    <Header as="h2" onClick={this.props.editArticle}>
                      {item.title}
                    </Header>
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
