/**
 * File Name: RecentShowcase.js
 * Author: Nicholas Lin
 * Date: 7/13/20
 * Description: Displays contents for the "Your Mood" section
 */

import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TrackFeaturesDisplay from "./TrackFeaturesDisplay";

import CarouselPlayer from "./CarouselPlayer";
import "react-h5-audio-player/lib/styles.css";
import "./audio-player.css";

class RecentShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: this.props.tracks[0],
      currentIndex: 0,
    };
    this.handleSlide = this.handleSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  handleSlide(e) {
    this.setState({ currentIndex: e, currentTrack: this.props.tracks[e] });
  }

  nextSlide() {
    const newIndex = (this.state.currentIndex + 1) % this.props.tracks.length;
    this.setState({
      currentIndex: newIndex,
      currentTrack: this.props.tracks[newIndex],
    });
  }

  previousSlide() {
    const newIndex =
      this.state.currentIndex === 0
        ? this.props.tracks.length - 1
        : this.state.currentIndex - 1;
    this.setState({
      currentIndex: newIndex,
      currentTrack: this.props.tracks[newIndex],
    });
  }

  render() {
    const trackImages = this.props.tracks.map((track) => {
      return { key: track.id, url: track.image };
    });

    return (
      <div>
        <div style={{ minHeight: "5em" }}>
          <h4>{this.state.currentTrack.name}</h4>
          <h6>{this.state.currentTrack.artist}</h6>
        </div>
        <Row className="d-flex justify-content-center mt-2">
          <Col
            md={{ span: 6, order: 2 }}
            className="d-flex flex-column justify-content-center h-100"
          >
            <CarouselPlayer
              trackImages={trackImages}
              handleSlide={this.handleSlide}
              currentTrack={this.state.currentTrack}
              currentIndex={this.state.currentIndex}
              nextSlide={this.nextSlide}
              previousSlide={this.previousSlide}
            />
          </Col>
          <Col md={{ span: 6, order: 1 }}>
            <TrackFeaturesDisplay track={this.state.currentTrack} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default RecentShowcase;
