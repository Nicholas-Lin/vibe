/**
 * File Name: TrackFeaturesDisplay.js
 * Author: Nicholas Lin
 * Date: 7/13/20
 * Description: Displays contents for the "Your Mood" section
 */

import React, { Component } from "react";
import Slider from "./Slider";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { ImageCarousel } from "./ImageCarousel";

class TrackFeaturesDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { track } = this.props;

    return (
      <div>
        <div>{track.name}</div>
        <div>{track.artist}</div>
        <Slider
          title="Acousticness"
          value={Math.round(track.features.acousticness * 100)}
          valueLabelDisplay="auto"
        />
      </div>
    );
  }
}

export default TrackFeaturesDisplay;
