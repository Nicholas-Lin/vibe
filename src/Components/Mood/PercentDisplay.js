import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltUp,
  faLongArrowAltDown,
} from "@fortawesome/free-solid-svg-icons";

import Row from "react-bootstrap/Row";

class PercentDisplay extends Component {
  render() {
    let { percent, descriptions, emojis } = this.props;
    let description = "";
    let arrow, emoji;
    if (percent < 0) {
      arrow = (
        <FontAwesomeIcon
          icon={faLongArrowAltDown}
          size="lg"
          color="red"
          style={{ marginRight: "0.5em" }}
        />
      );
      description = descriptions[0];
    } else if (percent === 0) {
      description = descriptions[1];
    } else {
      arrow = (
        <FontAwesomeIcon
          icon={faLongArrowAltUp}
          size="lg"
          color="rgba(73, 209, 0, 1)"
          style={{ marginRight: "0.5em" }}
        />
      );
      description = descriptions[2];
    }

    if (percent > 100) {
      emoji = emojis[emojis.length - 1];
    } else if (percent < -100) {
      emoji = emojis[0];
    } else {
      const rangeSize = 200 / emojis.length;
      const index = Math.floor((percent + 100) / rangeSize);
      emoji = emojis[index];
    }

    return (
      <div>
        <span className="emoji"> {emoji} </span>
        <Row className="d-flex flex-direction-column justify-content-center align-items-center">
          {arrow}
          <h2>{Math.abs(percent)}%</h2>
        </Row>
        <h5>{description}</h5>
      </div>
    );
  }
}

export default PercentDisplay;
