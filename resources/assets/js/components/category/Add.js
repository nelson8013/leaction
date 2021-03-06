import React, { Component } from "react";

import axios from "axios";
import Success from "./Success";
import Error from "./Error";

class Add extends Component {
    constructor() {
        super();
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            category_name: "",
            alert_message: ""
        };
    }

    onChangeCategoryName(e) {
        this.setState({
            category_name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const category = {
            category_name: this.state.category_name
        };

        axios
            .post("http://127.0.0.1:8000/api/category/store", category)
            .then(res => {
                this.setState({ alert_message: "success"});
            }).catch(error => {
                this.setState({alert_message: "error"});
            });
    }

    render() {
        return (
            <div className="container">
                {this.state.alert_message == "success" ? (
                    <Success message={"Category Added Successfully"} />
                ) : null}
                {this.state.alert_message == "error" ? (
                    <Error message={"Whoops! Couldn't Add Category"} />
                ) : null}

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="category_name">Category Name</label>
                        <input
                            type="input"
                            className="form-control"
                            id="category_name"
                            placeholder="E.g Entertainment"
                            value={this.state.category_name}
                            onChange={this.onChangeCategoryName}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Add Category
                    </button>
                </form>
            </div>
        );
    }
}

export default Add;
