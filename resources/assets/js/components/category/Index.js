import React, { Component } from 'react';


import { Link, Route } from "react-router-dom";
import Add from './Add';
import Edit from './Edit';
import Listing from './Listing';



class Index extends Component {
    render() {
        return (
            <div>
                <hr />
                <Link
                    to="/category"
                    className="btn btn-outline-primary btn-sm"
                >
                    {" "}
                    Listing{" "}
                </Link>{" "}
                &nbsp;
                <Link
                    to="/category/Add"
                    className="btn btn-outline-danger btn-sm"
                >
                    Add Listing{" "}
                </Link>
                <hr />
                <Route exact path="/category" component={Listing} />
                <Route exact path="/category/add" component={Add} />
                <Route exact path="/category/edit/:id" component={Edit} />
            </div>
        );
    }
}

export default Index;
