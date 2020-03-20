import React from "react";
import { Label, Loader } from "semantic-ui-react";
import moment from "moment";

const TimeLabel = ({ status, color, time }) => {
  return (
    <Label
      attached="top left"
      color={color}
      aria-label={`Last ${status} label`}
    >
      {`Last ${status}: `}
      <Label.Detail>
        {!time ? (
          <Loader size="mini" active inline />
        ) : (
          // new Date(time).toString()
          moment(time).fromNow()
        )}
      </Label.Detail>
    </Label>
  );
};

export default TimeLabel;
