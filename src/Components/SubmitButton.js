import React from "react";
import Button from 'react-bootstrap/Button';

class SubmitButton extends React.Component {
    handleClick() {
        if (this.props.isLoggedIn) {

        } else {
            this.props.handleLogin();
        }
    }
    render() {
        if(this.props.isLoggedIn){
            return null;
        }
        return (
            <div>
                <Button className="submit-button" onClick={() => this.handleClick()}>Login with Spotify</Button>
            </div>
        );
    }
}

export default SubmitButton