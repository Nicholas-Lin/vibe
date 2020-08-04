/**
 * File Name: Slider.js
 * Author: Nicholas Lin
 * Date: 7/13/20
 * Description: Displays contents for the "Your Mood" section
 */

import React, { Component } from "react";
import MUISlider from "@material-ui/core/Slider";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./slider.css";

class Slider extends Component {
  render() {
    const { value, title, color, tooltip } = this.props;
    const muiTheme = createMuiTheme({
      overrides: {
        MuiSlider: {
          valueLabel: {
            paddingLeft: "4px",
          },
          thumb: {
            width: "15px",
            height: "15px",
          },
          track: {
            height: "5px",
          },
          rail: {
            height: "5px",
            color: "#b1b1b1",
          },
        },
      },
    });
    const renderTooltip = (props) => <Tooltip {...props}>{tooltip}</Tooltip>;

    return (
      <div>
        <span className="slider-title">
          <OverlayTrigger placement="right" overlay={renderTooltip}>
            <span className="slider-name">{title}</span>
          </OverlayTrigger>
          <span className="slider-value">{value}</span>
        </span>

        <ThemeProvider theme={muiTheme}>
          <MUISlider
            className={`slider--${color}`}
            value={value}
            valueLabelDisplay="auto"
          />
        </ThemeProvider>
      </div>
    );
  }
}

export default Slider;
