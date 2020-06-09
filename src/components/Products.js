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
        this.state = {
            isAddedAlert: false,
        }
        this.deleteProduct = this.deleteProduct.bind(this);
        this.addToCart = this.addToCart.bind(this);
    };
    deleteProduct() {
        axios.get(api_url + '/products/delete/' + this.props.product.name)
            .then((responce) => {
                console.log(responce);
                window.location.reload();
            })
    }

    addToCart() {
        const data = new FormData();
        data.append('productName', this.props.product.name);
        axios.post('http://localhost:8000/api/shoppingcart/addProduct', { 'name': this.props.product.name }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }
        ).then((response) => {
            if (response.status == 200) {
                this.setState({
                    isAddedAlert: true
                })
            }

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
                        <button class="btn btn-warning" style={{ "margin-right": "10px" }} onClick={this.addToCart}>Add to cart</button>
                        {localStorage.getItem("isAdmin") ? (
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#deleteProd">Delete product</button>
                        ) : (<div></div>)}
                        <div class="modal fade" id="deleteProd" tabindex="-1" role="dialog" aria-labelledby="deleteProdLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="deleteProdLabel">Modal title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Delete product - {this.props.product.name}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" onClick={this.deleteProduct}>Yes</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(this.state.isAddedAlert) ? (<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>) : (<div></div>)}
            </div>
        )
    }
}