import React from "react";
import ResultItem from "./ResultItem"
import Button from 'react-bootstrap/Button';
import SongInfoItem from './ResultItem';

class ResultTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTrackURL: "",
        }
    }

    // playTrack(previewURL) {
    //     if (this.state.currentTrackURL === "") {
    //         this.setState({
    //             currentTrackObj: new Audio(previewURL)
    //         });
    //         console.log(this.state.currentTrackObj);
    //         this.state.currentTrackObj.play()
    //     } else if (this.state.currentTrack === previewURL) {
    //         if (!this.state.currentTrackObj.paused())
    //             this.state.currentTrackObj.pause();
    //         else
    //             this.state.currentTrackObj.play();
    //     } else {
    //         this.state.currentTrackObj.stop();
    //         let audio = new Audio(previewURL);
    //         this.setState({ currentTrackObj: audio });
    //         this.state.currentTrackObj.play()
    //     }
    // }

    render() {
        return (
            this.props.topTracks.map((track, index) =>
                <ResultItem position={index + 1} key={track.id} track={track} searchTerm={this.props.searchTerm} playTrack={() => this.playTrack()} />
            )
        );
    }
}

export default ResultTable