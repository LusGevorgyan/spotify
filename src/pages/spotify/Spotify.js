import React, {useState} from 'react';
import Api from "../../Api";
import Artists from "../artists/Artists";
import Images from '../../images/logo.png'
import './styles/spotifyStyles.css'

const Spotify = () => {
    const [artist, setArtist] = useState()

    const getArtistAction = (artistName) => {
        Api.getArtist(artistName).then((res) => setArtist(res.data.artists.items))
    }
    return (
        <div className="nav">
            <div className="header">
                <div className="navbar">
                    <div className="icon">
                        <img src={Images} alt=""/>
                    </div>
                        <input
                            className="form-control"
                            onChange={(ev) => {
                                getArtistAction(ev.target.value)
                            }}
                            placeholder="What do you want to listen to?"
                            type="text"
                        />
                </div>
            </div>
                {artist ? <Artists artist={artist}/> : null}
        </div>
    )
}

export default Spotify;
