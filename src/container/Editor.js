import React from "react";

import { Container, Divider } from "semantic-ui-react";
import HeaderBar from "../component/HeaderBar";
import axios from "../utils/axios";
import SavedModal from "../component/SavedModal";
import {
  ErrorModalDuplicateTitle,
  ErrorModalNoTitle
} from "../component/SaveErrorModal";
import TopicAndSubtopic from "../component/TopicAndSubtopic";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: { noTitleError: false, duplicateTitleError: false },
      editorState: { isSaved: false, isPublished: false },
      topicAndSubtopicArray: [
        {
          title: "",
          blockArray: [""]
        },
        {
          title: "",
          blockArray: [""]
        }
      ]
    };
  }

  updateArticleState = newTopicAndSubtopicArray => {
    this.setState({
      topicAndSubtopicArray: newTopicAndSubtopicArray
    });
  };

  closeError = () => {
    this.setState({
      modalState: { duplicateTitleError: false, noTitleError: false }
    });
  };
  closeSaveModal = () => {
    this.setState({
      editorState: { isSaved: false }
    });
  };

  saveDraft = async () => {
    try {
      const articleDetails = {
        isPublished: false,
        title: this.state.topicAndSubtopicArray[0].title,
        topicAndSubtopicArray: this.state.topicAndSubtopicArray
      };
      const updatedEditorState = {
        isSaved: true,
        isPublished: false
      };
      if (this.state.topicAndSubtopicArray[0].title.trim().length === 0) {
        this.setState({
          modalState: { noTitleError: true }
        });
      } else {
        await axios.post("/articles", articleDetails);
        this.setState({ editorState: updatedEditorState });
      }
    } catch (error) {
      if (error.response.status === 422) {
        this.setState({
          modalState: { duplicateTitleError: true }
        });
      }
      console.log(error);
    }
  };

  render = () => {
    return (
      <Container aria-label="Editor">
        <HeaderBar saveDraft={this.saveDraft} />
        <Divider hidden section={true} />
        <TopicAndSubtopic
          topicAndSubtopicArray={this.state.topicAndSubtopicArray}
          updateArticleState={this.updateArticleState}
        />
        <SavedModal
          isSaved={this.state.editorState.isSaved}
          closeSave={this.closeSaveModal}
        />
        <ErrorModalDuplicateTitle
          showDuplicateTitleError={this.state.modalState.duplicateTitleError}
          closeError={this.closeError}
        />
        <ErrorModalNoTitle
          showNoTitleError={this.state.modalState.noTitleError}
          closeError={this.closeError}
        />
      </Container>
    );
  };
}

export default Editor;
