import React from "react";
import ResultTable from "./ResultTable";
import SearchBar from "./SearchBar";
import axios from "axios";

class FavoritesDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      topTracks: [],
      topArtists: [],
      audioAnalysis: [],
      timeRange: "short_term",
      searchTerm: "",
      topType: "tracks",
    };
  }

  handleChange = async (event) => {
    const { name, value, type, checked } = event.target;
    (await type) === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
    if (name === "timeRange") {
      this.refreshData();
    }
  };

  getTopArtists = async () => {
    const endpoint = "https://api.spotify.com/v1/me/top/artists"
    const response = await axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
        params: {
          time_range: this.state.timeRange,
          limit: 50,
        },
      })
    this.setState({ topArtists: response.data.items });
  };

  getTopTracks = async () => {
    try {
      const response = await axios
        .get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
          },
          params: {
            time_range: this.state.timeRange,
            limit: 50,
          },
        })
      this.setState({ topTracks: response.data.items });
    } catch (error) {
      console.log("getTopTracksError: ", error)
    }
  };

  refreshData = () => {
    this.getTopArtists();
    this.getTopTracks();
  };

  async componentDidMount() {
    await this.getTopArtists();
    await this.getTopTracks();
    this.setState({ isLoading: false });
    this.props.load();
  }

  render() {
    return this.state.isLoading ? null : (
      <div>
        <header>Your Favorites</header>
        <SearchBar
          handleChange={this.handleChange}
          timeRange={this.state.timeRange}
          topType={this.state.topType}
        />
        <ResultTable
          topType={this.state.topType}
          topTracks={this.state.topTracks}
          topArtists={this.state.topArtists}
          searchTerm={this.state.searchTerm}
        />
      </div>
    );
  }
}

export default FavoritesDisplay;
