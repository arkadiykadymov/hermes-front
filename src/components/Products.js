import React, { Component } from 'react';
import axios from 'axios';


export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: ["2"],
        };
        this.loadProductsFromServer = this.loadProductsFromServer.bind(this);
    };

    componentDidMount() {
        this.loadProductsFromServer();
      }

    loadProductsFromServer() {
        axios.get('http://localhost:8000/api/products/all')
            .then((response) => {
                this.setState({
                    products: response.data.response
                });
                console.log(response);
            })

    }

    render() {
        return (
            <div>
                <ProductsList products={this.state.products} />
            </div>

        );
    }
}



class ProductsList extends React.Component {
    render() {
        const products = this.props.products.map((product) =>
            <Product key={product.id} product={product} />
        );
        console.log(this.props)
        return (
            <div>
                <ul class="card-columns">
                    {products}
                </ul>
            </div>
        )
    }

}

class Product extends React.Component {
    render() {
        return (
            <div>
                <div class="card">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/61fkdeyq5QL._SX466_.jpg" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">{this.props.product.name}</h5>
                        <p class="card-text">{this.props.product.description}</p>
                        <a href="#" class="btn btn-primary">Переход куда-нибудь</a>
                    </div>
                </div>
            </div>
        )
    }
}