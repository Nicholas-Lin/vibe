import React from "react";
import ResultTable from "./ResultTable";
import SearchBar from "./SearchBar";
import Api from "../../Api";
import Fade from "react-reveal/Fade";

class FavoritesDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      timeRange: "short_term",
      searchTerm: "",
      topType: "tracks",
    };
  }

  handleChange = async (event) => {
    const { name, value, type, checked } = event.target;
    if (name === "topType") {
      this.setState({ data: [] });
    }
    (await type) === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });

    const API = new Api(this.props.token);
    const response = await API.getUserFavorites(
      this.state.topType,
      this.state.timeRange,
      50
    );
    this.setState({ data: response, isLoading: false });
  };

  handleCreatePlaylist = async () => {
    const API = new Api(this.props.token);
    const userID = await API.getUserID();

    let descriptor;
    switch (this.state.timeRange) {
      case "short_term":
        descriptor = "Last Month";
        break;
      case "medium_term":
        descriptor = "Last 6 Months";
        break;
      case "long_term":
        descriptor = "All Time";
        break;
      default:
        break;
    }
    const date = new Date();
    let playlistName = "My Top 50 Songs • " + descriptor;
    const playlistDescription =
      "Created on " + date.toDateString() + ", courtesy of Spotivibe ❤️";
    const playlistID = await API.createPlaylist(
      userID,
      playlistName,
      playlistDescription,
      false
    );
    const uris = this.state.data.map((track) => {
      return track.uri;
    });
    await API.addItemsToPlaylist(playlistID, uris);
    const playlistURI = `spotify:user:${userID}:playlist:${playlistID}`;
    window.open(playlistURI, "_blank", "");
  };

  async componentDidMount() {
    const API = new Api(this.props.token);
    const response = await API.getUserFavorites(
      this.state.topType,
      this.state.timeRange,
      50
    );
    this.setState({ data: response, isLoading: false });
    this.props.load();
  }

  render() {
    return this.state.isLoading ? null : (
      <div>
        <Fade>
          <header>Your Favorites</header>
          <SearchBar
            handleChange={this.handleChange}
            handleCreatePlaylist={this.handleCreatePlaylist}
            timeRange={this.state.timeRange}
            topType={this.state.topType}
          />
        </Fade>
        <ResultTable
          topType={this.state.topType}
          data={this.state.data}
          searchTerm={this.state.searchTerm}
        />
      </div>
    );
  }
}

export default FavoritesDisplay;
