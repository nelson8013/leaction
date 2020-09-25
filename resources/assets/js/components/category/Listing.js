import React, { Component } from 'react';

import {Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import Success from "./Success";
import Error from "./Error";


class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
            alert_message: ""
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/category")
            .then(response => {
                this.setState({
                    categories: response.data.data,
                    activePage: response.data.current_page,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //this.setState({ categories: response.data });
         axios.get("http://127.0.0.1:8000/api/category?page=" + pageNumber).then(response => {
             this.setState({
                 categories: response.data.data,
                 activePage: response.data.current_page,
                 itemsCountPerPage: response.data.per_page,
                 totalItemsCount: response.data.total
             });
         });
        
    }

    onDelete(category_id) {
        axios
            .delete("http://127.0.0.1:8000/api/category/delete/" + category_id)
            .then(response => {
                let categories = this.state.categories;

                for (let i = 0; i < categories.length; i++)
                {
                    if (categories[i].id == category_id)
                    {
                        categories.splice(i, 1);
                        this.setState({ categories: categories });
                    }
                    
                }

                   
                this.setState({ alert_message: "success" })
              }).catch(error => {this.setState({ alert_message: "error" });
             })
            
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container">
                {this.state.alert_message == "success" ? (
                    <Success message={"Category Deleted Succesfully"} />
                ) : null}
                {this.state.alert_message == "error" ? (
                    <Error message={"Whoops! Couldn't Delete Category"} />
                ) : null}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map(category => {
                            return (
                                <tr key={category.id}>
                                    <th scope="row">{category.id}</th>
                                    <td>{category.name}</td>
                                    <td>
                                        {category.active == 1
                                            ? "Active"
                                            : "In-active"}
                                    </td>
                                    <td>{category.created_at}</td>
                                    <td>{category.updated_at}</td>
                                    <td>
                                        <Link
                                            to={`/category/edit/${category.id}`}
                                            className="btn btn-outline-info"
                                        >
                                            Edit
                                        </Link>{" "}
                                        &nbsp;
                                        <a
                                            href="#"
                                            onClick={this.onDelete.bind(
                                                this,
                                                category.id
                                            )}
                                            className="btn btn-outline-danger"
                                        >
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
        );
    }
}

export default Listing;
