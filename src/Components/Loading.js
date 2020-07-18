import React from "react";
import cassette from "../Assets/cassette.gif";
import Fade from "react-reveal/Fade";

export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade>
        <img
          src={cassette}
          style={{ maxHeight: "40vh", maxWidth: "80vw" }}
          alt="Cassette spinning loading animation"
        />
        <h1>Loading your vibe...</h1>
      </Fade>

    </div>
  );
}
