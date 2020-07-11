import React from "react";
import Container from "react-bootstrap/Container";
import VibeDashboard from "../Components/Vibe/VibeDashboard";
import MoodDashboard from "../Components/Mood/MoodDashboard";
import Loading from "../Components/Loading";
import FavoritesDisplay from "../Components/Favorites/FavoritesDisplay";
class MainDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      moodDashboardIsLoading: true,
      vibeDashboardIsLoading: true,
      favoritesDisplayIsLoading: true,
    };
  }

  updateLoadingStatus() {
    if (

      !this.state.moodDashboardIsLoading &&
      !this.state.vibeDashboardIsLoading &&
      !this.state.favoritesDisplayIsLoading

    ) {
      this.setState({
        isLoading: false,
      });
    }
  }
  loadMoodDashboard() {
    this.setState({
      moodDashboardIsLoading: false,
    });
    this.updateLoadingStatus();
  }

  loadVibeDashboard() {
    this.setState({
      vibeDashboardIsLoading: false,
    });
    this.updateLoadingStatus();
  }

  loadFavorites() {
    this.setState({
      favoritesDisplayIsLoading: false,
    });
    this.updateLoadingStatus();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading && <Loading />}
        <Container fluid="lg">
          <MoodDashboard
            token={this.props.token}
            load={() => this.loadMoodDashboard()}
            handleTimeout={() => this.props.handleTimeout()}
          />

          <VibeDashboard
            token={this.props.token}
            load={() => this.loadVibeDashboard()}
          />
          <FavoritesDisplay
            token={this.props.token}
            load={() => this.loadFavorites()}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default MainDisplay;
