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

import CarouselPlayer from "./CarouselPlayer";
import "react-h5-audio-player/lib/styles.css";
import "./audio-player.css";

class RecentShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: this.props.tracks[0],
    };
    this.handleSlide = this.handleSlide.bind(this);
  }

  handleSlide(e) {
    this.setState({ currentTrack: this.props.tracks[e] });
  }

  render() {
    const trackImages = this.props.tracks.map((track) => {
      return { key: track.id, url: track.image };
    });

    return (
      <Row className="d-flex justify-content-center mt-2">
        <Col
          md={{ span: 6, order: 2 }}
          className="d-flex flex-column justify-content-center h-100"
        >
          <CarouselPlayer
            trackImages={trackImages}
            handleSlide={this.handleSlide}
            trackURL={this.state.currentTrack.previewURL}
          />
        </Col>
        <Col md={{ span: 6, order: 1 }}>
          <TrackFeaturesDisplay track={this.state.currentTrack} />
        </Col>
      </Row>
    );
  }
}

export default RecentShowcase;
