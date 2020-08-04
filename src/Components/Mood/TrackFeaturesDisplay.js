/**
 * File Name: TrackFeaturesDisplay.js
 * Author: Nicholas Lin
 * Date: 7/13/20
 * Description: Displays contents for the "Your Mood" section
 */

import React, { Component } from "react";
import Slider from "./Slider";
import Col from "react-bootstrap/Col";
class TrackFeaturesDisplay extends Component {
  render() {
    const { track } = this.props;
    const COLORS = [
      "yellow",
      "orange",
      "red",
      "purple",
      "blue",
      "light-blue",
      "aqua",
      "green",
    ];
    const TOOLTIPS = [
      "Based on the total number of plays the track has had and how recent those plays are",
      "Describes the musical positiveness conveyed by a track",
      "Describes how suitable a track is for dancing based on tempo, rhythm, beat, etc.",
      "Represents a perceptual measure of intensity and activity",
      "A confidence measure from 0.0 to 1.0 of whether the track is acoustic",
      "Detects the presence of an audience in the recording",
      "Speechiness detects the presence of spoken words in a track",
      "Predicts whether a track contains no vocals",
    ];
    const sliders = [];
    let index = 0;
    for (const feature in track.features) {
      let value = track.features[feature];
      if (feature !== "popularity") {
        value = Math.round(value * 100);
      }
      let title = feature.charAt(0).toUpperCase() + feature.slice(1);
      if (title === "Valence") title = "Happiness";
      sliders.push(
        <Slider
          key={`${feature}-slider`}
          title={title}
          value={value}
          color={COLORS[index % COLORS.length]}
          tooltip={TOOLTIPS[index]}
        />
      );
      index++;
    }

    return (
      <Col className="d-flex flex-column h-100 justify-content-between p-0">
        {sliders}
      </Col>
    );
  }
}

export default TrackFeaturesDisplay;
