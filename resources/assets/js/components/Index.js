import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import Header from './includes/Header';
import Footer from './includes/Footer';

import { BrowserRouter as Router} from "react-router-dom";
  

export default class Index extends Component {
    render() {
        return (
            <div>
                <Header />
                <Footer />
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Router><Index /></Router>, document.getElementById('app'));
}
