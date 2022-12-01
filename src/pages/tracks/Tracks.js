import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Api from "../../Api";
import './styles/trackStyles.css';
import AudioPlayer from 'react-h5-audio-player';

function Tracks() {
    const {id} = useParams()
    const [tracks, setTracks] = useState()
    let token = window.localStorage.getItem("token");
    const [artistInfo, setArtistInfo] = useState()

    useEffect(() => {
        Api.getAlbumTracks(id, token)
            .then((res) => {
                setTracks(res.data.items);
                setArtistInfo(res.data.items?.[0].artists?.[0]);
                console.log(tracks, "artistInfo")
            })
            .catch((err) => {
                console.error(err);
            });
    }, [])

    return (
        <div className="">
            <div className="artist_info">
                <h1 className="artist_name">{artistInfo?.name}</h1>
                <img className="artist_images" src={artistInfo?.url}/>
                <div className="artist_type">{artistInfo?.type}</div>
            </div>

            <div className="track_forms">
                {tracks && tracks.map((track, key) => {
                    return (
                        <div key={track.id}>
                            <div className="track_list">
                                <div className="track_list_form">
                                    <div>{track?.track_number}</div>
                                    <div className="track_list_info">
                                        <div className="track_name"> {track?.name} </div>
                                        <div className="track_view"> {track?.duration_ms} </div>
                                    </div>
                                </div>

                                <div className="track_list_play">
                                    <AudioPlayer
                                        preload='metadata'
                                        src={track?.preview_url}
                                        onPlay={e => console.log("Play")}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Tracks;