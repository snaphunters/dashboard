import { Segment, Embed } from "semantic-ui-react";
import React from "react";
import "semantic-ui-css/semantic.min.css";

const VideoBlock = ({ defaulturl }) => {
  return (
    <Segment>
      {" "}
      <Embed active={true} url={defaulturl} />{" "}
    </Segment>
  );
};

export default VideoBlock;
