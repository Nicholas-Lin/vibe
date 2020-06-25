import React from "react";
import Button from 'react-bootstrap/Button';


class SearchBar extends React.Component {
    componentDidMount() {
        this.props.getTopTracks();
    }


    render() {
        if (this.props.isLoggedIn) {
            return null;
        }
        return (
            <div>
                <input name="searchTerm" value={this.props.searchTerm} type='text' placeholder="Search" onChange={(e) => this.props.handleChange(e)}></input>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button name="timeRange" value="long_term" type="button" className="btn btn-secondary" onClick={(e) => this.props.handleChange(e)}>All Time</button>
                    <button name="timeRange" value="medium_term" type="button" className="btn btn-secondary" onClick={(e) => this.props.handleChange(e)}>Last 6 Months</button>
                    <button name="timeRange" value="short_term" type="button" className="btn btn-secondary" onClick={(e) => this.props.handleChange(e)}>Last Month</button>
                </div>
            </div>
        );
    }
}

export default SearchBar