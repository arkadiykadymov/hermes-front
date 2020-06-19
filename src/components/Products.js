import React from 'react';
import axios from 'axios';
const api_url = 'http://localhost:8000/api/v1';



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
        axios.get(api_url + '/products/' + this.props.category)
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
            <Product key={product.id} product={product}  />
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
            quantity: '',
            product:this.props.product
        }
        this.deleteProduct = this.deleteProduct.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
    };
    deleteProduct() {
        axios.get(api_url + '/products/delete/' + this.state.product.name)
            .then((responce) => {
                console.log(responce);
                window.location.reload();
            })
    }

    handleQuantity(e) {
        console.log(e.target.value)
        this.setState({ quantity: e.target.value });
    }


    componentDidMount() {
        this.setState({
            name: this.props.product.name,
            description: this.props.product.description,
            price: this.props.product.price,
            storageCount: this.props.product.storageCount,
        })
        console.log("IDDDD", this.state.product);
    }



    addToCart() {
        const data = new FormData();
        axios.post('http://localhost:8000/api/v1/shoppingcart/addProduct', {
            'name': this.state.product.name,
            'quantity': this.state.quantity
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }
        ).then((response) => {
            if (response.status === 200) {
                this.setState({
                    isAddedAlert: true
                });
            }
            window.location.reload();
        })
    }

    render() {
        var filepath = "http://localhost:8000/api/v1/img/" + this.props.product.filename;
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
                        <input type="number" id="quantity" name="quantity" min="1" onChange={this.handleQuantity} />
                        <p class="card-text"><small class="text-muted">Storage counter - {this.props.product.storageCount}</small></p>
                        <button type="button" class="btn btn-warning"style={{ "margin-right": "10px" }} onClick={this.addToCart}>Add to cart</button>
                        <div class="modal fade" id="addtocartModal" tabindex="-1" role="dialog" aria-labelledby="addtocartModalLabel" aria-hidden="true">
                        </div>
                        {localStorage.getItem("isAdmin") ? (
                            <button type="button" class="btn btn-primary" onClick={this.deleteProduct}>Delete product</button>
                        ) : (<div></div>)}
                    </div>
                </div>
                {(this.state.isAddedAlert) ? (<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Holy guacamole!</strong> Product was added to cart.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>) : (<div></div>)}
            </div>
        )
    }
}