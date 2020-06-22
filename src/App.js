import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'


import Title from './Components/Title'
import SubmitButton from './Components/SubmitButton'
import SongDisplay from './Components/SongDisplay'


class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      isLoggedIn: token ? true : false
    };
  }

  handleLogin() {
    console.log("HELLO");
    const clientID = "03448805c58d4c5ba555ea203c8ce771";
    const responseType = "token";
    const redirectURI = "http://localhost:3000/";
    const scope = "user-read-private%20user-read-email"
    const state = "123";
    const authorizationURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=${responseType}&state=${state}`;
    window.location.replace(authorizationURL);
    this.setState({ isLoggedIn: true })
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

  render() {
    return (
      <div className="App">

        <Container>
          <Title />
          <SongDisplay isLoggedIn={this.state.isLoggedIn} />
          <SubmitButton isLoggedIn={this.state.isLoggedIn} handleLogin={() => this.handleLogin()} />
        </Container>
      </div>
    );
  }
}

export default App;
