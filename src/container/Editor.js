import React from "react";

import { Container, Divider } from "semantic-ui-react";
import HeaderBar from "../component/HeaderBar";
// import axios from "../utils/axios";
// import SavedModal from "../component/SavedModal";
// import SaveErrorModal from "../component/SaveErrorModal";
import TopicAndSubtopic from "../component/TopicAndSubtopic";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // blocks: {},
      // blocksrendered: [],
      // blockContent: "",
      topicAndSubtopicArray: [
        {
          name: "",
          blockArray: [""]
        },
        {
          name: "",
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
  /////////////////////
  // setArticleTitle = value => {
  //   this.setState({
  //     articleTitle: value
  //   });
  // };

  // publishArticle = async article => {
  //   try {
  //     const articleDetails = {
  //       title: this.state.articleTitle,
  //       categories: this.state.categories,
  //       subCategories: this.state.subCategories,
  //       blocks: this.state.blocks,
  //       published: this.state.published
  //     };
  //     console.log("hello there");
  //     const res = await axios.post("/articles", articleDetails);
  //     console.log(res);
  //     this.setState({
  //       isSaved: true
  //     });
  //   } catch (err) {
  //     this.setState({
  //       isSaveError: true
  //     });
  //   }
  // };

  // setBlockContent = value => {
  //   this.setState({
  //     blockContent: value
  //   });
  // };

  // insertBlock = () => {
  //   const index = this.state.blocksrendered.length;
  //   const renderArr = this.state.blocksrendered;
  //   renderArr.push(
  //     <Container>
  //       <RichTextMediaBlock
  //         key={index}
  //         updateInputInBlock={this.updateInputInBlock}
  //         index={index}
  //       />
  //       <Button icon onClick={this.insertBlock} aria-label="Add Text Button">
  //         <Icon name="text cursor" />
  //       </Button>
  //     </Container>
  //   );
  //   this.setState({ blocksrendered: renderArr });
  // };

  // updateInputInBlock = (index, value) => {
  //   const blockobj = this.state.blocks;
  //   blockobj[index] = { blockData: value };
  //   this.setState({ blocks: blockobj });
  // };
  /////////////////
  render = () => {
    return (
      <Container aria-label="Editor">
        <HeaderBar />
        <Divider hidden section={true} />
        <TopicAndSubtopic
          topicAndSubtopicArray={this.state.topicAndSubtopicArray}
          updateArticleState={this.updateArticleState}
        />
      </Container>

      // <Container>
      //   <HeaderBar saveDraft={this.publishArticle} />
      //   <Container>
      //     <Divider hidden />
      //     <Divider hidden />
      //     <Divider hidden />
      //     <Container textAlign="center">
      //       <Header as="h1">Editor</Header>
      //       <Container className="debugger">
      //         <TopicAndSubtopic
      //           id={this.state.id}
      //           blockContent={this.setBlockContent}
      //           workingArticleTitle={this.setArticleTitle}
      //         />
      //       </Container>
      //       <Input
      //         label="Article Title: "
      //         size="large"
      //         placeholder="Enter title here"
      //         value={articleTitle}
      //         onChange={e => this.setState({ articleTitle: e.target.value })}
      //         aria-label="Article Title Input Box"
      //       ></Input>
      //       <Button
      //         icon
      //         onClick={this.insertBlock}
      //         aria-label="Add SubTopic Button"
      //       >
      //         <Icon name="plus" />
      //       </Button>
      //       <Divider hidden />
      //     </Container>
      //     <Divider hidden />
      //   </Container>
      //   <Container textAlign="center" aria-label="Main Article Container">
      //     <Segment>{this.state.blocksrendered}</Segment>
      //     <Divider hidden />
      //   </Container>
      // </Container>
    );
  };
}

export default Editor;
