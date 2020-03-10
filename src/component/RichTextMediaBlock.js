import { Container, Button, Segment, Divider } from "semantic-ui-react";
import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import BalloonBlockEditor from "@ckeditor/ckeditor5-build-balloon-block";

const RichTextMediaBlock = ({
  topicAndSubtopicArray,
  updateArticleState,
  blocksArray
}) => {
  const blockChange = (value, index) => {
    blocksArray[index] = value;
    updateArticleState(topicAndSubtopicArray);
  };
  return blocksArray.map((CKString, blockArrayIndex) => {
    return (
      <Container key={blockArrayIndex}>
        <Divider hidden />
        <Segment aria-label="CKEditorContainer">
          <CKEditor
            editor={BalloonBlockEditor}
            data={CKString}
            onChange={(event, editor) => {
              /* istanbul ignore next line */
              blockChange(editor.getData(), blockArrayIndex);
            }}
            config={{
              mediaEmbed: {
                extraProviders: {
                  name: "allow-all",
                  url: /.*/,
                  html: /* istanbul ignore next */ match =>
                    `<video controls width="100%"><source src=${match} type="video/mp4"/> Sorry, your broswer does not support the &lt; video&gt; tag.</video>`
                }
              }
            }}
          />
        </Segment>
        <Button icon="plus circle" />
      </Container>
    );
  });
};

export default RichTextMediaBlock;
