import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PercentDisplay from "./PercentDisplay";

class MoodDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      percentages: {},
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
    console.log(res);
    return res.data.items;
  }

  /**
   * Gets the features of an array of tracks
   * @param  {Array<SimpleTrackObject>} tracks - An array of Spotify tracks to analyze
   * @return {Array<Objects>} - An array of objects that contain trackID, acousticness, danceability, energy, and valence properties
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
    res.data.audio_features.forEach((track) => {
      const { id, acousticness, danceability, energy, valence } = track;
      results.push({
        id: id,
        acousticness: acousticness,
        danceability: danceability,
        energy: energy,
        valence: valence,
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
        if (key != "id") {
          if (!averages[key]) {
            averages[key] = track[key];
          } else {
            averages[key] += track[key];
          }
        }
      }
    });
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
    console.log(result);
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
  async componentDidMount() {
    const recentTracks = await this.getRecentTracks();
    const recentTracksFeatures = await this.getTrackFeatures(recentTracks);
    const averageRecentFeatures = this.averageFeatures(recentTracksFeatures);

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
    this.setState({ isLoading: false, percentages: differences });
  }

  render() {
    return this.state.isLoading ? null : (
      <Container>
        <h3>How do your recent songs compare to today's top hits?</h3>
        <Row>
          <Col md={3}>
            <PercentDisplay
              percent={this.state.percentages.valence}
              descriptions={["Less happy", "Same hapiness", "Happier"]}
              emojis={["😭", "😢", "😕", "😃", "😁", "😊"]}
            />
          </Col>
          <Col md={3}>
            <PercentDisplay
              percent={this.state.percentages.danceability}
              descriptions={[
                "Less danceable",
                "Same danceability",
                "More danceable",
              ]}
              emojis={["💃"]}
            />
          </Col>
          <Col md={3}>
            <PercentDisplay
              percent={this.state.percentages.energy}
              descriptions={["Less energetic", "Same energy", "More energetic"]}
              emojis={["😴", "⚡️", "🔥"]}
            />
          </Col>
          <Col md={3}>
            <PercentDisplay
              percent={this.state.percentages.acousticness}
              descriptions={[
                "Less acoustic",
                "Same acousticness",
                "More acoustic",
              ]}
              emojis={["🎸", "🎻"]}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MoodDashboard;
