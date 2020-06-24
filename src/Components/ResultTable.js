import React from "react";
import ResultItem from "./ResultItem"
import Button from 'react-bootstrap/Button';
import SongInfoItem from './ResultItem';

class ResultTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            this.props.topTracks.map((track, index) =>
                <ResultItem position={index + 1} key={track.id} track={track} searchTerm={this.props.searchTerm} />
            )
        );
    }
}

export default ResultTable