/**
 * File Name: RecentShowcase.js
 * Author: Nicholas Lin
 * Date: 7/13/20
 * Description: Displays contents for the "Your Mood" section
 */

import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TrackFeaturesDisplay from "./TrackFeaturesDisplay";
import { ImageCarousel } from "./ImageCarousel";


class RecentShowcase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e)
        this.setState({ currentIndex: e })
    }

    render() {
        const trackImages = this.props.tracks.map((track) => { return { key: track.id, url: track.image } })
        const currentTrack = this.props.tracks[this.state.currentIndex];
        return (
            <Row className="d-flex justify-content-center mt-2">
                <Col
                    md={{ span: 6, order: 2 }}
                    className="d-flex flex-column justify-content-center h-100"
                >
                    <ImageCarousel images={trackImages} handleChange={this.handleChange} />
                </Col>
                <Col md={{ span: 6, order: 1 }}>
                    <TrackFeaturesDisplay track={currentTrack} />
                </Col>
            </Row>
        );
    }
}

export default RecentShowcase;
