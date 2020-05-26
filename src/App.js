import React, { Component } from 'react';
// import { Navbar, Nav, NavItem, Button, Glyphicon } from 'react-bootstrap';
// import { BrowserRouter as Router, Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["Lol"],
      products: ["12"],
    };
    this.loadCategoriesFromServer = this.loadCategoriesFromServer.bind(this);
    this.loadProductsFromServer = this.loadProductsFromServer.bind(this);
  };

  componentDidMount() {
    this.loadProductsFromServer();
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
    isAuthenticated.authenticate();
    return (
      <div className="container-fluid">
        <div class="row">
          <div class="col">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <a class="navbar-brand" href="#">
                Hermes
          </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                </ul>
                {isAuthenticated.isAuth ? (
                  <div>
                    Hello, {localStorage.getItem("username")}
                    <button onClick={isAuthenticated.sighnout}>log out</button>
                  </div>) :
                  (<div>
                    <div class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Account
              </a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <div class="d-menu">
                          <h6>Welcome to online shop</h6>
                          <button style={{ 'margin-left': '20px', 'margin-right': '20px' }} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal-r">Register</button>
                          <button style={{ 'margin-left': '20px', 'margin-right': '20px' }} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal-l">Login</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
              </div>
            </nav>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <CategoriesList categories={this.state.categories} />
          </div>
          <div class="col">
            <ProductsList products={this.state.products} />
          </div>
        </div>
        <div class="modal fade" id="exampleModal-r" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Register form</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <Register />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="exampleModal-l" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Register form</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <Login />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const isAuthenticated = {
  isAuth: false,
  authenticate() {
    if (localStorage.getItem("access_token"))
      this.isAuth = true;

  },
  sighnout() {
    localStorage.clear();
    window.location.reload();
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


class ProductsList extends React.Component {
  render() {
    const products = this.props.products.map((product) =>
      <Product key={product.id} product={product} />
    );
    console.log(this.props)
    return (
      <div>
        <ul class="nav flex-column">
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
        <div class="card" style={{"width": "18rem"}}>
          <img src="..." class="card-img-top" alt="..." />
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
export default App;
