import React from "react";
import { Container, Divider, Label, Loader, Segment } from "semantic-ui-react";
import HeaderBar from "../component/HeaderBar";
import axios from "../utils/axios";
import SavedModal from "../component/SavedModal";
import {
  ErrorModalDuplicateTitle,
  ErrorModalNoTitle
} from "../component/SaveErrorModal";
import TopicAndSubtopic from "../component/TopicAndSubtopic";
import { v4 as uuidv4 } from "uuid";
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: true,
      modalState: { noTitleError: false, duplicateTitleError: false },
      editorState: { isSaved: false, isPublished: false },
      articleUpdatedAt: "",
      topicAndSubtopicArray: [
        {
          containerId: uuidv4(),
          title: "",
          blockArray: [""]
        },
        {
          containerId: uuidv4(),
          title: "",
          blockArray: [""]
        }
      ]
    };
  }

  toggleEditable = bool => {
    this.setState({ isEditable: bool });
  };

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
      if (
        this.state.topicAndSubtopicArray.filter(
          element => element.title.trim().length === 0
        ).length !== 0
      ) {
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
      return error;
    }
  };

  componentDidMount() {
    if (this.props.articleTitle === "") {
      this.updateArticleState([
        {
          containerId: uuidv4(),
          title: "",
          blockArray: [""]
        },
        {
          containerId: uuidv4(),
          title: "",
          blockArray: [""]
        }
      ]);
    } else
      axios
        .get(`articles/${this.props.articleTitle}`)
        .then(response => {
          this.updateArticleState(response.data[0].topicAndSubtopicArray);
          this.setState({
            articleUpdatedAt: response.data[0].updatedAt
          });
        })
        .catch(error => console.log(error));
  }

  render = () => {
    return (
      <Container aria-label="Editor">
        <HeaderBar
          isEditable={this.state.isEditable}
          toggleEditable={this.toggleEditable}
          saveDraft={this.saveDraft}
          addSubtopicContainer={this.addSubtopicContainer}
          returnToDash={this.props.returnToDashboard}
        />
        <Divider hidden section />
        <Segment basic>
          {this.props.articleTitle && (
            <Label
              attached="top left"
              color="teal"
              aria-label="Last Updated Label"
            >
              Last Updated:{" "}
              <Label.Detail>
                {!this.state.articleUpdatedAt ? (
                  <Loader size="mini" active inline />
                ) : (
                  new Date(this.state.articleUpdatedAt).toString()
                )}
              </Label.Detail>
            </Label>
          )}
        </Segment>
        <TopicAndSubtopic
          isEditable={this.state.isEditable}
          topicAndSubtopicArray={this.state.topicAndSubtopicArray}
          updateArticleState={this.updateArticleState}
        />
        <Divider hidden section />
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
