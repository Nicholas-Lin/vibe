import React from "react";
import "../../result.css";

function ResultItem(props) {
  const {
    type,
    position,
    title,
    subtitle,
    searchTerm,
    image,
    previewURL,
  } = props;

  // Track name does not contain the search term
  const termNotInTitle = title.toLowerCase().indexOf(searchTerm) === -1;
  // Artist name does not contain the search term
  const termNotInSubtitle = subtitle.toLowerCase().indexOf(searchTerm) === -1;

  // If search term not in track then do not render
  if (termNotInTitle && termNotInSubtitle) {
    return null;
  }

  const item = (
    <div className="result-item">
      <span className="order-number">{position}</span>
      <span className="result-info">
        <span
          className="result-cover"
          style={{ backgroundImage: `url(${image})` }}
        ></span>
        <span className="result-summary">
          <span className="result-artist">{subtitle}</span>
          <span className="result-name">{title}</span>
        </span>
      </span>
    </div>
  );

  return type === "track" ? (
    <div onClick={() => props.playTrack(previewURL)}>{item}</div>
  ) : (
    <div>{item}</div>
  );
}

export default ResultItem;
