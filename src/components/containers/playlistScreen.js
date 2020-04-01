import React, { useEffect, useState } from 'react';
import '../../styles/playlist.css';

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
            <div className="column">
                {Object.values(items).map(item => {
                    return (
                        <div key={item.id} className="c">
                            <button
                                data-toggle="collapse"
                                data-target="#playlists"
                                onClick={() => getPlaylists(item.id)}
                                className="btn btn-success rounded-pill playlist-button shadow p-3 mb-3"
                            >
                                {item.name}
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    };

    const DisplayPlaylists = () => {
        return (
            <>
                <div className="row row-cols-1 row-cols-md-3" id="playlists">
                    {playlists.length !== 0 ? (
                        Object.values(playlists).map(item => {
                            return (
                                <div
                                    key={item.id}
                                    className="col mb-4 card-padding"
                                >
                                    <div className="card text-white card-background">
                                        <div className="card-img-top">
                                            <img
                                                alt="name"
                                                src={item.images[0].url}
                                            />
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                {item.name}
                                            </h3>
                                            <p className="card-text flex-wrap">
                                                {item.description}
                                            </p>
                                            <a
                                                href={
                                                    item.external_urls.spotify
                                                }
                                            >
                                                <button className="btn btn-success rounded-pill">
                                                    Time to listen!
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="container">
                            <h2>Sorry no playlist available for this genre</h2>
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <div>
            <div className="d-flex align-items-start">
                <h2>Let's see what you're up for today</h2>
            </div>
            <div className="row">
                <div className="genre-container">
                    <div className="col">
                        <GetGenreItems />
                    </div>
                </div>
                <div className="col">
                    {display ? <DisplayPlaylists /> : null}
                </div>
            </div>
        </div>
    );
};

export default PlaylistScreen;
