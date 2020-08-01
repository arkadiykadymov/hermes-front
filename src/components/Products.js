import React from 'react';
import axios from 'axios';
const api_url = 'http://localhost:8000/api/v1';



export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: ["2"],
            size:20,
            totalPages: '',
            totalElements: ''
        };
        this.loadProductsFromServer = this.loadProductsFromServer.bind(this);
        this.loadProductsByPage =this.loadProductsByPage.bind(this);
        this.loadNexPage = this.loadNexPage.bind(this);
        this.loadPreviousPage = this.loadPreviousPage.bind(this);
    };

    componentDidMount() {
        this.loadProductsFromServer(1);
        let page = this.state.currPage + 1;
        this.setState({
            currPage: page
        });
        window.scrollTo(0, 0);
    }

    loadNexPage(){
        if(localStorage.getItem('currentPage') < this.state.totalPages) {
            let page = parseInt(localStorage.getItem('currentPage')) + 1;
            this.loadProductsFromServer(page)
        }
    }

    loadPreviousPage(){
        if(localStorage.getItem('currentPage') > 1) {
            let page = parseInt(localStorage.getItem('currentPage')) -1;
            this.loadProductsFromServer(page)
        }
    }

    loadProductsFromServer(page) {
        axios.get(api_url + '/products/' + this.props.category + '/' + page)
            .then((response) => {
                console.log("productsResponce", response);
                this.setState({
                    products: response.data.response.content,
                    totalPages: response.data.response.totalPages,
                    totalElements: response.data.response.totalElements,
                });
                localStorage.setItem('currentPage', response.data.response.pageable.pageNumber + 1);
                console.log('state', this.state);
                setTimeout(10);
                window.scrollTo(0, 0);
                this.render();
                this.render();
            })

    }


    loadProductsByPage(){
        console.log('Page')
    }

    render() {
        let numbers = []
        for (let i = 0; i < this.state.totalPages; i++) {
            numbers[i] = i+1;
        }
        const pages = numbers.map((number) =>
            <PageNumber number={number} loadProductsFromServer={this.loadProductsFromServer}/>
        );
        return (
            <div>
                <ProductsList products={this.state.products} />
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" aria-label="Previous" onClick={this.loadPreviousPage}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        {pages}
                        <li className="page-item">
                            <a className="page-link" aria-label="Next" onClick={this.loadNexPage}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

        );
    }
}



class PageNumber extends React.Component{
    constructor(props) {
        super(props);
        this.loadProductsFromServer=this.loadProductsFromServer.bind(this);
    }
    loadProductsFromServer(){
        this.props.loadProductsFromServer(this.props.number);
        this.render();
    }
    render() {
        return (
            <div>
                {this.props.number == localStorage.getItem('currentPage') ? (<li className="page-item active"><a className="page-link" onClick={this.loadProductsFromServer} >{this.props.number}</a></li>):(<li className="page-item"><a className="page-link" onClick={this.loadProductsFromServer}>{this.props.number}</a></li>)}
            </div>
        );
    }
}


class ProductsList extends React.Component {
    render() {
        const products = this.props.products.map((product) =>
            <Product key={product.id} product={product} />
        );
        return (
            <div>
                <ul className="card-columns">
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
            product: this.props.product
        }
        this.deleteProduct = this.deleteProduct.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
    };
    deleteProduct() {
        axios.get(api_url + '/products/delete/' + this.state.product.name)
            .then((response) => {
                window.location.reload();
            })
    }

    handleQuantity(e) {
        this.setState({ quantity: e.target.value });
    }


    componentDidMount() {
        this.setState({
            name: this.props.product.name,
            description: this.props.product.description,
            price: this.props.product.price,
            storageCount: this.props.product.storageCount,
        })
    }



    addToCart() {
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
                <div className="card my-3" style={{ "width": "18rem" }}>
                    <img src={filepath} className="card-img" style={{ 'max-hight': '100px', 'max-width': '100px' }} />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.product.name}</h5>
                        <hr />
                        <p className="card-text">{this.props.product.description}</p>
                        <hr />
                        <p className="card-text">Price - {this.props.product.price} $</p>
                        <input type="number" id="quantity" name="quantity" min="1" onChange={this.handleQuantity} />
                        <p className="card-text"><small className="text-muted">Storage counter - {this.props.product.storageCount}</small></p>
                        <button type="button" className="btn btn-warning" style={{ "margin-right": "10px" }} onClick={this.addToCart}>Add to cart</button>
                        <div className="modal fade" id="addtocartModal" tabindex="-1" role="dialog" aria-labelledby="addtocartModalLabel" aria-hidden="true">
                        </div>
                        {localStorage.getItem("isAdmin") ? (
                            <button type="button" className="btn btn-primary" onClick={this.deleteProduct}>Delete product</button>
                        ) : (<div></div>)}
                    </div>
                </div>
                {(this.state.isAddedAlert) ? (<div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Holy guacamole!</strong> Product was added to cart.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>) : (<div></div>)}
            </div>
        )
    }
}