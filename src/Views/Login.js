import React from "react";
import SubmitButton from "../Components/SubmitButton";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import SoundWave from "../Components/SoundWave";

export default function Login(props) {
  if (props.isLoggedIn) {
    return null;
  }
  return (
    <Container>
      <Col className="d-flex align-items-center flex-column login justify-content-center">
        <header> Vibe </header>
        <SoundWave />
        <SubmitButton
          isLoggedIn={props.isLoggedIn}
          handleLogin={() => props.handleLogin()}
        />
        <h5 className="mt-5">Get insights into your vibe.</h5>
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
      </Col>
    </Container>
  );
}

