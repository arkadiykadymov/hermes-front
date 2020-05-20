import React from 'react';
import axios from 'axios';

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: ["Lol"],
        };
        this.loadCategoriesFromServer = this.loadCategoriesFromServer.bind(this);
    };

    componentDidMount() {
        this.loadCategoriesFromServer();
    }

    loadCategoriesFromServer() {
        axios.get('http://localhost:8000/api/categories/all')
            .then((response) => {
                this.setState({
                    categories: response.data.response
                });
                console.log(response);

            })

    }

    render() {
        return (
            <div>
                <CategoriesList categories={this.state.categories} />
            </div>
        )
    }
}


class CategoriesList extends React.Component {
    render() {
        const categories = this.props.categories.map((category) =>
            <Category key={category.id} category={category} />
        );
        return (
            <div>
                <ul class="nav flex-column">
                    {categories}
                </ul>
            </div>
        )
    }
}


class Category extends React.Component {
    render() {
        console.log(this.props)
        return (
            <li class="nav-item">
                <a class="nav-link" href="#">{this.props.category.name}</a>
            </li>
        )
    }

}