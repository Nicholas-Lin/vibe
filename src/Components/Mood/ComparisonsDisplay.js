import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PercentDisplay from "./PercentDisplay";

export default function ComparisonsDisplay(props) {
  const { valence, danceability, energy, acousticness } = props.percentages;
  return (
    <Row className="flex-grow-1">
      <hr />
      <Col md={3}>
        <PercentDisplay
          percent={valence}
          descriptions={["Less happy", "Same hapiness", "Happier"]}
          emojis={["😭", "😢", "😕", "😃", "😁", "😊"]}
        />
      </Col>
      <Col md={3}>
        <PercentDisplay
          percent={danceability}
          descriptions={[
            "Less danceable",
            "Same danceability",
            "More danceable",
          ]}
          emojis={["💃"]}
        />
      </Col>
      <Col md={3}>
        <PercentDisplay
          percent={energy}
          descriptions={["Less energetic", "Same energy", "More energetic"]}
          emojis={["😴", "⚡️", "🔥"]}
        />
      </Col>
      <Col md={3}>
        <PercentDisplay
          percent={acousticness}
          descriptions={["Less acoustic", "Same acousticness", "More acoustic"]}
          emojis={["🎸", "🎻"]}
        />
      </Col>
      <hr />
    </Row>
  );
}
