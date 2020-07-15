/**
 * File Name: TrackFeaturesDisplay.js
 * Author: Nicholas Lin
 * Date: 7/13/20
 * Description: Displays contents for the "Your Mood" section
 */

import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";

import "./slider.css";
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
        <h5>Acousticness: {Math.round(track.features.acousticness * 100)}</h5>
        <Slider
          value={Math.round(track.features.acousticness * 100)}
          aria-labelledby="discrete-slider-small-steps"
          valueLabelDisplay="auto"
          disabled={false}
        />
      </div>
    );
  }
}

export default TrackFeaturesDisplay;
