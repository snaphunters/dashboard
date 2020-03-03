import { Form, Divider, Segment } from "semantic-ui-react";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import TextAreaAutosize from "react-textarea-autosize";

class TextBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: "" };
  }
  onChangeHandler = event => {
    this.setState({ inputText: event.target.value });
  };
  render() {
    return (
      <div>
        <Segment textAlign="left">
          <Form>
            <Form.TextArea
              control={TextAreaAutosize}
              onChange={this.onChangeHandler}
              label="Content"
              placeholder="Type content here..."
            />
          </Form>
        </Segment>
        <Divider hidden />
      </div>
    );
  }
}

export default TextBlock;
