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
        console.log(this.props)
        return (
            <div>
                <Button className="submit-button" onClick={() => this.handleClick()}>Discover</Button>
            </div>
        );
    }
}

export default SubmitButton