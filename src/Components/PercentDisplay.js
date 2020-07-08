import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltUp,
  faLongArrowAltDown,
} from "@fortawesome/free-solid-svg-icons";

import Container from "react-bootstrap/Container";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class MoodDashboard extends Component {
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
    } else if (percent == 0) {
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

    const rangeSize = 200 / emojis.length;
    const index = Math.floor((percent + 100) / rangeSize);
    emoji = emojis[index];

    percent = Math.abs(percent);

    return (
      <div>
        <span className="emoji"> {emoji} </span>
        <Row className="d-flex flex-direction-column justify-content-center align-items-center">
          {arrow}
          <h1>{percent}%</h1>
        </Row>
        <h5>{description}</h5>
      </div>
    );
  }
}

export default MoodDashboard;
