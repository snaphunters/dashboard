import { Segment } from "semantic-ui-react";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import CKEditor from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
// import TextAreaAutosize from "react-textarea-autosize";

const CKBlock = blockData => {
  return (
    <CKEditor
      editor={InlineEditor}
      data={blockData}
      onChange={(event, editor) => {
        const data = editor.getData();
        // this.props.updateInputInBlock(this.props.index, this.state.blockData);
      }}
    />
  );
};

function RichTextMediaBlock() {
  return <Segment aria-label="RichTextMediaBlock">{CKBlock()}</Segment>;
}

export default RichTextMediaBlock;
