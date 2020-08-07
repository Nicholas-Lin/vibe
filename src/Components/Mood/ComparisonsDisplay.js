import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Fade from "react-bootstrap/Fade";
import Fade from "react-reveal/Fade";
import PercentDisplay from "./PercentDisplay";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

export default class ComparisonsDisplay extends Component {
  /**
   * Computes the averages of an array of features of tracks
   * @param  {Array<Features>} tracks - An array of track features
   * @return {Array<Objects>} - An array of objects that contain trackID, acousticness, danceability, energy, and valence properties
   */
  averageFeatures(tracks) {
    let averages = {};
    tracks.forEach((track) => {
      for (let key in track) {
        if (key !== "id") {
          if (!averages[key]) {
            averages[key] = track[key];
          } else {
            averages[key] += track[key];
          }
        }
      }
    });
    for (let key in averages) {
      averages[key] = averages[key] / tracks.length;
    }
    return averages;
  }

  /**
   * Returns the percent difference between the properties the newObject compared to the properties of the originalObject.
   * @param  {Object} originalObject- The original object that will be compared against
   * @param  {Object} newObject- The new object that will be compared to the original object
   * @return An object containing the same properties with the percent difference as values
   */
  calculatePercentDifferences(originalObject, newObject) {
    let differences = {};
    for (const key in originalObject) {
      const percentDifference = Math.round(
        ((newObject[key] - originalObject[key]) / originalObject[key]) * 100
      );
      differences[key] = percentDifference;
    }
    return differences;
  }

  render() {
    const averageRecentFeatures = this.averageFeatures(
      this.props.recentTracksFeatures
    );
    const averageComparisonFeatures = this.averageFeatures(
      this.props.comparisonTracksFeatures[this.props.comparisonType]
    );

    const differences = this.calculatePercentDifferences(
      averageComparisonFeatures,
      averageRecentFeatures
    );

    const { valence, danceability, energy, acousticness } = differences;

    return (
      <Fade bottom>
        <hr />
        <ButtonGroup className={"mb-2"}>
          <Button
            variant="outline-success"
            className={this.props.comparisonType === "top" && "active"}
            type="radio"
            name="comparisonType"
            value="top"
            onClick={(e) => this.props.handleChange(e)}
            checked={this.props.time_range === "top"}
            defaultChecked
          >
            Today's Top Hits
          </Button>
          <Button
            variant="outline-success"
            className={this.props.comparisonType === "short_term" && "active"}
            type="radio"
            name="comparisonType"
            value="short_term"
            onClick={(e) => this.props.handleChange(e)}
            checked={this.props.comparisonType === "short_term"}
          >
            Last Month
          </Button>
          <Button
            variant="outline-success"
            className={this.props.comparisonType === "medium_term" && "active"}
            type="radio"
            name="comparisonType"
            value="medium_term"
            onClick={(e) => this.props.handleChange(e)}
            checked={this.props.comparisonType === "medium_term"}
          >
            Last 6 Months
          </Button>
          <Button
            variant="outline-success"
            className={this.props.comparisonType === "long_term" && "active"}
            type="radio"
            name="comparisonType"
            value="long_term"
            onClick={(e) => this.props.handleChange(e)}
            checked={this.props.comparisonType === "long_term"}
          >
            All Time
          </Button>
        </ButtonGroup>

        <Row>
          <Col md={3}>
            <PercentDisplay
              percent={valence}
              descriptions={["Less happy", "Same happiness", "Happier"]}
              emojis={["😭", "😢", "😕", "😃", "😁", "😊"]}
            />
          </Col>
          <Col md={3}>
            <PercentDisplay
              percent={danceability}
              descriptions={[
                "Less danceable",
                "Same danceability",
                "More danceable",
              ]}
              emojis={["💃"]}
            />
          </Col>
          <Col md={3}>
            <PercentDisplay
              percent={energy}
              descriptions={["Less energetic", "Same energy", "More energetic"]}
              emojis={["😴", "⚡️", "🔥"]}
            />
          </Col>
          <Col md={3}>
            <PercentDisplay
              percent={acousticness}
              descriptions={[
                "Less acoustic",
                "Same acousticness",
                "More acoustic",
              ]}
              emojis={["🎸", "🎻"]}
            />
          </Col>
          <hr />
        </Row>
      </Fade>
    );
  }
}
