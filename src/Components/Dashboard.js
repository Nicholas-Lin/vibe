import React from "react";
import LineChart from "./LineChart"
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
            features: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.getTopPlaylists();
    }

    getTopPlaylists = async () => {
        let res = await axios
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

        let playlistRequests = [];
        await Promise.all(res.data.playlists.items.map(async (item) => {
            // If search result is a top track playlist     
            if (item.name.length === 19 && Date.parse(item.name) && item.owner.display_name === "Spotify") {
                let response = await axios
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
                const year = response.data.name.split(" ").pop();
                const playlist = {
                    year: year,
                    tracks: response.data.tracks.items,
                };
                this.setState({
                    data: [
                        ...this.state.data,
                        playlist
                    ]
                })
                const playlistFeatures = await this.getTrackFeatures(playlist.tracks);
                this.computeFeatures(year, playlistFeatures);
            }
        }));
        this.createGraphData();
        console.log(this.state.features);
        console.log(this.state.data)
    }
    async getTrackFeatures(tracks) {
        let ids = [];
        tracks.forEach((item) => {
            ids.push(item.track.id);
        })
        let res = await axios
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
        return results;
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

    createGraphData() {
        let graphData = {
            acousticness: [],
            danceability: [],
            energy: [],
            valence: []
        }
        let sortedByYearFeatures = [].concat(this.state.features)
            .sort((a, b) => a.year.localeCompare(b.year));

        sortedByYearFeatures.forEach((year) => {
            for (let key in year.averages) {
                graphData[key].push(year.averages[key]);
            }
        })
        let formattedData = []
        for (const feature in graphData) {
            const averageDataset = [0.1, 0.3, 0.4, 0.5]
            formattedData.push({
                labels: sortedByYearFeatures.map((playlist) => playlist.year),
                datasets: [{
                    data: graphData[feature],
                    label: "You",
                    borderColor: "red"
                },
                {
                    data: averageDataset,
                    label: "Average",
                    borderColor: "green"
                }]
            })

        }
        this.setState({ formattedData: formattedData, isLoading: false });
    }
    render() {
        const danceabilityData = {
            labels: ['2017', '2018', '2019', '2020'],
            datasets: [{
                label: 'Your Danceability',
                data: [0.2, 0.7, 0.5, 0.8],
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
            this.state.isLoading ?
                null :
                <div>
                    <Container fluid>
                        <Row>
                            <Col>
                                <LineChart title="Acousticness" data={this.state.formattedData[0]} />
                            </Col>
                            <Col>
                                <LineChart title="Danceability" data={this.state.formattedData[1]} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <LineChart title="Energy" data={this.state.formattedData[2]} />
                            </Col>
                            <Col>
                                <LineChart title="Valence" data={this.state.formattedData[3]} />
                            </Col>
                        </Row>

                    </Container>


                </div>
        )
    }
}

export default Dashboard