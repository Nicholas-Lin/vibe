import React from "react";
import "./App.css";
import hash from "./hash";
import { loginURL } from "./config";
import axios from "axios";

import Login from "./Views/Login";
import MainDisplay from "./Views/MainDisplay";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      token: null,
      topTracks: [],
      topArtists: [],
      audioAnalysis: [],
      timeRange: "short_term",
      searchTerm: "",
      topType: "tracks",
    };
  }

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
    }
  }

  handleLogin() {
    console.log(loginURL);
    window.location.replace(loginURL);
    this.setState({
      isLoggedIn: true,
    });
  }

  render() {
    return (
      <div className="App">
        {!this.state.token && (
          <Login
            isLoggedIn={this.state.isLoggedIn}
            handleLogin={() => this.handleLogin()}
          />
        )}
        {this.state.token && (
          <MainDisplay
            token={this.state.token}
            topType={this.state.topType}
            topTracks={this.state.topTracks}
            topArtists={this.state.topArtists}
            timeRange={this.state.timeRange}
            searchTerm={this.state.searchTerm}
            handleChange={this.handleChange}
            initializeData={this.initializeData}
          />
        )}
      </div>
    );
  }
}

export default App;
