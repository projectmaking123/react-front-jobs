import React, { Component } from 'react';
import { auth } from './firebase';
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
      searchTerm: ''
    }
    this.handleJobList = this.handleJobList.bind(this);
    this.signOut = this.signOut.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((currentUser) => {
      this.setState({currentUser});
    });
    this.handleJobList();
  }

  searchFilter = event => {
    this.setState({searchTerm: event.target.value})
  }

  signOut() {
    auth.signOut()
    this.setState({currentUser: null})
  }

  handleJobList(){
    axios.get('https://jason-jobs-bacon.herokuapp.com/api/v1/jobs').then(response => {
      this.setState({ data: response.data.data })
    }).catch(function (error) {
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
    const { data, currentUser, searchTerm } = this.state
    return (
      <div>
        <header className="masthead">
          <div className="container">
            <div className="intro-text">
              <div className="intro-lead-in">Lets Bring Home Some Bacon!</div>
              <Login signOut={this.signOut} currentUser={currentUser}/>
            </div>
          </div>
        </header>
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
        <div>
          {
            currentUser &&
            <div>
              <h1 style={{textAlign: 'center'}}>It's Nice To Meet You {currentUser.displayName}</h1>
              <h1 style={{textAlign: 'center'}}>Good Luck in catching some piggies</h1>
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.searchFilter}
                        value={this.state.searchTerm}
                        placeholder={"SEARCH JOBS BY TITLE"}
                        style={{textAlign: 'center'}}
                        />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          }
        </div>
    <section className="bg-light" id="portfolio">
      <div className="row">
        <div className="col-lg-12 text-center">
          {
            data &&
            data
            .filter((job) => `${job.title} ${job.field} ${job.key_skill}`.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0)
            .map(job =>
              <JobItem
                key={job.id}
                job={job}
                currentUser={currentUser}
                handleJobList={this.handleJobList}
                />
          )
        }

        </div>
      </div>
    </section>
    </div>
    );
  }
}

export default App;
