import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import JobItem from './JobItem';
import CreateJob from './CreateJob';
import './App.css';
import './css/agency.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      data: null,
      currentUser: null,
      email: '',
      password: '',
      password_confirm: ''
    }
    this.handleJobList = this.handleJobList.bind(this);
    this.handleDeleteJob = this.handleDeleteJob.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }


  componentDidMount(){
    this.handleJobList();
  }

  handleLogin(event){
    event.preventDefault();
    axios.post('http://localhost:3000/api/v1/sessions', {
      email: this.state.email,
      password: this.state.password
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

  handleLogOut(event){
    event.preventDefault();
    const config = {
      headers: {
        'X-User-Email': this.state.email,
        'X-User-Token': this.state.currentUser.authentication_token
      }
    };
    axios.delete('http://localhost:3000/api/v1/sessions', config)
    .then(response => {
      console.log(response)
      this.setState({currentUser: null})
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

  handleJobList(){
    axios.get('https://jason-jobs-bacon.herokuapp.com/api/v1/jobs').then(response => {
      console.log(response.data.data);
      this.setState({ data: response.data.data })
    }).catch(function (error) {
      console.log(error);
    });
  }

  handleDeleteJob(event){
    event.preventDefault()
    axios.delete(`https://jason-jobs-bacon.herokuapp.com/api/v1/jobs/${parseInt(event.target.value, 10)}`)
    .then( () => {
      this.handleJobList();
      }
    ).catch(function (error) {
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
    const { data, currentUser, email, password, password_confirm, handleJobList, handleConfirm, handlePassword, handleDeleteJob
    } = this.state
    return (
      <div>
        <header className="masthead">
          <div className="container">
            <div className="intro-text">
              <div className="intro-lead-in">Welcome To Jobs Listings</div>
              <Login
                handleLogin={this.handleLogin}
                handleLogOut={this.handleLogOut}
                password={password}
                email={email}
                confirm={password_confirm}
                handleEmail={this.handleEmail}
                handlePassword={this.handlePassword}
                handleConfirm={this.handleConfirm}
                />
            </div>
          </div>
        </header>
        <div>
          {
            currentUser &&
            <h1>It's Nice To Meet You {currentUser.email}</h1>
          }
        </div>
    <section className="bg-light" id="portfolio">
      <div className="row">
        <div className="col-lg-12 text-center">
          {
            data && data.map((job, key) =>
            <JobItem key={key} job={job} handleDeleteJob={this.handleDeleteJob}/>
          )
        }
        </div>
      </div>
    </section>
    <CreateJob
      handleJob={this.handleJobList}
      handleConfirm={this.handleConfirm}
      handleEmail={this.handleEmail}
      handlePassword={this.handlePassword}
      confirm={password_confirm}
      password={password}
      email={email}
      currentUser={currentUser}
      />
    </div>
    );
  }
}

export default App;
