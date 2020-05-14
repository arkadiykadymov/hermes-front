import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

class App extends Component {
  render() {
    isAuthenticated.authenticate();
    console.log(isAuthenticated.isAuth);
    console.log(localStorage.getItem("access_token"));
    return (
      <div className="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            <img src="/home/daddy/dev/front/public/h.png" width="30" height="30" class="d-inline-block align-top" alt="" />
          Hermes
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
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
                      <h6>Welcome to HiBuy online shop</h6>
                      <button style={{ 'margin-left': '20px', 'margin-right': '20px' }} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal-r">Register</button>
                      <button style={{ 'margin-left': '20px', 'margin-right': '20px' }} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal-l">Login</button>
                    </div>
                  </div>
                </div>
              </div>
              )}
          </div>
        </nav>
        <div class="modal fade" id="exampleModal-r" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
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
          <div class="modal-dialog" role="document">
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

export default App;
