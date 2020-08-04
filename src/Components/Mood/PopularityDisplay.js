import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./progress-circle.css";

class PopularityDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };
  }
  render() {
    const ranges = [0, 30, 50, 70, 90, 100];
    const descriptions = [
      "Hipster",
      "Eccentric",
      "Trendy",
      "Mainstream",
      "Basic",
    ];
    const emojis = ["🧐", "🤔", "😎", "🤩", "💁‍♀️"];
    let description, emoji;

    for (let i = 0; i < ranges.length - 1; i++) {
      const lowerBound = ranges[i];
      const upperBound = ranges[i + 1];
      if (this.props.score >= lowerBound && this.props.score < upperBound) {
        description = descriptions[i];
        emoji = emojis[i];
        break;
      }
    }
    setTimeout(() => {
      this.setState({ score: Math.round(this.props.score) });
    }, 500);

    return (
      <Col className="flex-column justify-content-center popularity-display">
        <h3>{`${description} ${emoji}`}</h3>
        <h4>{"Popularity Score"}</h4>
        <Row className="justify-content-center" style={{ height: "75%" }}>
          <CircularProgressbar
            value={this.state.score}
            text={this.state.score}
            background={true}
            backgroundPadding={5}
          />
        </Row>
      </Col>
    );
  }
}

export default PopularityDisplay;
