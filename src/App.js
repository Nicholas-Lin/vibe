import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';


import SubmitButton from './Components/SubmitButton'
import ResultTable from './Components/ResultTable'
import SearchBar from './Components/SearchBar'
import Dashboard from './Components/Dashboard'



class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      isLoggedIn: token ? true : false,
      topTracks: [],
      topArtists: [],
      data: [],
      audioAnalysis: [],
      timeRange: "short_term",
      token: token,
      searchTerm: "",
      topType: "tracks"
    };
  }

  handleLogin() {
    const clientID = "03448805c58d4c5ba555ea203c8ce771";
    const responseType = "token";
    const redirectURI = "http://localhost:3000/results";
    const scope = "playlist-read-private%20user-top-read"
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
      this.getData();
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

  getTopPlaylists = () => {
    axios
      .get('	https://api.spotify.com/v1/search',
        {
          headers: {
            'Authorization': `Bearer ${this.state.token}`
          },
          params: {
            'q': "Your%20Top%20Songs",
            'type': 'playlist',
            'limit': '10'
          }
        }
      )
      .then(res => {
        res.data.playlists.items.forEach((item) => {
          // If search result is a top track playlist
          if (item.name.length === 19 && Date.parse(item.name) && item.owner.display_name === "Spotify") {
            axios
              .get(`https://api.spotify.com/v1/playlists/${item.id}`,
                {
                  headers: {
                    'Authorization': `Bearer ${this.state.token}`
                  },
                  params: {
                  }
                }
              )
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  };


  getTopArtists = async () => {
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
      .get('https://api.spotify.com/v1/me/top/artists',
        customParams
      )
      .then(res => {
        this.setState({ topArtists: res.data.items });
      })
      .catch((err) => {
        console.log(err)
      })
  };

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
      })
      .catch((err) => {
        console.log(err)
      })
  };

  getData = () => {
    this.getTopPlaylists();
    this.getTopArtists();
    this.getTopTracks();
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
                    <Dashboard
                      getData={this.getData}
                      handleChange={this.handleChange}
                    />
                    <SearchBar
                      handleChange={this.handleChange}
                    />
                    <ResultTable
                      topType={this.state.topType}
                      topTracks={this.state.topTracks}
                      topArtists={this.state.topArtists}
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
