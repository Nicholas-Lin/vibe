import React from "react";
import ResultItem from "./ResultItem";

class ResultTable extends React.Component {
  playTrack(previewURL) {
    let activeTrack = document.querySelector("audio");
    if (!activeTrack) {
      activeTrack = new Audio(previewURL);
      activeTrack.volume = 0.25;
      document.getElementById("result-table").append(activeTrack);
      activeTrack.play();
    } else {
      activeTrack.paused ? activeTrack.play() : activeTrack.pause();
      if (activeTrack.src !== previewURL) {
        activeTrack.currentTime = 0;
        activeTrack.src = previewURL;
        activeTrack.play();
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
          image={track.album.images[0].url}
          previewURL={track.preview_url}
          searchTerm={this.props.searchTerm}
          playTrack={this.playTrack}
        />
      ));
    } else {
      results = this.props.data.map((artist, index) => (
        <ResultItem
          type="artist"
          position={index + 1}
          key={artist.id}
          title={artist.name}
          subtitle={artist.genres.join(", ")}
          image={artist.images[0].url}
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
