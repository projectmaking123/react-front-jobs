import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  render() {
    const { handleLogin, handleLogOut, handleSignUp, handleConfirm, handleEmail, handlePassword, email, password, confirm } = this.props
    return (
      <div className="container">
			<div className="row main">
				<div className="panel-heading">
				<div className="main-login main-center">
					<form className="form-horizontal" onSubmit={handleSignUp}>

						<div className="form-group">
							<label className="cols-sm-2 control-label">Your Email</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="text"
                          onChange={handleEmail}
                          value={email}
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
                          onChange={handlePassword}
                          value={password}
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
                          onChange={handleConfirm}
                          value={confirm}
                          className="form-control"
                          id="password"
                          placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

						<div className="form-group ">
							<button type="submit" className="btn btn-primary btn-lg btn-block login-button">Register</button>
						</div>
					</form>

          <form className="form-horizontal" onSubmit={handleLogin}>

						<div className="form-group">
							<label className="cols-sm-2 control-label">Your Email</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="text"
                          onChange={handleEmail}
                          value={email}
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
                          onChange={handlePassword}
                          value={password}
                          className="form-control"
                          id="password"
                          placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

						<div className="form-group ">
							<button type="submit" className="btn btn-primary btn-lg btn-block login-button">Login</button>
						</div>
					</form>

          <form onSubmit={handleLogOut}>
            <input
              type="submit"
              value="Log Out"
              className="btn btn-primary btn-lg btn-block login-button"
              />
          </form>

          </div>
				</div>
			</div>
		</div>
    )
  }
}

export default Login;
