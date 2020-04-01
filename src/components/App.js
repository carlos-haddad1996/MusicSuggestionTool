import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import LoginScreen from '../components/containers/loginScreen';
import '../styles/App.css';

export const history = createBrowserHistory();

class App extends Component {
    render() {
        return (
            <div className="App wrapped-container bg-dark text-white">
                <LoginScreen />
            </div>
        );
    }
}

export default App;
