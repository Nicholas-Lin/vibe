/**
 * File Name: App.js
 * Author: Nicholas Lin
 * Date: 7/11/20
 * Description: Main entrypoint of react app
 */

import React from "react";
import "./App.css";
import hash from "./hash";
import { loginURL } from "./config";
import Login from "./Views/Login";
import MainDisplay from "./Views/MainDisplay";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: null,
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
            handleTimeout={() => this.handleLogin()}
          />
        )}
      </div>
    );
  }
}

export default App;
