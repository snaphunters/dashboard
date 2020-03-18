import React from "react";
import { Container, Divider } from "semantic-ui-react";
import HeaderBar from "../component/HeaderBar";
import axios from "../utils/axios";
import SavedModal from "../component/SavedModal";
import CategoryMenu from "../component/CategoryMenu";
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
      categoryState: { categoryArray: [], category: "Uncategorized" },
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

  componentDidMount() {
    this.getCategories();
  }

  getCategories() {
    axios
      .get("/categories")
      .then(response => {
        const categoryState = { ...this.state.categoryState };
        categoryState.categoryArray = response.data;
        this.setState({ categoryState });
      })
      .catch(error => {
        return error;
      });
  }
  updateCategory = newCategory => {
    const categoryState = { ...this.state.categoryState };
    categoryState.category = newCategory;
    this.setState({ categoryState });
  };

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
        topicAndSubtopicArray: this.state.topicAndSubtopicArray,
        id: uuidv4(),
        category: this.state.categoryState.category
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
        <CategoryMenu
          categoryArray={this.state.categoryState.categoryArray}
          category={this.state.categoryState.category}
          updateCategory={this.updateCategory}
        />
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
