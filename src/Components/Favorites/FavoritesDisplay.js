import React from "react";
import ResultTable from "./ResultTable";
import SearchBar from "./SearchBar";
import Api from "../../Api";

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
        <header>Your Favorites</header>
        <SearchBar
          handleChange={this.handleChange}
          timeRange={this.state.timeRange}
          topType={this.state.topType}
        />
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
