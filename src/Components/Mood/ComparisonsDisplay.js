import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fade from 'react-bootstrap/Fade';
import PercentDisplay from "./PercentDisplay";

export default class ComparisonsDisplay extends Component {
  constructor(props) {
    super(props);
  }

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
      <Row>
        <hr />
        <Fade in={this.props.showComparison} timeout={500}>
          <Col md={3}>

            <PercentDisplay
              percent={valence}
              descriptions={["Less happy", "Same hapiness", "Happier"]}
              emojis={["😭", "😢", "😕", "😃", "😁", "😊"]}
            />
          </Col>
        </Fade>
        <Fade in={this.props.showComparison} timeout={500}>
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
        </Fade>
        <Fade in={this.props.showComparison} timeout={500}>
          <Col md={3}>
            <PercentDisplay
              percent={energy}
              descriptions={["Less energetic", "Same energy", "More energetic"]}
              emojis={["😴", "⚡️", "🔥"]}
            />
          </Col>
        </Fade>
        <Fade in={this.props.showComparison} timeout={500}>
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
        </Fade>
        <hr />
      </Row>
    );
  }
}
