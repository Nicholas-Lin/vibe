import React from "react";
import Chart from "chart.js";

class LineChart extends React.Component {

    componentDidMount() {
        const ctx = document.getElementById(this.props.chartID).getContext('2d');
        Chart.defaults.global.defaultFontColor = 'white';
        new Chart(ctx, {
            type: 'line',
            data: this.props.data,
            options: {
                title: {
                    display: true,
                    text: this.props.title
                },
                responsive: true, // Instruct chart js to respond nicely.
                maintainAspectRatio: false, // Add to prevent default behaviour of full-
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'year'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    render() {
        return (
            <div>
                <canvas id={this.props.chartID} width="400" height="400"></canvas>
            </div>
        )
    }
}

export default LineChart