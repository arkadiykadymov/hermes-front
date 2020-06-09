import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; import Register from './components/Register';
import Login from './components/Login';
import './App.css';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import ShoppingCart from './components/ShoppingCart';
import axios from 'axios';
const api_url = 'http://localhost:8000/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["Phones", "Electronics", "Home", "PC", "Clothes"],
      products: [""],
      cartItems: ''
    };
    this.hrefToSc = this.hrefToSc.bind(this);
    this.handleCartItemsCount = this.handleCartItemsCount.bind(this);
  };

  componentDidMount() {
    this.handleCartItemsCount();
  }
  handleCartItemsCount() {
    axios.get(api_url + '/shoppingcart/getCartItems', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }).then((Response) =>{
      console.log(Response);
      this.setState({
        cartItems: Response.data.response
      })
    })
  }

  hrefToSc() {
    window.location = '/sc'
  }

  render() {
    isAuthenticated.authenticate();
    return (
      <div className="container-fluid">
        <div class="row">
          <div class="col">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <a class="navbar-brand" href="/">Hermes</a>
              {localStorage.getItem("isAdmin") ? (<button type="button" class="navbar-nav" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add product</button>) : (<div></div>)}
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span></button>
              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Add product</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <AddProduct />
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                </ul>
                {isAuthenticated.isAuth ? (
                  <div>
                    Hello, {localStorage.getItem("username")}!
                    {localStorage.getItem("cartItems") > 0 ? (<div><ion-icon name="cart" size="large" onClick={this.hrefToSc}></ion-icon><label>{this.state.cartItems}</label></div>) : (<div><ion-icon name="cart-outline" size="large" onClick={this.hrefToSc}></ion-icon><label>{this.state.cartItems}</label></div>)}
                    <i class="fas fa-sign-out-alt fa-lg" style={{ 'margin-left': '20px' }} onClick={isAuthenticated.sighnout}></i>
                  </div>) :
                  (<div>
                    <div class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Account
              </a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{ 'height': '100px', 'width': '50px' }}>
                        <div class="d-menu" style={{ 'height': '100px', 'width': '100px', 'text-align': 'center', 'vertical-align': 'middle' }}>
                          <h6>Welcome to online shop</h6>
                          <i class="fas fa-registered fa-2x" style={{ 'margin-right': '20px' }} data-toggle="modal" data-target="#exampleModal-r"></i>
                          <i class="fas fa-sign-in-alt fa-2x" data-toggle="modal" data-target="#exampleModal-l"></i>
                          {/* <button style={{ 'margin-left': '20px', 'margin-right': '20px' }} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal-r">Register</button>
                          <button style={{ 'margin-left': '20px', 'margin-right': '20px' }} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal-l">Login</button> */}
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
          <div class="col col-lg-2">
            <CategoriesList categories={this.state.categories} />
          </div>
          <div class="col">
            <Router>
              <div>
                <hr />
                <Switch>
                  <Route exact path="/">
                    <Products />
                  </Route>
                  <Route path="/sc">
                    <ShoppingCart />
                  </Route>
                </Switch>
              </div>
            </Router>
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
      <Category category={category} />
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
    return (
      <li class="nav-item">
        <a class="nav-link" href="#">{this.props.category}</a>
      </li>
    )
  }

}


export default App;
