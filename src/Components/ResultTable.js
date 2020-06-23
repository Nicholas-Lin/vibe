import React from "react";
import Button from 'react-bootstrap/Button';
import SongInfoItem from './ResultItem';

class ResultTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.isLoggedIn) {
            return null;
        }

        return (
            <div>

            </div>
        );
    }
}

export default ResultTable