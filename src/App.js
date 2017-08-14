import React, { Component } from 'react';
import { auth } from './firebase'
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
      currentUser: null
    }
    this.handleJobList = this.handleJobList.bind(this);
    this.handleDeleteJob = this.handleDeleteJob.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        this.setState({currentUser});
        this.handleJobList();
      }
    });
  }

  handleJobList(){
    axios.get('https://jason-jobs-bacon.herokuapp.com/api/v1/jobs').then(response => {
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
    const { data, currentUser, handleDeleteJob, handleJobList } = this.state
    return (
      <div>
        <header className="masthead">
          <div className="container">
            <div className="intro-text">
              <div className="intro-lead-in">Welcome To Jobs Listings</div>
              <Login />
            </div>
          </div>
        </header>
        <div>
          {
            currentUser &&
            <h1 style={{textAlign: 'center'}}>It's Nice To Meet You {currentUser.displayName}</h1>
          }
        </div>
    <section className="bg-light" id="portfolio">
      <div className="row">
        <div className="col-lg-12 text-center">
          {
            data && data.map((job, key) =>
            <JobItem
              key={key}
              job={job}
              currentUser={currentUser}
              handleJobList={handleJobList}
              handleDeleteJob={this.handleDeleteJob}/>
          )
        }
        </div>
      </div>
    </section>
    <div>
      {
        currentUser &&
        <CreateJob
          handleJobList={this.handleJobList}
          handleConfirm={this.handleConfirm}
          handleEmail={this.handleEmail}
          handlePassword={this.handlePassword}
          currentUser={currentUser}
          />
      }
    </div>
    </div>
    );
  }
}

export default App;
