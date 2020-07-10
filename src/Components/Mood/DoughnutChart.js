import React from "react";
import Chart from "chart.js";
Chart.defaults.global.defaultFontColor = "white";
//Chart.defaults.global.defaultColor = "white";

class DoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }
  componentDidMount() {
    const { data } = this.props;
    const limit = 10;
    let formattedData = {
      labels: [],
      data: [],
    };

    for (let i = 0; i < data.length && i < limit; i++) {
      formattedData.labels.push(data[i].key);
      formattedData.data.push(data[i].value);
    }
    if (data.length >= limit) {
      let sum = 0;
      for (let i = limit; i < data.length; i++) {
        sum += data[i].value;
      }
      formattedData.labels.push("Other");
      formattedData.data.push(sum);
    }

    const sum = formattedData.data.reduce((a, b) => a + b, 0);
    formattedData.data = formattedData.data.map((item) =>
      Math.round((item / sum) * 100)
    );

    new Chart(this.chartRef.current, {
      type: "doughnut",
      data: {
        labels: formattedData.labels,
        datasets: [
          {
            label: "Genres",
            backgroundColor: [
              "rgba(255, 221, 0, 0.8)",
              "rgba(255, 200, 0, 0.8)",
              "rgba(255,166,0, 0.8)",
              "rgba(255,124,67, 0.8)",
              "rgba(249,93,106, 0.8)",
              "rgba(212,80,135, 0.8)",
              "rgba(160,81,149, 0.8)",
              "rgba(102,81,145, 0.8)",
              "rgba(47,75,124, 0.8)",
              "rgba(29, 52, 130, 0.8)",
              "rgba(10, 36, 66, 0.8)",
            ],
            borderColor: [
              "rgba(255, 221, 0, 1)",
              "rgba(255, 200, 0, 1)",
              "rgba(255,166,0, 1)",
              "rgba(255,124,67, 1)",
              "rgba(249,93,106, 1)",
              "rgba(212,80,135, 1)",
              "rgba(160,81,149, 1)",
              "rgba(102,81,145, 1)",
              "rgba(47,75,124, 1)",
              "rgba(29, 52, 130, 1)",
              "rgba(10, 36, 66, 1)",
            ],
            data: formattedData.data,
          },
        ],
      },
      options: {
        legend: {
          position: "bottom",
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return (
                data["labels"][tooltipItem["index"]] +
                ": " +
                data["datasets"][0]["data"][tooltipItem["index"]] +
                "%"
              );
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <div className="doughnut-chart-container">
        <canvas ref={this.chartRef} />
      </div>
    );
  }
}

export default DoughnutChart;
