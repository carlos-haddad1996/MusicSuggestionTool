import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistScreen from './playlistScreen';
import '../../styles/loginScreen.css';

const spotifyApi = new SpotifyWebApi();

class LoginScreen extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        console.log('params', params);
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: { name: 'Not Checked', albumArt: '' },
            items: {},
            playlists: {}
        };
    }

    componentWillMount() {
        this.getSpotifyCategories();
    }

    getSpotifyCategories() {
        spotifyApi.getCategories().then(response => {
            this.setState({
                items: response.categories.items
            });
        });
    }

    getHashParams() {
        var hashParams = {};
        var e,
            r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q);
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    getNowPlaying() {
        spotifyApi.getMyCurrentPlaybackState().then(response => {
            this.setState({
                nowPlaying: {
                    name: response.item.name,
                    albumArt: response.item.album.images[0].url
                }
            });
        });
    }

    render() {
        let { loggedIn, playlists, items } = this.state;
        return (
            <div className="position-relative">
                {!loggedIn ? (
                    <div className="column">
                        <div>
                            <h1>Login With Your Spotify Credentials</h1>
                        </div>
                        <div className="loggin-container">
                            <a href="http://localhost:8888">
                                <button className="btn btn-success rounded-pill button-size shadow p-3 mb-5">
                                    Login To Spotify
                                </button>
                            </a>
                        </div>
                    </div>
                ) : (
                    <PlaylistScreen spotifyApi={spotifyApi} items={items} />
                )}
            </div>
        );
    }
}

export default LoginScreen;
