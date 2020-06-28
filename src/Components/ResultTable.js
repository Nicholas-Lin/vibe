import React from "react";
import TrackItem from "./TrackItem"
import ArtistItem from "./ArtistItem"

class ResultTable extends React.Component {
    playTrack(previewURL) {
        let activeTrack = document.querySelector("audio");
        if (!activeTrack) {
            activeTrack = new Audio(previewURL);
            activeTrack.volume = 0.25;
            document.getElementById("result-table").append(activeTrack)
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
        return (
            <div id="result-table">
                {
                    this.props.topType === "tracks" ? 
                    (
                        this.props.topTracks.map((track, index) =>
                        <TrackItem position={index + 1} key={track.id} track={track} searchTerm={this.props.searchTerm} playTrack={this.playTrack} />
                    )
                    )
                    :
                    (
                        this.props.topArtists.map((artist, index) =>
                        <ArtistItem position={index + 1} key={artist.id} artist={artist} searchTerm={this.props.searchTerm}/>
                    )
                    )
                }
            </div>

        );
    }
}

export default ResultTable