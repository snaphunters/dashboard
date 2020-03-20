import React from "react";
import { Container, Divider, Segment, Grid } from "semantic-ui-react";
import HeaderBar from "../component/HeaderBar";
import axios from "../utils/axios";
import ConfirmDeleteModal from "../component/ConfirmDeleteArticleModal";
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
import TimeLabel from "../component/TimeLabel";
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: true,
      modalState: { noTitleError: false, duplicateTitleError: false },
      editorState: { showSavedModal: false, showPublishedModal: false },
      deleteState: { deleteModalOpen: false, confirmDelete: false },
      updateState: {
        lastSaveDraftTime: "",
        lastPublishTime: "",
        isPublished: false
      },
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
        this.setState({
          categoryState
        });
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
      editorState: { showSavedModal: false }
    });
  };

  openDeleteModal = () => {
    this.setState({
      deleteState: { deleteModalOpen: true }
    });
  };

  closeDeleteModal = () => {
    this.setState({
      deleteState: { deleteModalOpen: false }
    });
  };
  closePublishModal = () => {
    this.setState({
      editorState: { showPublishedModal: false }
    });
  };

  trimTitle = title => {
    return title
      .split(" ")
      .filter(word => word)
      .join(" ");
  };

  getTitle = () => {
    return this.state.topicAndSubtopicArray[0].title;
  };

  confirmDelete = async () => {
    const articleToDelete = this.state.topicAndSubtopicArray[0].title;
    await axios.delete(`/articles/${articleToDelete}`);
    this.setState({
      deleteState: {
        confirmDelete: true
      }
    });
    window.location.reload(true);
  };

  saveDraft = async () => {
    try {
      const articleDetails = {
        showPublishedModal: false,
        title: this.trimTitle(this.state.topicAndSubtopicArray[0].title),
        topicAndSubtopicArray: this.state.topicAndSubtopicArray,
        category: this.state.categoryState.category
      };
      const updatedEditorState = {
        showSavedModal: true
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
        showPublishedModal: true,
        title: this.trimTitle(this.state.topicAndSubtopicArray[0].title),
        topicAndSubtopicArray: this.state.topicAndSubtopicArray,
        category: this.state.categoryState.category
      };
      const updatedEditorState = {
        showPublishedModal: true
      };
      if (
        this.state.topicAndSubtopicArray.filter(
          element => element.title.trim().length === 0
        ).length !== 0
      ) {
        this.setState({
          modalState: { noTitleError: true }
        });
      }
      const existInPublishCollection = await this.isPublishedOrNew(
        this.props.articleId
      );
      if (!!this.props.articleId && existInPublishCollection) {
        await Promise.all([
          axios.patch(
            `/publish/update/${this.props.articleId}`,
            articleDetails
          ),
          axios.patch(
            `/articles/update/${this.props.articleId}`,
            articleDetails
          )
        ]);
        this.setState({ editorState: updatedEditorState });
      } else if (!!this.props.articleId && !existInPublishCollection) {
        articleDetails.id = this.props.articleId;
        await Promise.all([
          axios.post("/publish", articleDetails),
          axios.patch(
            `/articles/update/${this.props.articleId}`,
            articleDetails
          )
        ]);
        this.setState({ editorState: updatedEditorState });
      } else {
        articleDetails.id = uuidv4();
        await Promise.all([
          axios.post("/publish", articleDetails),
          axios.post("/articles", articleDetails)
        ]);
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

  isPublishedOrNew = async articleId => {
    const response = await axios.get(`/publish/${articleId}`);
    return response.data.length !== 0;
  };

  updatePublishedState = async articleId => {
    if (articleId === "") {
      return;
    }
    const response = await axios.get(`/publish/${articleId}`);
    if (response.data.length === 1) {
      const updateState = { ...this.state.updateState };
      updateState.isPublished = true;
      updateState.lastPublishTime = response.data[0].updatedAt;
      this.setState({ updateState });
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
          const updateState = { ...this.state.updateState };
          updateState.lastSaveDraftTime = response.data[0].updatedAt;
          this.setState({
            updateState,
            categoryState: {
              categoryArray: this.state.categoryState.categoryArray,
              category: response.data[0].category
            }
          });
          this.props.updateArticleId(response.data[0].id);
        })
        .catch(error => console.log(error));
    }
  };

  componentDidMount() {
    this.getCategories();
    this.displayArticle();
    this.updatePublishedState(this.props.articleId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.articleId !== this.props.articleId) {
      this.updatePublishedState(this.props.articleId);
    }
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
          getTitle={this.getTitle}
          openDeleteModal={this.openDeleteModal}
        />
        <Divider hidden section />
        <Segment basic>
          <Grid>
            {this.props.articleTitle && (
              <Grid.Row>
                <TimeLabel
                  status="saved"
                  color="teal"
                  time={this.state.updateState.lastSaveDraftTime}
                />
              </Grid.Row>
            )}
            {this.props.articleTitle && this.state.updateState.isPublished && (
              <Grid.Row>
                <TimeLabel
                  status="published"
                  color="yellow"
                  time={this.state.updateState.lastPublishTime}
                />
              </Grid.Row>
            )}
          </Grid>
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
          showSavedModal={this.state.editorState.showSavedModal}
          closeSave={this.closeSaveModal}
        />
        <ConfirmDeleteModal
          openDeleteModal={this.state.deleteState.deleteModalOpen}
          closeDeleteModal={this.closeDeleteModal}
          confirmDelete={this.confirmDelete}
        />

        <PublishModal
          showPublishedModal={this.state.editorState.showPublishedModal}
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
