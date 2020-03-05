import React from "react";
import "semantic-ui-css/semantic.min.css";

import {
  Container,
  Divider,
  Button,
  Header,
  Icon,
  Input,
  Label
} from "semantic-ui-react";
import TextBlock from "../component/TextBlock";
import HeaderBar from "../component/HeaderBar";
import axios from "../utils/axios";
import SavedModal from "../component/SavedModal";
import {
  OnSaveTitleExistsErrorModal,
  OnSaveNoTitleErrorModal
} from "../component/SaveErrorModal";
import { v4 as uuidv4 } from "uuid";
import TopicAndSubtopic from "../component/TopicAndSubtopic";
  Segment
} from "semantic-ui-react";
import RichTextMediaBlock from "../component/RichTextMediaBlock";
import { v4 as uuidv4 } from "uuid";
import TopicAndSubtopic from "../component/TopicAndSubtopic";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleTitle: "",
      blocks: {},
      blocksrendered: [],
      id: uuidv4(),
      blockContent: ""
    };
  }

  setArticleTitle = value => {
    this.setState({
      articleTitle: value
    });
  };

  setBlockContent = value => {
    this.setState({
      blockContent: value
    });
  };

  publishArticle = async article => {
    try {
      const articleDetails = {
        title: this.state.articleTitle,
        categories: this.state.categories,
        subCategories: this.state.subCategories,
        blocks: this.state.blocks,
        published: this.state.published
      };
      await axios.post("/articles", articleDetails);
      this.setState({
        isSaved: true
      });
    } catch (err) {
      if (this.state.articleTitle.trim().length === 0) {
        this.setState({
          noTitleError: true
        });
      } else {
        this.setState({
          titleExistError: true
        });
      }
    }
  };

  insertBlock = () => {
    const index = this.state.blocksrendered.length;
    const renderArr = this.state.blocksrendered;
    renderArr.push(
      <Container>
        <RichTextMediaBlock
          key={index}
          updateInputInBlock={this.updateInputInBlock}
          index={index}
        />
        <Button icon onClick={this.insertBlock} aria-label="Add Text Button">
          <Icon name="text cursor" />
        </Button>
      </Container>
    );
    this.setState({ blocksrendered: renderArr });
  };

  updateInputInBlock = (index, value) => {
    const blockobj = this.state.blocks;
    blockobj[index] = { blockData: value };
    this.setState({ blocks: blockobj });
  };

  render = () => {
    return (
      <Container>
        <HeaderBar saveDraft={this.publishArticle} />
        <Container>
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Container textAlign="center">
            <Header as="h1">Editor</Header>
            <Button
              icon
              onClick={this.insertBlock}
              aria-label="Add SubTopic Button"
            >
              <Icon name="plus" />
            </Button>
            <SavedModal
              isSaved={this.state.isSaved}
              onHandleSave={this.closeSaveModal}
            />
            <OnSaveTitleExistsErrorModal
              saveTitleExistError={this.state.titleExistError}
              onHandleSaveTitleExistError={this.closeTitleExistError}
            />
            <OnSaveNoTitleErrorModal
              noTitleError={this.state.noTitleError}
              onHandleNoTitleError={this.closeNoTitleError}
            />
          </Container>
          <Divider hidden />
        </Container>
        <Container textAlign="center" aria-label="Main Article Container">
          <Segment>{this.state.blocksrendered}</Segment>
          <Divider hidden />
        </Container>
      </Container>
    );
  };
}

export default Editor;
