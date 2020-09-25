import React, { Component } from "react";

import axios from "axios";
import Success from './Success';
import Error from './Error';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            category_name: '',
            alert_message: ''
        };
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/category/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({ category_name: response.data.name });
            })
            .catch(function(error) {
                console.log(error);
            });
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
            .put(
                "http://127.0.0.1:8000/api/category/update/"
                +this.props.match.params.id, category
        ).then(res => {
                this.setState({ alert_message: "success" });
        }).catch(error => {
                this.setState({ alert_message: "error" });
            })
    }

    render() {
        return (
            <div className="container">
                <hr />
                {this.state.alert_message == "success" ? (
                    <Success message={"Category Updated Succesfully"} />
                ) : null}
                {this.state.alert_message == "error" ? (
                    <Error message={"Whoops! Couldn't Update Category"} />
                ) : null}

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="category_name">Category Name</label>
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
                        Edit Category
                    </button>
                </form>
            </div>
        );
    }
}

export default Edit;
