import React, { Component } from "react";
import "../../progress-circle.css";
import Col from "react-bootstrap/Col";

class PopularityDisplay extends Component {
  render() {
    let { score } = this.props;
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
      if (score >= lowerBound && score < upperBound) {
        description = descriptions[i];
        emoji = emojis[i];
        break;
      }
    }

    return (
      <Col
        className="d-flex flex-column justify-content-center"
        style={{ height: "30vh" }}
      >
        <h3>{`${description} ${emoji}`}</h3>
        <h4>{"Popularity Score"}</h4>

        <svg viewBox="0 0 36 36" className="circular-chart green">
          <path
            className="circle-bg"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            strokeDasharray="60, 100"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".35em"
            className="percentage"
          >
            {Math.round(score)}
          </text>
        </svg>
      </Col>
    );
  }
}

export default PopularityDisplay;
