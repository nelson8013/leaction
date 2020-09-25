import React, { Component } from 'react';

import ErrrorImg from './includes/404.jpg';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';



class ErrorPage extends Component {
    render() {
        return (
            <div>
                <Link to='/'>
                    <img
                        src={ErrrorImg}
                        style={{
                            height: "700px",
                            width: "100%",
                            margin: "0",
                            padding: "0"
                        }}
                        alt="error image"
                    />
                </Link>
            </div>
        );
    }
}

export default ErrorPage;
