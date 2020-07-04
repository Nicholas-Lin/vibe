import React from "react";
import Chart from "chart.js";

Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultColor = 'white';
Chart.defaults.scale.gridLines.color = 'grey';

class LineChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();

    }
    componentDidMount() {
        new Chart(this.chartRef.current, {
            type: 'line',
            data: {
                labels: this.props.data.labels,
                datasets:
                    this.props.data.datasets.map((dataset) => {
                        return {
                            data: dataset.data,
                            label: dataset.label,
                            borderColor: dataset.borderColor,
                            fill: false,
                            borderWidth: 2
                        }
                    })
            },
            options: {
                title: {
                    display: true,
                    text: this.props.title
                }
            }
        });
    }

    render() {
        return (
            <div>
                <canvas ref={this.chartRef} width="400" height="400" />
            </div>
        )
    }
}

export default LineChart