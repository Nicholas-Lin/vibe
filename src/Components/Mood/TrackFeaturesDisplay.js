/**
 * File Name: TrackFeaturesDisplay.js
 * Author: Nicholas Lin
 * Date: 7/13/20
 * Description: Displays contents for the "Your Mood" section
 */

import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { ImageCarousel } from "./ImageCarousel";


class TrackFeaturesDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { track } = this.props
        return (
            <div>{track.name}</div>
        );
    }
}

export default TrackFeaturesDisplay;
