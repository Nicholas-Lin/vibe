/**
 * File Name: MainDisplay.js
 * Author: Nicholas Lin
 * Date: 7/11/20
 * Description: Main display after login
 */

import React from "react";
import Container from "react-bootstrap/Container";
import VibeDashboard from "../Components/Vibe/VibeDashboard";
import MoodDashboard from "../Components/Mood/MoodDashboard";
import Loading from "../Components/Loading";
import FavoritesDisplay from "../Components/Favorites/FavoritesDisplay";
import Footer from "../Components/Footer";

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

  /**
   * Updates the loading status of the component based on loading status of child components
   */
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

  /**
   * Updates the loading status of the mood dashboard in the state
   */
  loadMoodDashboard() {
    this.setState({
      moodDashboardIsLoading: false,
    });
    this.updateLoadingStatus();
  }

  /**
   * Updates the loading status of the vibe dashboard in the state
   */
  loadVibeDashboard() {
    this.setState({
      vibeDashboardIsLoading: false,
    });
    this.updateLoadingStatus();
  }

  /**
   * Updates the loading status of the favorites display in the state
   */
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
          <Footer />
        </Container>
      </React.Fragment>
    );
  }
}

export default MainDisplay;
