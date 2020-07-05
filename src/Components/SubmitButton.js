import React from "react";
import Button from "react-bootstrap/Button";

class SubmitButton extends React.Component {
  render() {
    if (this.props.isLoggedIn) {
      return null;
    }
    return (
      <div>
        <Button
          className="submit-button"
          variant="success"
          onClick={() => this.props.handleLogin()}
        >
          Login with Spotify
        </Button>
      </div>
    );
  }
}

export default SubmitButton;
