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
    const { value, title, valueLabelDisplay } = this.props;
    const muiTheme = createMuiTheme({
      overrides: {
        MuiSlider: {
          thumb: {
            color: "white",
          },
          track: {
            color: "white",
          },
          rail: {
            color: "black",
          },
        },
      },
    });

    return (
      <div>
        <span>
          {title}: {value}
        </span>
        <ThemeProvider theme={muiTheme}>
          <MUISlider value={value} valueLabelDisplay={valueLabelDisplay} />
        </ThemeProvider>
      </div>
    );
  }
}

export default Slider;
