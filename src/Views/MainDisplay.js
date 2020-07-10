import React from "react";
import Container from "react-bootstrap/Container";
import ResultTable from "../Components/ResultTable";
import SearchBar from "../Components/SearchBar";
import VibeDashboard from "../Components/VibeDashboard";
import MoodDashboard from "../Components/MoodDashboard";
import Loading from "../Components/Loading";
class MainDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      moodDashboardIsLoading: true,
      vibeDashboardIsLoading: true,
    };
  }

  loadMoodDashboard() {
    this.setState({
      moodDashboardIsLoading: false,
      isLoading: this.state.vibeDashboardIsLoading || false,
    });
  }

  loadVibeDashboard() {
    this.setState({
      vibeDashboardIsLoading: false,
      isLoading: this.state.moodDashboardIsLoading || false,
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading && <Loading />}
        <Container fluid="lg">
          <MoodDashboard
            token={this.props.token}
            load={() => this.loadMoodDashboard()}
          />

          <VibeDashboard
            token={this.props.token}
            load={() => this.loadVibeDashboard()}
          />
          <header>Your Favorites</header>
          <SearchBar
            handleChange={this.props.handleChange}
            timeRange={this.props.timeRange}
            topType={this.props.topType}
            initializeData={this.props.initializeData}
          />
          <ResultTable
            topType={this.props.topType}
            topTracks={this.props.topTracks}
            topArtists={this.props.topArtists}
            searchTerm={this.props.searchTerm}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default MainDisplay;
