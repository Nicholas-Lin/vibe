import React from "react";
import LineChart from "./LineChart";
import Api from "../../Api";
import Fade from "react-reveal/Fade";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class VibeDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      data: [],
      features: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const API = new Api(this.props.token);
    const requestFeatures = [
      "id",
      "acousticness",
      "danceability",
      "energy",
      "valence",
    ];
    const searchResults = await API.searchForPlaylist(
      ["Your Top Songs"],
      "Spotify"
    );
    await Promise.all(
      searchResults.map(async (item) => {
        // If search result is a top track playlist
        if (item.name.length === 19) {
          let response = await API.getPlaylist(item.id);
          const year = response.name.split(" ").pop();
          const playlist = {
            year: year,
            tracks: response.tracks,
          };
          this.setState({
            data: [...this.state.data, playlist],
          });
          const playlistFeatures = await API.getTrackFeatures(
            playlist.tracks,
            requestFeatures
          );
          this.computeFeatures(year, playlistFeatures);
        }
      })
    );
    let recentPlaylist = await API.getUserFavorites(
      "tracks",
      "medium_term",
      50
    );
    // Workaround for get track features
    recentPlaylist = recentPlaylist.map((item) => {
      return { track: item };
    });
    const playlistFeatures = await API.getTrackFeatures(
      recentPlaylist,
      requestFeatures
    );
    this.computeFeatures("2020", playlistFeatures);
    this.createGraphData();
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
        if (key !== "id") {
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

    // TESTING
    // sortedByYearFeatures = [
    //   {
    //     averages: {
    //       acousticness: 1,
    //       danceability: 1,
    //       energy: 2,
    //       valence: 3,
    //     },
    //     year: "2019",
    //   },
    //   {
    //     averages: {
    //       acousticness: 1,
    //       danceability: 1,
    //       energy: 2,
    //       valence: 3,
    //     },
    //     year: "2020",
    //   },
    // ];

    // console.log(sortedByYearFeatures);
    sortedByYearFeatures.forEach((year) => {
      for (let key in year.averages) {
        graphData[key].push(year.averages[key]);
      }
    });

    for (let key in graphData) {
      while (graphData[key].length < 5) {
        graphData[key].unshift(null);
      }
    }

    // console.log(graphData);
    let formattedData = {};

    const topSpotifyDatasets = {
      acousticness: [15.88, 16.63, 19.57, 22.16, 21.39],
      danceability: [63.25, 69.68, 71.65, 71.38, 71.99],
      energy: [67.24, 66.07, 65.91, 64.06, 65.05],
      valence: [45.15, 51.7, 48.44, 54.6, 53.1],
    };

    const averageSpotifyDatasets = {
      acousticness: [28.03, 28.99, 27.19, 28.93, 24.74],
      danceability: [60, 61.23, 66.5, 64.42, 67.31],
      energy: [59.29, 58.67, 59.06, 57.88, 61.19],
      valence: [43.08, 41.45, 44.71, 46.59, 48.28],
    };
    // console.log(graphData);
    for (const feature in graphData) {
      formattedData[feature] = {
        labels: ["2016", "2017", "2018", "2019", "2020"],
        datasets: [
          {
            data: graphData[feature],
            label: "Your Top Songs",
            fill: true,
            borderColor: "rgba(29,185,84,1)",
            backgroundColor: "rgba(29,185,84,0.4)",
            spanGaps: false,
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
    // console.log(formattedData);
    this.setState({ formattedData: formattedData, isLoading: false });
    this.props.load();
  }
  render() {
    const chartDescriptions = {
      valence:
        "Valence (positivity) describes how happy, cheerful, and euphoric a track feels, while tracks with low valence tend to sound sad, depressed, or angry.",
      danceability:
        "Describes how suitable a track is for dancing based on a combination of its tempo, rhythm stability, and beat strength.",
      energy:
        "Describes how fast, loud, and noisy a track feels. For example, death metal has high energy, while a Bach prelude scores low on the scale.",
      acousticness:
        "Describes how many more elements of a song are acoustic, as opposed to electric. Songs with a higher score are more likely to be acoustic..",
    };
    return (
      !this.state.isLoading && (
        <div>
          <Container fluid="lg">
            <Fade>
              <header>Your Vibe</header>
              <Row className="mt-4 mb-4">
                <Col md={6} className="mt-4 mb-4">
                  <LineChart
                    title="Valence (Happiness)"
                    description={chartDescriptions.valence}
                    data={this.state.formattedData.valence}
                  />
                </Col>
                <Col md={6} className="mt-4 mb-4">
                  <LineChart
                    title="Danceability"
                    description={chartDescriptions.danceability}
                    data={this.state.formattedData.danceability}
                  />
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md={6} className="mt-4 mb-4">
                  <LineChart
                    title="Energy"
                    description={chartDescriptions.energy}
                    data={this.state.formattedData.energy}
                  />
                </Col>
                <Col md={6} className="mt-4 mb-4">
                  <LineChart
                    title="Acousticness"
                    description={chartDescriptions.acousticness}
                    data={this.state.formattedData.acousticness}
                  />
                </Col>
              </Row>
              <hr />
            </Fade>
          </Container>
        </div>
      )
    );
  }
}

export default VibeDashboard;
