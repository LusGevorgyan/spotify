import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import Artists from "../artists/Artists";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;

function Login() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  const CLIENT_ID = "9be945cec7e249e4b8fe47ede854d077";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    setArtists(data.artists.items);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
                <Container>
                  <img
                      src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
                      alt="spotify"
                  />
                  <button className="login_button">
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                      Login to Spotify
                    </a>
                  </button>
                </Container>
        ) : (
            <Link to="/">
              <button className="logout_button" onClick={logout}>
                Log Out
              </button>
            </Link>
        )}

        {token ? (
          <form className="search_form" onSubmit={searchArtists}>
            <input
              placeholder="Who do you want to listen to?"
              className="search"
              type="text"
              onChange={(event) => setSearchKey(event.target.value)}
            />
            <button className="search_button" type={"submit"}>
              Search
            </button>
          </form>
        ) : (
          <h2 className="" style={{ display: "none" }}>
            Please login{" "}
          </h2>
        )}
        <Artists artists={artists} />
      </header>
    </div>
  );
}

export default Login;
