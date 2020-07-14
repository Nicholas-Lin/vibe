/**
 * File Name: TrackFeaturesDisplay.js
 * Author: Nicholas Lin
 * Date: 7/13/20
 * Description: Displays contents for the "Your Mood" section
 */

import React, { Component } from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
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
            <div>
                <div>{track.name}</div>
                <div>{track.artist}</div>
                <Nouislider connect start={[20, 80]} range={{ min: 0, max: 100 }} />
            </div>
        );
    }
}

export default TrackFeaturesDisplay;
