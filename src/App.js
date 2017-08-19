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
      index: null,
      currentUser: null,
      searchTerm: '',
      showIndex: true,
      currentPage: 0
    }
    this.handleJobList = this.handleJobList.bind(this);
    this.signOut = this.signOut.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((currentUser) => {
      this.setState({currentUser});
    });
    this.handleJobList();
  }

  searchFilter = event => {
    this.setState({
      searchTerm: event.target.value,
      showIndex: false
    })
  }

  signOut() {
    auth.signOut()
    this.setState({currentUser: null})
  }

  handleJobList(){
    axios.get('https://jason-jobs-bacon.herokuapp.com/api/v1/jobs').then(response => {
      this.setState({
        data: response.data.data,
        index: response.data.data
       })
    }).catch(function (error) {
      console.log(error);
    });
  }

  nextPage(){
    this.setState({currentPage: this.state.currentPage + 5})
  }

  previousPage(){
    this.setState({currentPage: this.state.currentPage - 5})
  }

  render() {
    const { data, currentUser, searchTerm, showIndex, index, currentPage } = this.state
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
              <h1 id="intro">Current Oppurtunities</h1>
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.searchFilter}
                        value={this.state.searchTerm}
                        placeholder={"SEARCH JOBS BY TITLE, FIELD OR SKILL"}
                        style={{textAlign: 'center'}}
                        />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          }
        </div>
        <div>
          {
            (showIndex && index) &&
            index
            .slice(currentPage, currentPage + 5)
            .map(job =>
              <JobItem
                key={job.id}
                job={job}
                currentUser={currentUser}
                handleJobList={this.handleJobList}
                />
            )
          }
          <div style={{textAlign: 'center', backgroundColor: 'lightblue'}}>
            {
              (currentPage > 0) &&
              <button className="page-button" onClick={this.previousPage}><i style={{fontSize: '20px'}} className="glyphicon glyphicon-chevron-left"></i></button>
            }
            {
              (index && (currentPage < index.length - 5)) &&
              <button className="page-button" onClick={this.nextPage}><i style={{fontSize: '20px'}} className="glyphicon glyphicon-chevron-right"></i></button>
            }
          </div>
        </div>
      <div>
        {
          (searchTerm !== '') &&
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
    );
  }
}

export default App;
