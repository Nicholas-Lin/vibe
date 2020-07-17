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
      comparisonType: "TOP",
      comparisonTracksFeatures: [],
      recentTracksFeatures: [],
      popularity: 0,
      trackImages: [],
      uniqueRecentTracks: [],
    };
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

  async getComparisonFeatures(type) {
    const API = new Api(this.props.token);
    const requestFeatures = [
      "acousticness",
      "danceability",
      "energy",
      "valence",
      "popularity",
    ];
    if (type === "TOP") {
      const searchResults = await API.searchForPlaylist(
        ["Today's top hits"],
        "Spotify"
      );
      const playlistID = searchResults[0].id;
      const playlist = await API.getPlaylist(playlistID);
      const playlistFeatures = await API.getTrackFeatures(
        playlist.tracks,
        requestFeatures
      );
      return playlistFeatures;
    } else {
      const favorites = await API.getUserFavorites("tracks", type, 50);
      const favoritesFeatures = await API.getTrackFeatures(
        favorites,
        requestFeatures
      );
      return favoritesFeatures;
    }
  }

  async cycleComparisonTypes() {
    const comparisonTypes = ["TOP", "short_term", "medium_term", "long_term"];
    let i = 0;
    setInterval(async () => {
      const comparisonType = comparisonTypes[i % comparisonTypes.length];
      const comparisonTracksFeatures = await this.getComparisonFeatures(
        comparisonType
      );
      this.setState({
        comparisonTracksFeatures,
        comparisonType,
      });
      i++;
      console.log(comparisonTypes);
    }, 7000);
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

      let popularityScore = 0;
      recentTracksFeatures.forEach((feature) => {
        popularityScore += feature.popularity;
      });
      popularityScore /= recentTracksFeatures.length;

      const comparisonTracksFeatures = await this.getComparisonFeatures(
        this.state.comparisonType
      );
      this.setState({
        uniqueRecentTracks,
        recentTracksFeatures: recentTracksFeatures,
        comparisonTracksFeatures,
        popularity: popularityScore,
        genres,
        isLoading: false,
      });

      this.props.load();
      this.cycleComparisonTypes();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401)
        this.props.handleTimeout();
    }
  }

  render() {
    let comparisonDescriptor = "";
    switch (this.state.comparisonType) {
      case "TOP":
        comparisonDescriptor = "today's top hits";
        break;
      case "short_term":
        comparisonDescriptor = "your last month";
        break;
      case "medium_term":
        comparisonDescriptor = "your last 6 months";
        break;
      case "long_term":
        comparisonDescriptor = "your all-time favorites";
        break;
    }
    return this.state.isLoading ? null : (
      <div>
        <Container fluid className=" d-flex flex-column mood-top-section">
          <header>Your Mood</header>

          <PopularityDisplay score={this.state.popularity} />
          <h2>
            How do your recent songs compare to{" "}
            <span style={{ color: "#1DB954" }}>{comparisonDescriptor}</span>?
          </h2>
          <ComparisonsDisplay
            percentages={this.state.percentages}
            recentTracksFeatures={this.state.recentTracksFeatures}
            comparisonTracksFeatures={this.state.comparisonTracksFeatures}
          />
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
