import React, { useEffect, useState } from 'react';
import './playlist.css';

const PlaylistScreen = ({ spotifyApi, items }) => {
    const [playlists, setPlaylists] = useState({});
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        getPlaylists();
    }, []);

    const getPlaylists = id => {
        spotifyApi.getCategoryPlaylists(id).then(response => {
            setDisplay(true);
            setPlaylists(response.playlists.items);
        });
    };

    const GetGenreItems = () => {
        return (
            <div className="container">
                Please select your desired Genre
                <div className="row">
                    {Object.values(items).map(item => {
                        return (
                            <div
                                key={item.id}
                                className="col-md button-padding"
                            >
                                <button
                                    onClick={() => getPlaylists(item.id)}
                                    className="btn btn-success"
                                >
                                    {item.id}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const DisplayPlaylists = () => {
        return (
            <>
                Playlists:
                <div className="row">
                    {Object.values(playlists).map(item => {
                        return (
                            <div
                                key={item.id}
                                className="col-md-6 card-size card-padding"
                            >
                                <div className="card">
                                    <a href={item.external_urls.spotify}>
                                        <img
                                            alt="name"
                                            src={item.images[0].url}
                                        />
                                    </a>
                                </div>
                                <div className="card body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    return (
        <div className="container">
            <div>
                <GetGenreItems />
            </div>
            {display ? <DisplayPlaylists /> : null}
        </div>
    );
};

export default PlaylistScreen;
