import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"; import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import './App.css';
import Products from './components/Products.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import Order from './components/Order.jsx'
import Header from './components/Header.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["Phones", "Electronics", "Home", "PC", "Clothes"],
      products: [],
      cartItems: 0
    };
    this.hrefToSc = this.hrefToSc.bind(this);
  };



  hrefToSc() {
    window.location = '/sc'
  }

  render() {
    return (
      <div className="container-fluid">
       <Header/>
        <div className="row">
          <div className="col col-lg-2">
            <CategoriesList categories={this.state.categories} />
          </div>
          <div className="col">
            <Router>
              <div>
                <hr />
                <Switch>
                  <Route exact path="/all">
                    <Products category={"all"} />
                  </Route>
                  <Route path="/Phones">
                    <Products category={"Phones"} />
                  </Route>
                  <Route path="/Electronics">
                    <Products category={"Electronics"} />
                  </Route>
                  <Route path="/Home">
                    <Products category={"Home"} />
                  </Route>
                  <Route path="/PC">
                    <Products category={"PC"} />
                  </Route>
                  <Route path="/Clothes">
                    <Products category={"Clothes"} />
                  </Route>
                  <Route path="/sc">
                    <ShoppingCart />
                  </Route>
                  <Route path="/order">
                    <Order />
                  </Route>
                </Switch>
              </div>
            </Router>
          </div>
        </div>
        <div className="modal fade" id="exampleModal-r" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Register form</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Register />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="exampleModal-l" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Register form</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Login />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

class CategoriesList extends React.Component {
  render() {
    const categories = this.props.categories.map((category) =>
      <Category key={category.id} category={category} />
    );
    return (
      <div>
        <ul className="nav flex-column">
          {categories}
        </ul>
      </div>
    )
  }
}


class Category extends React.Component {
  render() {
    const cat = "/" + this.props.category;
    return (
      <li className="nav-item">
        <a className="nav-link" href={cat}>{this.props.category}</a>
      </li>
    )
  }

}


export default App;
