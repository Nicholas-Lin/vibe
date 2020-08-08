import axios from "axios";
class Api {
  constructor(api_token) {
    this.token = api_token;
  }

  /**
   * Gets user's ID
   * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
   * @param  {string} playlistID - The type of entity to return. Valid values: artists or tracks.
   * * @param  {Array<string>} playlistID - The type of entity to return. Valid values: artists or tracks.
   * @return An array of track or artists objects
   */
  async addItemsToPlaylist(playlistID, uris) {
    const endpoint = `	https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    const jsonData = { uris };

    // set the headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };
    await axios.post(endpoint, jsonData, config);
  }

  /**
   * Gets user's ID
   * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
   * @param  {string} userID - The user ID
   * @param  {string} name - The name of the playlist
   * @param  {string} description - The description
   * @param  {boolean} isPublic - Whether or not the playlist will be public (default true)
   * @return The playlist ID
   */
  async createPlaylist(userID, name, description, isPublic = true) {
    const endpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
    const jsonData = {
      name: name,
      description: description,
      public: isPublic,
    };

    // set the headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };
    const response = await axios.post(endpoint, jsonData, config);
    return response.data.id;
  }

  /**
   * Gets user's ID
   * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
   * @return The ID of the current user
   */
  async getUserID() {
    const endpoint = `https://api.spotify.com/v1/me`;
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.data.id;
  }

  /**
   * Gets users top tracks/artists in a given time range:
   * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
   * @param  {string} type - The type of entity to return. Valid values: artists or tracks.
   * @param {string} time_range - Over what time frame the affinities are computed. Valid values: long_term, medium_term, short_term
   * @param {number} limit - The number of entities to return. Default: 20. Minimum: 1. Maximum: 50.
   * @return An array of track or artists objects
   */
  async getUserFavorites(type, time_range, limit = 20) {
    const endpoint = `https://api.spotify.com/v1/me/top/${type}`;
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        time_range: time_range,
        limit: limit,
      },
    });
    return response.data.items;
  }

  /**
   * Searches spotify for a playlist given search terms and the owner
   * @param  {Array<string>} searchTerms - An array of search terms
   * @param {string} owner - The owner of the playlist
   * @return playlist object with id and name fields
   */
  async searchForPlaylist(searchTerms, owner) {
    const endpoint = "https://api.spotify.com/v1/search";
    let res = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        q: searchTerms.join("%20"),
        type: "playlist",
        limit: "10",
      },
    });
    const result = res.data.playlists.items.filter((item) => {
      let isTermInName = true;
      // Checks if search terms are in the name of the playlist
      searchTerms.forEach((term) => {
        isTermInName =
          isTermInName && item.name.toLowerCase().includes(term.toLowerCase());
      });
      // If the search terms in name and owner matches playlist owner name return item
      return (
        isTermInName &&
        item.owner.display_name.toLowerCase().includes(owner.toLowerCase())
      );
    });
    return result;
  }

  /**
   * Gets details of a playlist given the id
   * @param  {string} id - The id of the playlist
   * @return an object containing the name and tracks of the playlist
   */
  async getPlaylist(id) {
    const endpoint = "https://api.spotify.com/v1/playlists/";
    let res = await axios.get(`${endpoint}${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        fields: "name,tracks.items(track)",
      },
    });
    return {
      name: res.data.name,
      tracks: res.data.tracks.items,
    };
  }

  /**
   * Gets an array of 50 tracks that the user recently played
   * @return {Array<SimpleTrack>} - An array of simple track objects from Spotify
   */
  async getRecentTracks() {
    const endpoint = "https://api.spotify.com/v1/me/player/recently-played";
    let res = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        limit: 50,
      },
    });
    return res.data.items;
  }

  /**
   * Gets the features of an array of tracks
   * @param  {Array<SimpleTrackObject>} tracks - An array of Spotify tracks to analyze
   * @return {Array<Objects>} - An array of objects that contain trackID, acousticness, danceability, energy, valence, and popularity properties
   */
  async getTrackFeatures(tracks, features) {
    let ids = [];
    tracks.forEach((item) => {
      if (item.track) {
        ids.push(item.track.id);
      } else {
        ids.push(item.id);
      }
    });
    const endpoint = "https://api.spotify.com/v1/audio-features";
    let res = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        ids: ids.join(),
      },
    });
    let results = [];

    res.data.audio_features.forEach((trackFeatures) => {
      if (!trackFeatures) {
        return null;
      }
      let result = {};
      features.forEach((feature) => {
        if (feature === "popularity") {
          const correspondingTrack = tracks.find(
            (item) =>
              (item.track ? item.track.id : item.id) === trackFeatures.id
          );
          result[feature] = correspondingTrack.track
            ? correspondingTrack.track.popularity
            : correspondingTrack.popularity;
        } else if (
          trackFeatures &&
          Object.keys(trackFeatures).includes(feature)
        ) {
          result[feature] = trackFeatures[feature];
        }
      });
      results.push(result);
    });
    return results;
  }
}

export default Api;
