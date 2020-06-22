import React from "react";
import Button from 'react-bootstrap/Button';
import SongInfoItem from './SongInfoItem';

class SongDisplay extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.isLoggedIn) {
            return null;
        }

        return (
            <div className="song-display row d-flex">
                <div className="col-md-6">
                    <SongInfoItem className="title" />
                    <SongInfoItem className="album" />
                    <SongInfoItem className="artist" />
                    <Button>Like</Button>
                </div>
                <div className="col-md-6">
                    <img src="https://via.placeholder.com/350" />
                </div>
            </div>
        );
    }
}

export default SongDisplay