import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';


import SubmitButton from './Components/SubmitButton'
import ResultTable from './Components/ResultTable'
import SearchBar from './Components/SearchBar'



class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      isLoggedIn: token ? true : false,
      topTracks: [],
      audioAnalysis: [],
      timeRange: "short_term",
      token: token,
      searchTerm: ""
    };
  }

  handleLogin() {
    const clientID = "03448805c58d4c5ba555ea203c8ce771";
    const responseType = "token";
    const redirectURI = "http://localhost:3000/results";
    const scope = "user-top-read"
    const state = "123";
    const authorizationURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=${responseType}&state=${state}`;
    window.location.replace(authorizationURL);
    this.setState({
      isLoggedIn: true
    })
  }

  handleChange = async (event) => {
    const { name, value, type, checked } = event.target
    await type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    if (name === "timeRange") {
      this.getTopTracks();
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getTopTracks = async () => {
    let customParams = {
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      },
      params: {
        'time_range': this.state.timeRange,
        'limit': 50
      }
    }
    await axios
      .get('https://api.spotify.com/v1/me/top/tracks',
        customParams
      )
      .then(res => {
        console.log(res.data.items);
        this.setState({ topTracks: res.data.items });
      })
      .catch((err) => {
        console.log(err)
      })
    await this.analyzeTopTracks();
  };

  analyzeTopTracks = async () => {
    let ids = [];
    this.state.topTracks.forEach((track) => {
      ids.push(track.id);
    })

    let customParams = {
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      },
      params: {
        'ids': ids.join()
      }
    }
    await axios
      .get('https://api.spotify.com/v1/audio-features',
        customParams
      )
      .then(res => {
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
                valence: valence
              }
            ]
          })
        })

        console.log(this.state.audioAnalysis);
      })
      .catch((err) => {
        console.log(err)
      })
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Container>
            <header> Replay </header>

            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <SubmitButton isLoggedIn={this.state.isLoggedIn} handleLogin={() => this.handleLogin()} />
                )}
              />

              <Route
                path="/results"
                render={props => (
                  <React.Fragment>
                    <SearchBar
                      getTopTracks={this.getTopTracks}
                      token={this.token}
                      handleChange={this.handleChange}
                    />
                    <ResultTable
                      topTracks={this.state.topTracks}
                      searchTerm={this.state.searchTerm}
                    />
                  </React.Fragment>
                )}
              />

            </Switch>



          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
