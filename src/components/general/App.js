import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import '../../App.css';
import Button from '../general/buttons/buttons';
// import { Button } from 'bootstrap';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
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
            nowPlaying: { name: 'Not Checked', albumArt: '' }
        };
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
        return (
            <div className="App">
                <a href="http://localhost:8888">Login To Spotify</a>
                <div>Now Playing: {this.state.nowPlaying.name}</div>
                <div>
                    <img
                        alt="album art"
                        src={this.state.nowPlaying.albumArt}
                        style={{ height: 150 }}
                    />
                </div>
                <div>
                    {this.state.loggedIn ? (
                        <button onClick={() => this.getNowPlaying()}>
                            Check Now Playing
                        </button>
                    ) : (
                        <div>Not Logged In</div>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
