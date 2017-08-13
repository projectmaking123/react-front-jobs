import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      password_confirm: '',
      currentUser: null
    }

    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleLogin(event){
    event.preventDefault();
    axios.post('http://localhost:3000/api/v1/sessions', {
      email: this.state.email,
      password: this.state.password
    })
    .then(response => {
      this.setState({currentUser: response.data.data.user})
      }
    )
    .catch(function (error) {
      console.log(error);
    });
  }

  handleSignUp(event){
    event.preventDefault();
    axios.post('http://localhost:3000/api/v1/users', {
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirm: this.state.password_confirm
      }
    })
    .then(response => {
      console.log(response.data.data.user);
        this.setState({currentUser: response.data.data.user})
      }
    )
    .catch(function (error) {
      console.log(error);
    });
  }

  handleEmail(event) {
    this.setState({email: event.target.value})
  }

  handlePassword(event) {
    this.setState({password: event.target.value})
  }

  handleConfirm(event) {
    this.setState({password_confirm: event.target.value})
  }

  render() {
    return (
      <div className="container">
			<div className="row main">
				<div className="panel-heading">
				<div className="main-login main-center">
					<form className="form-horizontal" onSubmit={this.handleSignUp}>

						<div className="form-group">
							<label className="cols-sm-2 control-label">Your Email</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="text"
                          onChange={this.handleEmail}
                          value={this.state.email}
                          className="form-control"
                          id="email"
                          placeholder="Enter your Email"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label className="cols-sm-2 control-label">Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password"
                          onChange={this.handlePassword}
                          value={this.state.password}
                          className="form-control"
                          id="password"
                          placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

            <div className="form-group">
							<label className="cols-sm-2 control-label">Password Confirmation</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password"
                          onChange={this.handleConfirm}
                          value={this.state.Confirm}
                          className="form-control"
                          id="password"
                          placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

						<div className="form-group ">
							<button type="submit" className="btn btn-primary btn-lg btn-block login-button">Register</button>
						</div>
						   <div className="login-register">
				           <button >Login</button>
				       </div>
					</form>
          </div>
				</div>
			</div>
		</div>
    )
  }
}

export default Login;
