import React from "react";
import LineChart from "./LineChart";
import axios from "axios";
import SoundWave from "./SoundWave";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MoodDashboard from "./MoodDashboard";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      data: [],
      features: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getTopPlaylists();
  }

  getTopPlaylists = async () => {
    let res = await axios.get("	https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
      params: {
        q: "Your%20Top%20Songs",
        type: "playlist",
        limit: "10",
      },
    });

    let playlistRequests = [];
    await Promise.all(
      res.data.playlists.items.map(async (item) => {
        // If search result is a top track playlist
        if (item.name.length === 19 && item.owner.display_name === "Spotify") {
          let response = await axios.get(
            `https://api.spotify.com/v1/playlists/${item.id}`,
            {
              headers: {
                Authorization: `Bearer ${this.state.token}`,
              },
              params: {
                fields: "name,tracks.items(track)",
              },
            }
          );
          const year = response.data.name.split(" ").pop();
          const playlist = {
            year: year,
            tracks: response.data.tracks.items,
          };
          this.setState({
            data: [...this.state.data, playlist],
          });
          const playlistFeatures = await this.getTrackFeatures(playlist.tracks);
          this.computeFeatures(year, playlistFeatures);
        }
      })
    );
    let recentPlaylist = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
        params: {
          time_range: "medium_term",
          limit: 50,
        },
      }
    );
    const playlistFeatures = await this.getTrackFeatures(
      recentPlaylist.data.items
    );
    this.computeFeatures("2020", playlistFeatures);
    this.createGraphData();
    console.log(this.state.features);
    console.log(this.state.data);
  };
  async getTrackFeatures(tracks) {
    let ids = [];
    tracks.forEach((item) => {
      if (item.track) ids.push(item.track.id);
      else ids.push(item.id);
    });
    let res = await axios.get("https://api.spotify.com/v1/audio-features", {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
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

  computeFeatures(year, playlistFeatures) {
    let averageFeatures = {
      acousticness: 0,
      danceability: 0,
      energy: 0,
      valence: 0,
    };
    playlistFeatures.forEach((track) => {
      for (let key in track) {
        if (key != "id") {
          averageFeatures[key] += track[key];
        }
      }
    });
    for (let key in averageFeatures) {
      averageFeatures[key] =
        Math.round(
          ((averageFeatures[key] * 100) / playlistFeatures.length +
            Number.EPSILON) *
            100
        ) / 100;
    }
    this.setState({
      features: [
        ...this.state.features,
        {
          year: year,
          averages: averageFeatures,
        },
      ],
    });
  }

  createGraphData() {
    let graphData = {
      acousticness: [],
      danceability: [],
      energy: [],
      valence: [],
    };
    let sortedByYearFeatures = []
      .concat(this.state.features)
      .sort((a, b) => a.year.localeCompare(b.year));

    sortedByYearFeatures.forEach((year) => {
      for (let key in year.averages) {
        graphData[key].push(year.averages[key]);
      }
    });
    let formattedData = {};

    const topSpotifyDatasets = {
      acousticness: [15.88, 16.63, 19.57, 22.16, 21.39],
      danceability: [63.25, 69.68, 71.65, 71.38, 71.99],
      energy: [67.24, 66.07, 65.91, 64.06, 65.05],
      valence: [45.15, 51.7, 48.44, 54.6, 53.1],
    };

    // const averageSpotifyDatasets = {
    //   acousticness: [25.49, 25.49, 25.49, 25.49, 25.49],
    //   danceability: [59.14, 59.14, 59.14, 59.14, 59.14],
    //   energy: [64.57, 64.57, 64.57, 64.57, 64.57],
    //   valence: [49.21, 49.21, 49.21, 49.21, 49.21],
    // };

    const averageSpotifyDatasets = {
      acousticness: [28.03, 28.99, 27.19, 28.93, 24.74],
      danceability: [60, 61.23, 66.5, 64.42, 67.31],
      energy: [59.29, 58.67, 59.06, 57.88, 61.19],
      valence: [43.08, 41.45, 44.71, 46.59, 48.28],
    };

    for (const feature in graphData) {
      formattedData[feature] = {
        labels: sortedByYearFeatures.map((playlist) => playlist.year),
        datasets: [
          {
            data: graphData[feature],
            label: "Your Top Songs",
            fill: true,
            borderColor: "rgba(29,185,84,1)",
            backgroundColor: "rgba(29,185,84,0.4)",
          },
          {
            data: averageSpotifyDatasets[feature],
            label: "Average Song",
            fill: false,
            borderColor: "rgba(255, 255, 255, 0.9)",
          },
          {
            data: topSpotifyDatasets[feature],
            label: "Top Spotify Songs",
            fill: false,
            borderColor: "rgba(255,99,132,1)",
          },
        ],
      };
    }
    this.setState({ formattedData: formattedData, isLoading: false });
  }
  render() {
    const chartDescriptions = {
      valence:
        "Describes the musical positiveness conveyed by a track. Tracks with high valence sound more positive, while tracks with low valence sound more negative.",
      danceability:
        "Describes how suitable a track is for dancing based on a combination of musical elements.",
      energy:
        "Represents a perceptual measure of intensity and activity based on dynamic range, general entropy, etc.",
      acousticness:
        "A confidence measure from 0 to 100 of whether the track is acoustic. 100 represents high confidence the track is acoustic.",
    };
    return this.state.isLoading ? (
      <div
        style={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SoundWave />
      </div>
    ) : (
      <div>
        <MoodDashboard token={this.props.token} />
        <Container>
          <Row className="mb-4">
            <Col md={6} className="mb-4">
              <LineChart
                title="Valence"
                description={chartDescriptions.valence}
                data={this.state.formattedData.valence}
              />
            </Col>
            <Col md={6} className="mb-4">
              <LineChart
                title="Danceability"
                description={chartDescriptions.danceability}
                data={this.state.formattedData.danceability}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6} className="mb-4">
              <LineChart
                title="Energy"
                description={chartDescriptions.energy}
                data={this.state.formattedData.energy}
              />
            </Col>
            <Col md={6} className="mb-4">
              <LineChart
                title="Acousticness"
                description={chartDescriptions.acousticness}
                data={this.state.formattedData.acousticness}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
