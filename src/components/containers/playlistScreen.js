import React, { Component } from 'react';
import './playlist.css';

class PlaylistScreen extends Component {
    render() {
        let { items, playlists = {} } = this.props;
        return (
            <div className="container">
                Playlists:
                <div className="row">
                    {Object.values(playlists).map(item => {
                        console.log(item);
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
            </div>
        );
    }
}

export default PlaylistScreen;
