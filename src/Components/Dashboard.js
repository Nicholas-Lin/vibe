import React from "react";
import LineChart from "./LineChart";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        if (
          item.name.length === 19 &&
          Date.parse(item.name) &&
          item.owner.display_name === "Spotify"
        ) {
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
          (averageFeatures[key] / playlistFeatures.length + Number.EPSILON) *
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
    const averageDatasets = {
      acousticness: [0.3, 0.3, 0.3, 0.3, 0.3],
      danceability: [0.65, 0.65, 0.65, 0.65, 0.65],
      energy: [0.6, 0.6, 0.6, 0.6, 0.6],
      valence: [0.5, 0.5, 0.5, 0.5, 0.5],
    };

    for (const feature in graphData) {
      formattedData[feature] = {
        labels: sortedByYearFeatures.map((playlist) => playlist.year),
        datasets: [
          {
            data: graphData[feature],
            label: "You",
            fill: true,
            borderColor: "rgba(29,185,84,1)",
            backgroundColor: "rgba(29,185,84,0.4)",
          },
          {
            data: averageDatasets[feature],
            label: "Average",
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
        "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.",
    };
    return this.state.isLoading ? null : (
      <div>
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
