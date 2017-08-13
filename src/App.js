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
      data: null
    }
    this.handleJobList = this.handleJobList.bind(this);
    this.handleDeleteJob = this.handleDeleteJob.bind(this);
  }


  componentDidMount(){
    this.handleJobList();
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

  render() {
    return (
      <div>
        <header className="masthead">
          <div className="container">
            <div className="intro-text">
              <div className="intro-lead-in">Welcome To Jobs Listings</div>
              <div className="intro-heading">It's Nice To Meet You</div>
              <Login />
            </div>
          </div>
        </header>
    <section className="bg-light" id="portfolio">
      <div className="row">
        <div className="col-lg-12 text-center">
          {
            this.state.data && this.state.data.map((job, key) =>
            <JobItem key={key} job={job} handleDeleteJob={this.handleDeleteJob}/>
          )
        }
        </div>
      </div>
    </section>
    <CreateJob handleJob={this.handleJobList}/>
    </div>
    );
  }
}

export default App;
