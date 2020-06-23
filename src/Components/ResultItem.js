import React from "react";

class ResultItem extends React.Component {
    constructor(props){
        super(props);
    }

    

    render() {
        console.log();

        return (
            <div>
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artists[0].name}</p>
            </div>
        );
    }
}

export default ResultItem