import React from 'react';
import axios from 'axios';

import AddProduct from './AddProduct.jsx'

const api_url = 'http://localhost:8000/api/v1';


export default class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          cartItems: 0
        };
    }

    async componentDidMount() {
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
        }).then((Response) => {
          console.log(Response);
          this.setState({
            cartItems: Response.data.response
          })
        })
      }

    render(){
        isAuthenticated.authenticate();
        return(
            <div className="row">
            <div className="col">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/all">Hermes</a>
                {localStorage.getItem("isAdmin") ? (<button type="button" className="navbar-nav" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add product</button>) : (<div></div>)}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" /></button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add product</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <AddProduct />
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                  </ul>
                  {isAuthenticated.isAuth ? (
                    <div>
                      Hello, {localStorage.getItem("username")}!
                      {localStorage.getItem("cartItems") > 0 ? (<div><ion-icon name="cart" size="large" onClick={this.hrefToSc} /><label>{this.state.cartItems}</label></div>) : (<div><ion-icon name="cart-outline" size="large" onClick={this.hrefToSc}></ion-icon><label>{this.state.cartItems}</label></div>)}
                      <i className="fas fa-sign-out-alt fa-lg" style={{ 'marginLeft': '20px' }} onClick={isAuthenticated.sighnout} />
                    </div>) :
                    (<div>
                      <div className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Account
                </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{ 'height': '100px', 'width': '50px' }}>
                          <div className="d-menu" style={{ 'height': '100px', 'width': '100px', 'textAlign': 'center', 'verticalAlign': 'middle' }}>
                            <h6>Welcome to online shop</h6>
                            <i className="fas fa-registered fa-2x" style={{ 'marginRight': '20px' }} data-toggle="modal" data-target="#exampleModal-r" />
                            <i className="fas fa-sign-in-alt fa-2x" data-toggle="modal" data-target="#exampleModal-l" />
                          </div>
                        </div>
                      </div>
                    </div>
                    )}
                </div>
              </nav>
            </div>
          </div>
        )
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