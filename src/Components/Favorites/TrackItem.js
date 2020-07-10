import React from "react";
import "../../track.css";

class TrackItem extends React.Component {
  handleClick(previewURL) {
    this.props.playTrack(previewURL);
  }

  render() {
    const { position, track, searchTerm } = this.props;
    const albumImgURL = track.album.images[0].url;
    const previewURL = track.preview_url;

    // Track name does not contain the search term
    const termNotInName = track.name.toLowerCase().indexOf(searchTerm) === -1;
    // Artist name does not contain the search term
    const termNotInArtist =
      track.artists[0].name.toLowerCase().indexOf(searchTerm) === -1;

    // If search term not in track then do not render
    if (termNotInArtist && termNotInName) {
      return null;
    }

    return (
      <div onClick={() => this.handleClick(previewURL)}>
        <div className="track-history-item">
          <span className="order-number">{position}</span>
          <span className="track-info">
            <span
              className="track-cover"
              style={{ backgroundImage: `url(${albumImgURL})` }}
            ></span>
            <span className="track-summary">
              <span className="track-artist">{track.artists[0].name}</span>
              <span className="track-name">{track.name}</span>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default TrackItem;
