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
    let customParams = {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
      params: {
        time_range: this.state.timeRange,
        limit: 50,
      },
    };
    await axios
      .get("https://api.spotify.com/v1/me/top/artists", customParams)
      .then((res) => {
        this.setState({ topArtists: res.data.items });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTopTracks = async () => {
    await axios
      .get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
        params: {
          time_range: this.state.timeRange,
          limit: 50,
        },
      })
      .then((res) => {
        this.setState({ topTracks: res.data.items });
      })
      .catch((err) => {
        console.log(err);
      });
    await this.analyzeTopTracks();
  };

  analyzeTopTracks = async () => {
    let ids = [];
    this.state.topTracks.forEach((track) => {
      ids.push(track.id);
    });

    let customParams = {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
      params: {
        ids: ids.join(),
      },
    };
    await axios
      .get("https://api.spotify.com/v1/audio-features", customParams)
      .then((res) => {
        res.data.audio_features.forEach((track) => {
          const { id, acousticness, danceability, energy, valence } = track;
          this.setState({
            audioAnalysis: [
              ...this.state.audioAnalysis,
              {
                id: id,
                acousticness: acousticness,
                danceability: danceability,
                energy: energy,
                valence: valence,
              },
            ],
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
