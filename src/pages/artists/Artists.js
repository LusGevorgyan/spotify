import React from 'react';
import {useNavigate} from 'react-router-dom';
import "./style/artistsStyle.css"

function  Artists({artists}) {
    const navigate = useNavigate();
    console.log(navigate)

    return (
      <>
        <div className="container">
          {artists.map((artist) => {
            return (
              <div
                className="artist_list"
                key={artist.id}
              >
                <div>
                  <div>
                    <img
                      className="artist_images"
                      onClick={() => {
                        navigate(`/albums/${artist.id}`);
                      }}
                      src={artist?.images[0]?.url}
                    />
                  </div>
                  <div>
                    <p className="artist_name">{artist.name}</p>
                    <p className="artist_type">{artist.type}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
}

export default Artists;