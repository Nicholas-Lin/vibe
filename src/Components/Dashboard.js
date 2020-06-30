import React from "react";
import LineGraph from "./LineGraph"
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            data: [],
            features: []
        }
    }

    componentDidMount() {
        this.getTopPlaylists();
    }

    getTopPlaylists() {
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
            .then((res) => {
                let playlistRequests = [];
                res.data.playlists.items.forEach((item) => {
                    // If search result is a top track playlist     
                    if (item.name.length === 19 && Date.parse(item.name) && item.owner.display_name === "Spotify") {
                        const request = axios
                            .get(`https://api.spotify.com/v1/playlists/${item.id}`,
                                {
                                    headers: {
                                        'Authorization': `Bearer ${this.state.token}`
                                    },
                                    params: {
                                        'fields': 'name,tracks.items(track)'
                                    }
                                }
                            )
                        playlistRequests.push(request);
                    }
                })
                axios
                    .all(playlistRequests)
                    .then(
                        axios.spread((...responses) => {
                            responses.forEach((response) => {
                                const year = response.data.name.split(" ").pop();
                                const playlist = {
                                    year: year,
                                    tracks: response.data.tracks.items,
                                    features: {
                                        acousticness: "",
                                        danceability: "",
                                        energy: "",
                                        valence: ""
                                    }
                                };
                                this.setState({
                                    data: [
                                        ...this.state.data,
                                        playlist
                                    ]
                                })
                                this.getTrackFeatures(year, playlist.tracks)
                            })

                        })
                    )
            })
            .catch((err) => {
                console.log(err)
            })
    }

    computeFeatures(year, playlistFeatures) {
        let averageFeatures = {
            acousticness: 0,
            danceability: 0,
            energy: 0,
            valence: 0
        };
        playlistFeatures.forEach((track) => {
            for (let key in track) {
                if (key != "id") {
                    averageFeatures[key] += track[key];
                }
            }
        })
        for (let key in averageFeatures) {
            averageFeatures[key] /= playlistFeatures.length;
        }
        console.log(averageFeatures);
        this.setState({
            features: [
                ...this.state.features,
                {
                    year: year,
                    averages: averageFeatures
                }
            ]
        })
    }

    createGraphs() {

    }

    getTrackFeatures(year, tracks) {
        let ids = [];
        tracks.forEach((item) => {
            ids.push(item.track.id);
        })
        axios
            .get('https://api.spotify.com/v1/audio-features',
                {
                    headers: {
                        'Authorization': `Bearer ${this.state.token}`
                    },
                    params: {
                        'ids': ids.join()
                    }
                }
            )
            .then(res => {
                let results = []
                res.data.audio_features.forEach((track) => {
                    const { id, acousticness, danceability, energy, valence } = track;
                    results.push(
                        {
                            id: id,
                            acousticness: acousticness,
                            danceability: danceability,
                            energy: energy,
                            valence: valence
                        }
                    )
                })
                this.computeFeatures(year, results);
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        const valenceData = {
            labels: ['2017', '2018', '2019', '2020'],
            datasets: [{
                label: 'Your Valence',
                data: [0.3, 0.5, 0.6, 0.7],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
                borderWidth: 2

            },
            {
                label: 'Average Valence',
                data: [0.2, 0.7, 0.5, 0.8],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                borderWidth: 2
            }
            ]
        }
        const danceabilityData = {
            labels: ['2017', '2018', '2019', '2020'],
            datasets: [{
                label: 'Your Danceability',
                data: [0.3, 0.5, 0.6, 0.7],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
                borderWidth: 2

            },
            {
                label: 'Average Danceability',
                data: [0.2, 0.7, 0.5, 0.8],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                borderWidth: 2
            }
            ]
        }
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <LineGraph chartID="valence-chart" title="Valence" data={valenceData} />
                        </Col>
                        <Col>
                            <LineGraph chartID="danceability-chart" title="Danceability" data={danceabilityData} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <LineGraph chartID="valence-chart2" title="Valence" data={valenceData} />
                        </Col>
                        <Col>
                            <LineGraph chartID="danceability-chart2" title="Danceability" data={danceabilityData} />
                        </Col>
                    </Row>
                </Container>


            </div>
        )
    }
}

export default Dashboard