import React from "react";

class ResultItem extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {

        const { position, track, searchTerm } = this.props;
        const albumImgURL = track.album.images[0];
        const previewURL = track.preview_url;

        // Track name does not contain the search term
        const termNotInName = track.name.toLowerCase().indexOf(searchTerm) === -1
        // Artist name does not contain the search term
        const termNotInArtist = track.artists[0].name.toLowerCase().indexOf(searchTerm) === -1

        // If search term not in track then do not render
        if (termNotInArtist && termNotInName) {
            return null;
        }
        return (
            <div onClick={() => this.props.playTrack()}>
                <h3>{position}. {track.name}</h3>
                <p>{track.artists[0].name}</p>
            </div>
        );
    }
}

export default ResultItem