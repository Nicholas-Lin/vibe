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
            this.props.topTracks.map(track => 
                <ResultItem track={track}/>
            )
        );
    }
}

export default ResultTable