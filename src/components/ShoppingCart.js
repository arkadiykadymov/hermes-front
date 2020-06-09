import React, { Component } from 'react';
import axios from 'axios';
const api_url = 'http://localhost:8000/api';



export default class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
        this.handleShoppingCart = this.handleShoppingCart.bind(this);
    };


    componentDidMount() {
        this.handleShoppingCart();
    }

    handleShoppingCart() {
        axios.get(api_url + '/shoppingcart/getCart', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }).then((response) => {
            this.setState({
                products: response.data.response
            })
        })
    }

    render() {
        return (
            <div>
                <p>Your shopping cart</p>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Storage count</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Del.</th>
                        </tr>
                    </thead>
                    <ProductTable products={this.state.products} />
                </table>
                <hr />
                <p>Total: </p>
            </div>
        )
    }



}

class ProductTable extends React.Component {
    render() {
        console.log(this.props)
        const products = this.props.products.map((product) =>
            <Product product={product.product} quantity={product.quantity} />
        );
        return (
            <tbody>
                {products}
            </tbody>
        )
    }

}

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.deleteProductFromShoppingCart = this.deleteProductFromShoppingCart.bind(this);
    };

    deleteProductFromShoppingCart() {
        axios.get(api_url + "/shoppingcart/deleteProductFromCart/" + this.props.product.name,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }).then((response) => {
                console.log(response);
            })
    }

    render() {

        var filepath = "http://localhost:8000/img/" + this.props.product.filename;
        return (
            <tr>
                <td></td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.description}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.storageCount}</td>
                <td>{this.props.quantity}</td>
                <td><ion-icon name="close-outline" onClick={this.deleteProductFromShoppingCart}></ion-icon></td>
            </tr>
        )
    }
}