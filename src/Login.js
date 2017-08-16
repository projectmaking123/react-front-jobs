import React, { Component } from 'react';
import { auth, googleAuthProvider } from './firebase'
import './Login.css';

class Login extends Component {
  render() {
    const { currentUser } = this.props
    return (
      <div className="container">
			<div className="row main">
				<div className="panel-heading">
          <div>
            {
              currentUser &&
              <button
                className="btn btn-primary btn-lg btn-block login-button"
                onClick={this.props.signOut}>
                Log Out
              </button>
            }
          </div>
          <div>
            {
              !currentUser &&
              <button
                className="btn btn-primary btn-lg btn-block login-button"
                onClick={() => auth.signInWithPopup(googleAuthProvider)}>
                Login with Google to view Jobs
              </button>
            }
          </div>
				</div>
			</div>
		</div>
    )
  }
}

export default Login;
