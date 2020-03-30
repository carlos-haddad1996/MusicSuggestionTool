import React, { Component } from 'react';
import '../App.css';
import { createBrowserHistory } from 'history';
import LoginScreen from '../components/containers/loginScreen';

export const history = createBrowserHistory();

class App extends Component {
    render() {
        return (
            <div className="App">
                <LoginScreen />
            </div>
        );
    }
}

export default App;
