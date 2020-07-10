import React from "react";
import SoundWave from "./SoundWave";

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
      <SoundWave />
      <h1>Loading your vibe...</h1>
    </div>
  );
}
