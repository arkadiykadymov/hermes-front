import React from 'react';
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
        var filepath = "http://localhost:8000/img/" + this.props.product.filename;
        return (
            <div>
                <div class="card">
                    <img src={filepath} class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">{this.props.product.name}</h5>
                        <p class="card-text">{this.props.product.description}</p>
                        <p class="card-text">{this.props.product.storageCount}</p>
                        <p class="card-text">{this.props.product.price} $</p>

                        <a href="#" class="btn btn-primary">Купить</a>
                    </div>
                </div>
            </div>
        )
    }
}