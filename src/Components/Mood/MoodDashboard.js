import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PopularityDisplay from "./PopularityDisplay";
import { ImageCarousel } from "./ImageCarousel";
import DoughnutChart from "./DoughnutChart";
import FeaturesDisplay from "./FeaturesDisplay";

class MoodDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      percentages: {},
      popularity: 0,
      trackImages: [],
    };
  }

  /**
   * Gets an array of 50 tracks that the user recently played
   * @return {Array<SimpleTrack>} - An array of simple track objects from Spotify
   */
  async getRecentTracks() {
    const endpoint = "https://api.spotify.com/v1/me/player/recently-played";

    let res = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
      params: {
        limit: 50,
      },
    });
    return res.data.items;

  }

  /**
   * Gets the features of an array of tracks
   * @param  {Array<SimpleTrackObject>} tracks - An array of Spotify tracks to analyze
   * @return {Array<Objects>} - An array of objects that contain trackID, acousticness, danceability, energy, valence, and popularity properties
   */
  async getTrackFeatures(tracks) {
    let ids = [];
    tracks.forEach((item) => {
      ids.push(item.track.id);
    });
    const endpoint = "https://api.spotify.com/v1/audio-features";
    let res = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
      params: {
        ids: ids.join(),
      },
    });
    let results = [];
    res.data.audio_features.forEach((trackFeatures) => {
      const { id, acousticness, danceability, energy, valence } = trackFeatures;
      const correspondingTrack = tracks.find((item) => item.track.id === id);
      results.push({
        id: id,
        acousticness: acousticness,
        danceability: danceability,
        energy: energy,
        valence: valence,
        popularity: correspondingTrack.track.popularity,
      });
    });

    return results;
  }

  /**
   * Computes the averages of an array of features of tracks
   * @param  {Array<Features>} tracks - An array of track features
   * @return {Array<Objects>} - An array of objects that contain trackID, acousticness, danceability, energy, and valence properties
   */
  averageFeatures(tracks) {
    let averages = {};
    tracks.forEach((track) => {
      for (let key in track) {
        if (key !== "id") {
          if (!averages[key]) {
            averages[key] = track[key];
          } else {
            averages[key] += track[key];
          }
        }
      }
    });
    for (let key in averages) {
      averages[key] = averages[key] / tracks.length;
    }
    return averages;
  }

  /**
   * Searches spotify for a playlist given search terms and the owner
   * @param  {Array<string>} searchTerms - An array of search terms
   * @param {string} owner - The owner of the playlist
   * @return playlist object with id and name fields
   */
  async searchForPlaylist(searchTerms, owner) {
    const endpoint = "https://api.spotify.com/v1/search";
    let res = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
      params: {
        q: searchTerms.join("%20"),
        type: "playlist",
        limit: "10",
      },
    });
    const result = res.data.playlists.items.filter((item) => {
      let isTermInName = true;
      // Checks if search terms are in the name of the playlist
      searchTerms.forEach((term) => {
        isTermInName =
          isTermInName && item.name.toLowerCase().includes(term.toLowerCase());
      });
      // If the search terms in name and owner matches playlist owner name return item
      return (
        isTermInName &&
        item.owner.display_name.toLowerCase().includes(owner.toLowerCase())
      );
    });
    return result;
  }

  /**
   * Gets details of a playlist given the id
   * @param  {string} id - The id of the playlist
   * @return an object containing the name and tracks of the playlist
   */
  async getPlaylist(id) {
    const endpoint = "https://api.spotify.com/v1/playlists/";
    let res = await axios.get(`${endpoint}${id}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
      params: {
        fields: "name,tracks.items(track)",
      },
    });
    return {
      name: res.data.name,
      tracks: res.data.tracks.items,
    };
  }

  /**
   * Returns the percent difference between the properties the newObject compared to the properties of the originalObject.
   * @param  {Object} originalObject- The original object that will be compared against
   * @param  {Object} newObject- The new object that will be compared to the original object
   * @return An object containing the same properties with the percent difference as values
   */
  calculatePercentDifferences(originalObject, newObject) {
    let differences = {};
    for (const key in originalObject) {
      const percentDifference = Math.round(
        ((newObject[key] - originalObject[key]) / originalObject[key]) * 100
      );
      differences[key] = percentDifference;
    }
    return differences;
  }

  async getGeneres(tracks) {
    let ids = [];
    tracks.forEach((item) => {
      ids.push(item.track.artists[0].id);
    });
    const endpoint = "https://api.spotify.com/v1/artists";
    let res = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
      params: {
        ids: ids.join(),
      },
    });
    let map = new Map();
    res.data.artists.forEach((artist) => {
      // artist.genres.forEach((genre) => {
      //   if (map.get(genre)) {
      //     map.set(genre, map.get(genre) + 1);
      //   } else {
      //     map.set(genre, 1);
      //   }
      // });
      const genre = artist.genres[0];
      if (genre && map.get(genre)) {
        map.set(genre, map.get(genre) + 1);
      } else {
        map.set(genre, 1);
      }
    });

    let results = [];
    map.forEach((val, key) => {
      results.push({
        key: key,
        value: val,
      });
    });
    // Sort in decreasing value order
    results.sort((a, b) => b.value - a.value);
    return results;
  }

  async componentDidMount() {
    try {
      const recentTracks = await this.getRecentTracks();
      const recentTracksFeatures = await this.getTrackFeatures(recentTracks);
      const averageRecentFeatures = this.averageFeatures(recentTracksFeatures);

      const uniqueTracks = Array.from(
        new Set(recentTracks.map((item) => item.track.id))
      ).map((id) => {
        return recentTracks.find((item) => item.track.id === id);
      });
      const trackImages = uniqueTracks.map((item) => {
        return {
          id: item.track.id,
          url: item.track.album.images[0].url,
        };
      });

      const genres = await this.getGeneres(recentTracks);

      const searchResults = await this.searchForPlaylist(
        ["Today's top hits"],
        "Spotify"
      );
      const playlistID = searchResults[0].id;
      const playlist = await this.getPlaylist(playlistID);
      const playlistFeatures = await this.getTrackFeatures(playlist.tracks);
      const averagePlaylistFeatures = this.averageFeatures(playlistFeatures);
      const differences = this.calculatePercentDifferences(
        averagePlaylistFeatures,
        averageRecentFeatures
      );
      const popularityScore = averageRecentFeatures.popularity;
      this.setState({
        percentages: differences,
        popularity: popularityScore,
        trackImages: trackImages,
        genres: genres,
        isLoading: false,
      });
      this.props.load();
    } catch (error) {
      console.log(error)
      this.props.handleTimeout();
    }
  }

  render() {
    return this.state.isLoading ? null : (
      <div>
        <Container fluid className=" d-flex flex-column" style={{ minHeight: "100vh" }}>
          <header>Your Mood</header>
          <h3>How do your recent songs compare to today's top hits?</h3>
          <Row className="d-flex justify-content-center">
            <Col
              md={{ span: 6, order: 2 }}
              className="d-flex flex-column justify-content-center h-100"
            >
              <ImageCarousel images={this.state.trackImages} />
            </Col>
            <Col md={{ span: 6, order: 1 }}>
              <PopularityDisplay score={this.state.popularity} />
            </Col>
          </Row>
          <FeaturesDisplay percentages={this.state.percentages} />
        </Container>
        <Container fluid className=" d-flex flex-column" style={{ minHeight: "100vh" }}>
          <Row>
            <Col className="justify-content-center">
              <h2>{"Your Recent Genres"}</h2>
              <DoughnutChart data={this.state.genres} />
            </Col>
          </Row>
        </Container>

        <hr />
      </div>
    );
  }
}

export default MoodDashboard;
