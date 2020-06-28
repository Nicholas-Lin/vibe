import React from "react";
import "../track.css"

class ArtistItem extends React.Component {

    render() {
        const { position, artist, searchTerm } = this.props;
        let { name, genres} = artist;
        const imgURL = artist.images[0].url;


        genres = genres.join(", ");

        // Track name does not contain the search term
        const termNotInName = name.toLowerCase().indexOf(searchTerm) === -1
        // Genres do not contain the search term
        const termNotInGenres = genres.toLowerCase().indexOf(searchTerm) === -1

        // If search term not in track then do not render
        if (termNotInGenres && termNotInName) {
            return null;
        }

        return (
            <div>
                <a className="track-history-item">
                    <span className="order-number">{position}</span>
                    <span className="track-info">
                        <span className="track-cover" style={{ backgroundImage: `url(${imgURL})` }}></span>
                        <span className="track-summary">
                            <span className="track-artist">{genres}</span>
                            <span className="track-name">{name}</span>
                        </span>
                    </span>
                </a>
            </div>
        );
    }
}

export default ArtistItem