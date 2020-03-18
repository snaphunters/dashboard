import React from "react";
import { Container, Divider, Label, Loader, Segment } from "semantic-ui-react";
import HeaderBar from "../component/HeaderBar";
import axios from "../utils/axios";
import {
  SavedModal,
  PublishModal
} from "../component/SaveDraftAndPublishModal";
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
      articleUpdatedAt: "",
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

  closePublishModal = () => {
    this.setState({
      editorState: { isPublished: false }
    });
  };

  trimTitle = title => {
    return title
      .split(" ")
      .filter(word => word)
      .join(" ");
  };

  saveDraft = async () => {
    try {
      const articleDetails = {
        isPublished: false,
        title: this.trimTitle(this.state.topicAndSubtopicArray[0].title),
        topicAndSubtopicArray: this.state.topicAndSubtopicArray,
        category: this.state.categoryState.category
      };
      const updatedEditorState = {
        isSaved: true
      };
      if (
        this.state.topicAndSubtopicArray.filter(
          element => element.title.trim().length === 0
        ).length !== 0
      ) {
        this.setState({
          modalState: { noTitleError: true }
        });
      } else if (this.props.articleId) {
        await axios.patch(
          `/articles/update/${this.props.articleId}`,
          articleDetails
        );
        this.setState({ editorState: updatedEditorState });
      } else {
        articleDetails.id = uuidv4();
        await axios.post("/articles", articleDetails);
        this.setState({ editorState: updatedEditorState });
        this.props.updateArticleId(articleDetails.id);
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

  publishTopic = async () => {
    try {
      const articleDetails = {
        isPublished: true,
        title: this.trimTitle(this.state.topicAndSubtopicArray[0].title),
        topicAndSubtopicArray: this.state.topicAndSubtopicArray,
        id: uuidv4(),
        category: this.state.categoryState.category
      };
      const updatedEditorState = {
        isPublished: true
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
        await Promise.all([
          axios.post("/publish", articleDetails),
          axios.post("/articles", articleDetails)
        ]);
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

  displayArticle = () => {
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
    } else {
      axios
        .get(`articles/${this.props.articleTitle}`)
        .then(response => {
          this.updateArticleState(response.data[0].topicAndSubtopicArray);
          this.setState({
            articleUpdatedAt: response.data[0].updatedAt
          });
          this.props.updateArticleId(response.data[0].id);
        })
        .catch(error => console.log(error));
    }
  };

  componentDidMount() {
    this.getCategories();
    this.displayArticle();
  }

  render = () => {
    return (
      <Container aria-label="Editor">
        <HeaderBar
          isEditable={this.state.isEditable}
          toggleEditable={this.toggleEditable}
          saveDraft={this.saveDraft}
          publishTopic={this.publishTopic}
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
        <PublishModal
          isPublished={this.state.editorState.isPublished}
          closePublish={this.closePublishModal}
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
