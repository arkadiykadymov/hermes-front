import React from 'react';
import axios from 'axios';
const api_url = 'http://localhost:8000/api';

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
        axios.get(api_url + '/products/all')
            .then((response) => {
                console.log("productsResponce", response);

                this.setState({
                    products: response.data.response
                });
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
            <Product product={product} />
        );
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
    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
    };
    deleteProduct() {
        console.log(this)
        axios.delete(api_url + '/delete/' + this.props.product.name)
        .then((responce) => {
            console.log(responce);
        })
    }
    render() {
        var filepath = "http://localhost:8000/img/" + this.props.product.filename;
        return (
            <div>
                <div class="card my-3" style={{ "width": "18rem" }}>
                    <img src={filepath} class="card-img" style={{ 'max-hight': '100px', 'max-width': '100px' }} />
                    <div class="card-body">
                        <h5 class="card-title">{this.props.product.name}</h5>
                        <hr />
                        <p class="card-text">{this.props.product.description}</p>
                        <hr />
                        <p class="card-text">Price - {this.props.product.price} $</p>
                        <p class="card-text"><small class="text-muted">Storage counter - {this.props.product.storageCount}</small></p>
                        <button class="btn btn-warning" style={{"margin-right" : "10px"}}>Add to cart</button>
                        {localStorage.getItem("isAdmin") ? (
                            <button class="btn btn-error" onClick={this.deleteProduct}>Delete product</button>
                        ) : (<div></div>)}
                    </div>
                </div>
            </div>
        )
    }
}