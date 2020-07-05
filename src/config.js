export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "03448805c58d4c5ba555ea203c8ce771";
//export const redirectUri = "http://nicholas-lin.github.io/vibe/";
export const redirectUri = "http://localhost:3000/";
export const scopes = ["playlist-read-private", "user-top-read"];
export const loginURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
