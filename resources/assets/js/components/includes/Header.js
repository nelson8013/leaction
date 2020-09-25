import React, { Component } from 'react';

import {Route, Switch, Link} from 'react-router-dom';
import Home     from '../Home';
import About    from '../About';
import Navbar   from './Navbar'
import Category from '../category/Index';
import ErrorPage from "../ErrorPage";

export default class Header extends Component {
    render() {
        return (
            <div>
                
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/category" component={Category} />
                        <Route exact path="/category/add" component={Category} />
                        <Route exact path="/category/edit/:id" component={Category} />
                        <Route exact path="/*" component={ErrorPage} />
                    </Switch>
                </div>
            </div>
        );
    }
}


