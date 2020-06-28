import React from "react";
import LineGraph from "./LineGraph"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Dashboard extends React.Component {

    componentDidMount() {
        this.props.getData();
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