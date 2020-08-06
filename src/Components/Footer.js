import React from "react";
import Fade from "react-reveal/Fade";

export default function Loading() {
  return (
    <footer className="mt-2 mb-4">
      <Fade>
        <h6>Like what you see?</h6>
        <h6>
          Give this project a{" "}
          <span role="img" aria-label="star emoji">
            🌟
          </span>{" "}
          on
          <a
            href="https://github.com/Nicholas-Lin/vibe"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Github.
          </a>
        </h6>
        <h6>
          Share it with your friends{" "}
          <span role="img" aria-label="star emoji">
            😎
          </span>
        </h6>
      </Fade>
    </footer>
  );
}
