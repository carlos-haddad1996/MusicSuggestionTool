import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistScreen from './playlistScreen';

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
        this.getPlaylists();
    }

    getSpotifyCategories() {
        spotifyApi.getCategories().then(response => {
            this.setState({
                items: response.categories.items
            });
        });
    }

    getPlaylists() {
        spotifyApi.getCategoryPlaylists('pop').then(response => {
            this.setState({
                playlists: response.playlists.items
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
            <div>
                {loggedIn ? (
                    <PlaylistScreen playlists={playlists} items={items} />
                ) : (
                    <a href="http://localhost:8888">
                        <button className="btn btn-primary">
                            Login To Spotify
                        </button>
                    </a>
                )}
            </div>
        );
    }
}

export default LoginScreen;
