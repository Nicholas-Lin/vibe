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
    const COLORS = ["#f9b127", "#eb6617", "#e82c4f", "#62509c", "#2884c7", "#26a69a", "#66bb6a"]

    const sliders = []
    for (const feature in track.features) {
      let value = track.features[feature];
      if (feature !== "popularity") {
        value = Math.round(value * 100)
      }
      sliders.push(<Slider
        title={feature}
        value={value}
      />)
    }

    return (
      <div>
        <div>{track.name}</div>
        <div>{track.artist}</div>
        {sliders}
      </div>
    );
  }
}

export default TrackFeaturesDisplay;
