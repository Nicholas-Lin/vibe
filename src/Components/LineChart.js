import React from "react";
import Chart from "chart.js";
import Col from "react-bootstrap/Col";

Chart.defaults.global.defaultFontColor = "white";
Chart.defaults.global.defaultColor = "white";
Chart.defaults.scale.gridLines.color = "rgb(83,83,83)";

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }
  componentDidMount() {
    new Chart(this.chartRef.current, {
      type: "line",
      data: {
        labels: this.props.data.labels,
        datasets: this.props.data.datasets.map((dataset) => {
          return {
            data: dataset.data,
            label: dataset.label,
            borderColor: dataset.borderColor,
            borderWidth: 2,
            fill: dataset.fill,
            backgroundColor: dataset.backgroundColor,
          };
        }),
      },
      options: {},
    });
  }

  render() {
    return (
      <Col className=" h-100 d-flex flex-column justify-content-between">
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <canvas ref={this.chartRef} width="400" height="300" />
      </Col>
    );
  }
}

export default LineChart;
