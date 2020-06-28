import React from "react";
import ResultItem from "./ResultItem"

class ResultTable extends React.Component {
    constructor(props) {
        super(props)
    }

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
                    this.props.topTracks.map((track, index) =>
                        <ResultItem position={index + 1} key={track.id} track={track} searchTerm={this.props.searchTerm} playTrack={this.playTrack} />
                    )
                }
            </div>

        );
    }
}

export default ResultTable