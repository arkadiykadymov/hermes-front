import React from 'react';
import axios from 'axios';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.state = {
      email: '',
      password: '',
      fullName: '',
      userName: '',
      isRegistered: false,
    };
  }
  handleFullNameChange(e) {
    this.setState({ fullName: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
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
        'http://127.0.0.1:8000/api/v1/users/registration',
        {
          password: this.state.password,
          email: this.state.email,
          fullName: this.state.fullName,
          username: this.state.userName,
        },
        {
          'Content-Type': 'application/json',
        },
      )
      .then((response) => {
        console.log(response);
        if (response.data.response) {
          this.setState({ isRegistered: true });
        }
        this.render();
      });
  }

  render() {
    return (
      <div>
        {this.state.isRegistered ? (
          <div className="mmmm" tabindex="1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <p>Registration completed successfully.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
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
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={this.handleEmailChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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
          <div className="form-group">
            <label htmlFor="exampleInputName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Full Name"
              onChange={this.handleFullNameChange}
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
