import axios from "axios";
const baseUrl = "https://api.spotify.com";

class Api {
  static getArtistsAlbums(id, token) {
    return axios.get(`${baseUrl}/v1/artists/${id}/albums`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getAlbumTracks(id, token) {
    return axios.get(`${baseUrl}/v1/albums/${id}/tracks`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default Api;
