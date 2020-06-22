import React from "react";
import Button from 'react-bootstrap/Button';

class SubmitButton extends React.Component {

    handleClick(){
        const clientID = "03448805c58d4c5ba555ea203c8ce771";
        const responseType = "token";
        const redirectURI = "http://localhost:3000/";
        const scope = "user-read-private%20user-read-email"
        const state = "123";
        const authorizationURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=${responseType}&state=${state}`;
        console.log(authorizationURL);
        window.location.href = authorizationURL;
        
    }

    getParameterByName(name) {
        let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
      
    getAccessToken() {
        return this.getParameterByName('access_token');
    }

    render() {
        return (
            <div>
                <Button className="submit-button" onClick={() => this.handleClick()}>Discover</Button>
            </div>
        );
    }
}

export default SubmitButton