import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "../index.css";

class SearchBar extends React.Component {
  componentDidMount() {
    this.props.initializeData();
  }
  render() {
    if (this.props.isLoggedIn) {
      return null;
    }
    return (
      <div>
        <Row className="d-flex justify-content-between p-4">
          <input
            className="search-field"
            name="searchTerm"
            value={this.props.searchTerm}
            type="text"
            placeholder="Search"
            onChange={(e) => this.props.handleChange(e)}
          ></input>
          <ButtonGroup>
            <Button
              variant="outline-light"
              className={this.props.timeRange === "short_term" && "active"}
              type="radio"
              name="timeRange"
              value="short_term"
              onClick={(e) => this.props.handleChange(e)}
              checked={this.props.time_range === "short_term"}
              defaultChecked
            >
              Last Month
            </Button>
            <Button
              variant="outline-light"
              className={this.props.timeRange === "medium_term" && "active"}
              type="radio"
              name="timeRange"
              value="medium_term"
              onClick={(e) => this.props.handleChange(e)}
              checked={this.props.timeRange === "medium_term"}
            >
              Last 6 Months
            </Button>
            <Button
              variant="outline-light"
              className={this.props.timeRange === "long_term" && "active"}
              type="radio"
              name="timeRange"
              value="long_term"
              onClick={(e) => this.props.handleChange(e)}
              checked={this.props.timeRange === "long_term"}
            >
              All Time
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              variant="outline-light"
              className={this.props.topType === "tracks" && "active"}
              type="radio"
              name="topType"
              value="tracks"
              onClick={(e) => this.props.handleChange(e)}
              checked={this.props.topType === "tracks"}
              defaultChecked
            >
              Tracks
            </Button>
            <Button
              variant="outline-light"
              className={this.props.topType === "artists" && "active"}
              type="radio"
              name="topType"
              value="artists"
              onClick={(e) => this.props.handleChange(e)}
              checked={this.props.topType === "artists"}
              defaultChecked
            >
              Artists
            </Button>
          </ButtonGroup>
        </Row>
      </div>
    );
  }
}

export default SearchBar;
