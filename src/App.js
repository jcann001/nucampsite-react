import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Main from './components/MainComponent';
import './App.css';
import Directory from './components/DirectoryComponent';
import { CAMPSITES } from './shared/campsites';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }
    render() {
        return (
            <BrowserRouter>
            <div className="App">
                <Main />
            </div>
            </BrowserRouter>
        );
    }
}

export default App;