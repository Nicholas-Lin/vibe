import React from "react";
import "../../result.css";
import SoundWave from "../SoundWave";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import Fade from "react-reveal/Fade";

class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      isHovering: false,
    };
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  handleClick() {
    this.props.playTrack(this.props.previewURL);
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render() {
    const {
      type,
      position,
      title,
      subtitle,
      searchTerm,
      image,
      isPlaying,
    } = this.props;

    // Track name does not contain the search term
    const termNotInTitle =
      title.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1;
    // Artist name does not contain the search term
    const termNotInSubtitle =
      subtitle.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1;

    // If search term not in track then do not render
    if (termNotInTitle && termNotInSubtitle) {
      return null;
    }

    const resultCoverStyle = image
      ? { backgroundImage: `url(${image})` }
      : { backgroundColor: "black" };

    let item = (
      <Fade>
        <div className="result-item">
          <span className="order-number">{position}</span>
          <span className="result-info">
            <span className="result-cover" style={resultCoverStyle}></span>
            <span className="result-summary">
              <span className="result-artist">{subtitle}</span>
              <span className="result-name">{title}</span>
            </span>
          </span>
          <div style={{ marginLeft: "auto" }}>
            {isPlaying ? (
              <SoundWave />
            ) : (
              this.state.isHovering && (
                <FontAwesomeIcon size="3x" icon={faPlayCircle} />
              )
            )}
          </div>
        </div>
      </Fade>
    );

    if (type === "track") {
      if (this.props.previewURL) {
        item = (
          <div
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}
            onClick={() => this.handleClick()}
          >
            {item}
          </div>
        );
      } else {
        item = (
          <a
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}
            href={this.props.uri}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item}
          </a>
        );
      }
    } else {
      item = (
        <a href={this.props.uri} rel="noopener noreferrer" target="_blank">
          {item}
        </a>
      );
    }

    return item;
  }
}

export default ResultItem;
