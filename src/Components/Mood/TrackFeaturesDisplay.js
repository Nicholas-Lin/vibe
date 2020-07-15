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
    const COLORS = [
      "yellow",
      "orange",
      "red",
      "purple",
      "blue",
      "light-blue",
      "aqua",
      "green"
    ];
    const TOOLTIPS = ["pop", "val", "dance", "energy", "acoust", "live", "speech", "instrum"]
    const sliders = [];
    let index = 0;
    for (const feature in track.features) {
      let value = track.features[feature];
      if (feature !== "popularity") {
        value = Math.round(value * 100);
      }
      const title = feature.charAt(0).toUpperCase() + feature.slice(1);
      sliders.push(
        <Slider key={`${feature}-slider`} title={title} value={value} color={COLORS[index % COLORS.length]} tooltip={TOOLTIPS[index]} />
      );
      index++;
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
