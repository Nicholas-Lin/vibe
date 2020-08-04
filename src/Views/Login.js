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
      <Col className="d-flex align-items-center flex-column login justify-content-center login">
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
          <h6 className="mt-5">
            {" "}
            Created by{" "}
            <a href="https://nicholas-lin.github.io/" target="_blank">
              {" "}
              Nicholas Lin.{" "}
            </a>{" "}
          </h6>
          <Fade delay={2000}>
            <h6>
              Your information is never stored. Powered by{" "}
              <a
                href="https://developer.spotify.com/documentation/web-api/"
                target="_blank"
              >
                {" "}
                Spotify's API.{" "}
              </a>{" "}
            </h6>

            <h6>
              Give this project a 🌟 on
              <a href="https://github.com/Nicholas-Lin/vibe" target="_blank">
                {" "}
                Github.
              </a>
            </h6>
          </Fade>
        </Fade>
      </Col>
    </Container>
  );
}

export default Login;
