import React from 'react';
import axios from 'axios';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      password: '',
      userName: '',
    };
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleUserNameChange(e) {
    this.setState({ userName: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        'http://127.0.0.1:8000/api/v1/auth/login',
        {
          username: this.state.userName,
          password: this.state.password,
        },
        {
          'Content-Type': 'application/json',
        },
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem('username', response.data.response.username);
        localStorage.setItem('access_token', response.data.response.token);
        localStorage.setItem('isAdmin', response.data.response.isAdmin);
        localStorage.setItem('cartItems', response.data.response.cartItems);
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputUsername">Username</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputUsername"
              placeholder="Username"
              onChange={this.handleUserNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
