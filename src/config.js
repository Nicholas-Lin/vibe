/**
 * File Name: config.js
 * Author: Nicholas Lin
 * Date: 7/11/20
 * Description: Sets up configuration for Spotify OAuth request
 */

export const authEndpoint = "https://accounts.spotify.com/authorize";

// Uses environment variables from .env in root directory
export const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const redirectUri = process.env.REACT_APP_REDIRECT_URI;

export const scopes = [
  "playlist-read-private",
  "user-top-read",
  "user-read-recently-played",
  "playlist-modify-private",
  "playlist-modify-public",
];
export const loginURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
