import React from "react";
import Button from 'react-bootstrap/Button';

class SearchBar extends React.Component {
    render() {
        if(this.props.isLoggedIn){
            return null;
        }
        return (
            <div>
                <input type='text' placeholder="Search"></input>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary">All Time</button>
                    <button type="button" class="btn btn-secondary">Last 6 Months</button>
                    <button type="button" class="btn btn-secondary">Last Month</button>
                </div>
            </div>
        );
    }
}

export default SearchBar