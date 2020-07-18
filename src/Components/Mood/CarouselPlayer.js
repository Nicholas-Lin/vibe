/**
 * File Name: AudioPlayer.js
 * Author: Nicholas Lin
 * Date: 7/13/20
 * Description: Displays contents for the "Your Mood" section
 */

import React, { Component } from "react";
import AudioPlayer from "react-h5-audio-player";
import { ImageCarousel } from "./ImageCarousel";
import "react-h5-audio-player/lib/styles.css";
import "./audio-player.css";

class CarouselPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackIsPlaying: false,
    };
    //If user plays track => pause carousel
    //If user skips track while track is playing => go to next slide and play
    //If user skips track while track is not playing => go to next slide and do not play

    //If user pauses track => resume carousel && do not play next track
    //If track ends => resume carousel && play next track
  }

  handlePlayPause(e) {
    if (e.type === "play") {
      this.setState({ trackIsPlaying: true });
    } else if (e.type === "pause") {
      this.setState({ trackIsPlaying: false });
    }
  }

  handleEnded(e) {
    this.props.nextSlide(e);
    this.setState({ trackIsPlaying: true });
  }

  render() {
    return (
      <div>
        <ImageCarousel
          images={this.props.trackImages}
          handleSlide={this.props.handleSlide}
          pause={this.state.trackIsPlaying}
          activeIndex={this.props.currentIndex}
        />

        <AudioPlayer
          autoPlay={this.state.trackIsPlaying}
          src={this.props.currentTrack.previewURL}
          onPlay={(e) => this.handlePlayPause(e)}
          onPause={(e) => this.handlePlayPause(e)}
          onClickPrevious={(e) => this.props.previousSlide(e)}
          onClickNext={(e) => this.props.nextSlide(e)}
          onEnded={(e) => this.handleEnded(e)}
          showFilledProgress={false}
          showDownloadProgress={false}
          showSkipControls={true}
          showJumpControls={false}
          customProgressBarSection={[]}
          volume={0.3}
          autoPlayAfterSrcChange={this.state.trackIsPlaying}
        />
      </div>
    );
  }
}

export default CarouselPlayer;
