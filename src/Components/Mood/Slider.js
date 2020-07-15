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
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { ImageCarousel } from "./ImageCarousel";

class Slider extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { value, title, color, tooltip } = this.props;
    const muiTheme = createMuiTheme({
      overrides: {
        MuiSlider: {
          rail: {
            color: "#b1b1b1",
          },
        },
      },
    });
    const renderTooltip = props => (
      <Tooltip {...props}>{tooltip}</Tooltip>
    );

    return (
      <div>

        <span className="slider-title">
          <OverlayTrigger placement="left" overlay={renderTooltip}>
            <span className="slider-name">
              {title}
            </span>
          </OverlayTrigger>
          <span className="slider-value">
            {value}
          </span>
        </span>

        <ThemeProvider theme={muiTheme}>
          <MUISlider className={`slider--${color}`} value={value} valueLabelDisplay="auto" />
        </ThemeProvider>
      </div>
    );
  }
}

export default Slider;
