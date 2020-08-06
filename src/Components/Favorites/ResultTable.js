import React from "react";
import ResultItem from "./ResultItem";

class ResultTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyPlaying: "",
    };
    this.playTrack = this.playTrack.bind(this);
  }
  playTrack(previewURL) {
    let activeTrack = document.getElementById("favorite-player");
    if (!activeTrack) {
      activeTrack = new Audio(previewURL);
      activeTrack.setAttribute("id", "favorite-player");
      activeTrack.onended = () => this.setState({ currentlyPlaying: "" });

      activeTrack.volume = 0.3;
      document.getElementById("result-table").append(activeTrack);
      activeTrack.play();
      this.setState({ currentlyPlaying: previewURL });
    } else {
      if (activeTrack.paused) {
        activeTrack.play();
        this.setState({ currentlyPlaying: previewURL });
      } else {
        activeTrack.pause();
        this.setState({ currentlyPlaying: "" });
      }
      if (activeTrack.src !== previewURL) {
        activeTrack.currentTime = 0;
        activeTrack.src = previewURL;
        activeTrack.play();
        this.setState({ currentlyPlaying: previewURL });
      }
    }
  }

  render() {
    let results;
    if (this.props.topType === "tracks") {
      results = this.props.data.map((track, index) => (
        <ResultItem
          type="track"
          position={index + 1}
          key={track.id}
          title={track.name}
          subtitle={track.artists[0].name}
          image={
            track.album.images[0] === undefined
              ? null
              : track.album.images[0].url
          }
          previewURL={track.preview_url}
          uri={track.external_urls.spotify}
          searchTerm={this.props.searchTerm}
          playTrack={this.playTrack}
          isPlaying={this.state.currentlyPlaying === track.preview_url}
        />
      ));
    } else {
      results = this.props.data.map((artist, index) => (
        <ResultItem
          type="artist"
          position={index + 1}
          key={artist.id}
          title={artist.name}
          uri={artist.external_urls.spotify}
          subtitle={artist.genres.join(", ")}
          image={artist.images[0] === undefined ? null : artist.images[0].url}
          searchTerm={this.props.searchTerm}
        />
      ));
    }
    return (
      <div id="result-table">
        {results ? (
          results
        ) : (
          <h3 className="no-results" style={{ alignSelf: "center" }}>
            No Results
          </h3>
        )}
      </div>
    );
  }
}

export default ResultTable;
