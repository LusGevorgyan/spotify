import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Api from "../../Api";
import Images from "../../images/logo.png";
import './style/albumStyles.css'

function Albums() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [ albums, setAlbums] = useState()
    let token = window.localStorage.getItem("token");

    useEffect(() => {
        Api.getArtistsAlbums(id, token)
            .then((res) => {
                setAlbums(res.data.items);

            })
            .catch((err) => {
                console.error(err);
            });
    },[])

    return (
        <>
            <div >
                <div className="container_albums">
                    <div className="">
                        <Link to="/">
                            <img  src={Images} alt=""/>
                        </Link>
                    </div>
                </div>

                <div className="albums_list">
                    {albums && albums.map(album => {
                        return(
                            <div
                                className="albums_list_forms"
                                key={album.id}
                            >
                                <div>
                                    <div>
                                        <img
                                            src={album?.images?.[1].url} alt=""
                                            onClick={() => {navigate(`/tracks/${album.id}?limit=50`)}}
                                        />
                                    </div>
                                    <div>
                                        <p>{album.name}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Albums;