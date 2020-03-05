import { Form, Divider, Segment } from "semantic-ui-react";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import TextAreaAutosize from "react-textarea-autosize";

class TextBlock extends React.Component {
  updateInput = event => {
    this.props.updateInputText(event.target.value);
  };

  render() {
    return (
      <div>
        <Segment textAlign="left">
          <Form>
            <Form.TextArea
              control={TextAreaAutosize}
              onChange={this.updateInput}
              label="Content"
              placeholder={this.props.value}
              aria-label="Article Content Block"
            />
          </Form>
        </Segment>
        <Divider hidden />
      </div>
    );
  }
}

export default TextBlock;
