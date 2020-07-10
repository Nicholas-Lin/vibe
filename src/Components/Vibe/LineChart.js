import React from "react";
import Chart from "chart.js";
import Col from "react-bootstrap/Col";

Chart.defaults.global.defaultFontColor = "white";
Chart.defaults.global.defaultColor = "white";
Chart.defaults.scale.gridLines.color = "rgb(83,83,83)";
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  draw: function (ease) {
    Chart.controllers.line.prototype.draw.call(this, ease);

    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      let activePoint = this.chart.tooltip._active[0];
      let ctx = this.chart.ctx;
      let x = activePoint.tooltipPosition().x;
      let topY = this.chart.legend.bottom;
      let bottomY = this.chart.chartArea.bottom;

      // let meta = this.getMeta();
      // meta.data.forEach((element) => {
      //   if (element._model.x === x) {
      //     topY = element._model.y;
      //     bottomY = y;
      //   }
      // });

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(255, 255, 255, 0.5)";
      ctx.stroke();
      ctx.restore();
    }
  },
});

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }
  componentDidMount() {
    new Chart(this.chartRef.current, {
      type: "LineWithLine",
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

            pointBackgroundColor: dataset.borderColor,
            pointBorderWidth: 1,
            pointBorderColor: "black",
            pointRadius: 5,
            pointHitRadius: 6,
            pointHoverBackgroundColor: "black",
            pointHoverBorderColor: dataset.borderColor,
          };
        }),
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          mode: "index",
          intersect: false,
          titleFontColor: "black",
          bodyFontColor: "black",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }
              label += Math.round(tooltipItem.yLabel);
              return label;
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <Col className=" h-100 d-flex flex-column justify-content-between align-items-center p-0">
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <div className="line-chart-container">
          <canvas ref={this.chartRef} />
        </div>
      </Col>
    );
  }
}

export default LineChart;
