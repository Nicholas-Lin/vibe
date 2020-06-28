import React from "react";
import Button from 'react-bootstrap/Button';


class SearchBar extends React.Component {
    render() {
        if (this.props.isLoggedIn) {
            return null;
        }
        return (
            <div>
                <input name="searchTerm" value={this.props.searchTerm} type='text' placeholder="Search" onChange={(e) => this.props.handleChange(e)}></input>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <Button name="timeRange" value="long_term" className="btn btn-secondary" onClick={(e) => this.props.handleChange(e)}>All Time</Button>
                    <Button name="timeRange" value="medium_term" className="btn btn-secondary" onClick={(e) => this.props.handleChange(e)}>Last 6 Months</Button>
                    <Button name="timeRange" value="short_term" className="btn btn-secondary" onClick={(e) => this.props.handleChange(e)}>Last Month</Button>
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <Button name="topType" value="tracks" className="btn btn-secondary" onClick={(e) => this.props.handleChange(e)}>Tracks</Button>
                    <Button name="topType" value="artists" className="btn btn-secondary" onClick={(e) => this.props.handleChange(e)}>Artists</Button>
                </div>
            </div>
        );
    }
}

export default SearchBar