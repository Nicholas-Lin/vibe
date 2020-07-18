/**
 * File Name: Login.js
 * Author: Nicholas Lin
 * Date: 7/11/20
 * Description: Login page and landing page of the website
 */

import React from "react";
import SubmitButton from "../Components/SubmitButton";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import SoundWave from "../Components/SoundWave";
import Fade from "react-reveal/Fade";

function Login(props) {
  if (props.isLoggedIn) {
    return null;
  }
  return (
    <Container>
      <Col className="d-flex align-items-center flex-column login justify-content-center">
        <Fade duration={2000}>
          <header> Vibe </header>
          <SoundWave />
          <Fade delay={1000}>
            <SubmitButton
              isLoggedIn={props.isLoggedIn}
              handleLogin={() => props.handleLogin()}
            />
          </Fade>

          <h4 className="mt-5">Get insights into your vibe.</h4>
          <h6 className="mt-5">Your information will not be stored.</h6>
          <h6>
            {" "}
            Created by{" "}
            <a href="https://nicholas-lin.github.io/"> Nicholas Lin. </a>{" "}
            Powered by{" "}
            <a href="https://developer.spotify.com/documentation/web-api/">
              {" "}
              Spotify's API.{" "}
            </a>{" "}
          </h6>
        </Fade>
      </Col>
    </Container>
  );
}

export default Login;
