/**
 * File Name: MoodDashboard.js
 * Author: Nicholas Lin
 * Date: 7/11/20
 * Description: Displays contents for the "Your Mood" section
 */

import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PopularityDisplay from "./PopularityDisplay";
import DoughnutChart from "./DoughnutChart";
import ComparisonsDisplay from "./ComparisonsDisplay";
import Api from "../../Api";
import RecentShowcase from "./RecentShowcase";

class MoodDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      percentages: {},
      popularity: 0,
      trackImages: [],
      uniqueRecentTracks: [],
    };
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

  /**
   * Gets the genres for a an array of tracks
   * @param  {Array<Simple Track Objects>} tracks - The array of tracks to get the genres of
   * @return An array of objects with key and value properties key=genre, value=track count
   */
  async getGenres(tracks) {
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

      // Get the first genre category for each song
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
      const API = new Api(this.props.token);
      let requestFeatures = [
        "acousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "liveness",
        "speechiness",
        "valence",
        "popularity",
      ];
      const recentTracks = await API.getRecentTracks();
      const recentTracksFeatures = await API.getTrackFeatures(
        recentTracks,
        requestFeatures
      );

      const averageRecentFeatures = this.averageFeatures(recentTracksFeatures);
      let formattedRecentTracks = [];
      for (let i = 0; i < recentTracks.length; i++) {
        let formattedRecentTrack = {};
        const track = recentTracks[i].track;
        const {
          popularity,
          valence,
          danceability,
          energy,
          acousticness,
          liveness,
          speechiness,
          instrumentalness,
        } = recentTracksFeatures[i];

        formattedRecentTrack = {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          image: track.album.images[0].url,
          previewURL: track.preview_url,
          features: {
            popularity,
            valence,
            danceability,
            energy,
            acousticness,
            liveness,
            speechiness,
            instrumentalness,
          },
        };
        formattedRecentTracks.push(formattedRecentTrack);
      }

      const uniqueRecentTracks = Array.from(
        new Set(formattedRecentTracks.map((item) => item.id))
      ).map((id) => {
        return formattedRecentTracks.find((item) => item.id === id);
      });
      const genres = await this.getGenres(recentTracks);
      const searchResults = await API.searchForPlaylist(
        ["Today's top hits"],
        "Spotify"
      );
      const playlistID = searchResults[0].id;
      const playlist = await API.getPlaylist(playlistID);
      requestFeatures = [
        "acousticness",
        "danceability",
        "energy",
        "valence",
        "popularity",
      ];
      const playlistFeatures = await API.getTrackFeatures(
        playlist.tracks,
        requestFeatures
      );
      const averagePlaylistFeatures = this.averageFeatures(playlistFeatures);
      const differences = this.calculatePercentDifferences(
        averagePlaylistFeatures,
        averageRecentFeatures
      );
      const popularityScore = averageRecentFeatures.popularity;
      this.setState({
        uniqueRecentTracks,
        percentages: differences,
        popularity: popularityScore,
        genres,
        isLoading: false,
      });
      this.props.load();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401)
        this.props.handleTimeout();
    }
  }

  render() {
    return this.state.isLoading ? null : (
      <div>
        <Container fluid className=" d-flex flex-column mood-top-section">
          <header>Your Mood</header>
          <h2>How do your recent songs compare to today's top hits?</h2>
          <PopularityDisplay score={this.state.popularity} />
          <ComparisonsDisplay percentages={this.state.percentages} />
        </Container>
        <Container className={"mb-4 mt-2"}>
          <RecentShowcase tracks={this.state.uniqueRecentTracks} />
        </Container>




        <hr />
        <Container
          fluid
          className=" d-flex flex-column"
          style={{ minHeight: "90vh" }}
        >
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
