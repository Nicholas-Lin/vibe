import React from "react";
import Button from 'react-bootstrap/Button';
import SongInfoItem from './SongInfoItem';

class SongDisplay extends React.Component {
    render() {
        return (
            <div className="row d-flex">
                <div className="col-md-6 align-items-start">
                    <SongInfoItem className="title" />
                    <SongInfoItem className="album" />
                    <SongInfoItem className="artist" />
                    <Button>Like</Button>
                </div>
                <div className="col-md-6">
                    <ul>
                        <img src="https://via.placeholder.com/350" />
                    </ul>
                </div>
            </div>
        );
    }
}

export default SongDisplay