import React, { Component } from 'react';
import axios from 'axios';
import map from 'lodash/map'
import './App.css';
import './css/agency.css'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      value: '',
      data: null,
      title: "title",
      field: "field",
      key_skill: "skill",
      description: "description"
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleField = this.handleField.bind(this);
    this.handleSkill = this.handleSkill.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleJobList = this.handleJobList.bind(this);
    this.handleDeleteJob = this.handleDeleteJob.bind(this);
  }


  componentDidMount(){
    this.handleJobList();
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

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleTitle(event) {
    this.setState({title: event.target.value});
  }
  handleField(event) {
    this.setState({field: event.target.value});
  }
  handleSkill(event) {
    this.setState({key_skill: event.target.value});
  }
  handleDescription(event) {
    this.setState({description: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault()
    axios.post('https://jason-jobs-bacon.herokuapp.com/api/v1/jobs', {
      title: this.state.title,
      field: this.state.field,
      key_skill: this.state.key_skill,
      description: this.state.description
    })
    .then( () => {
      this.handleJobList();
      }
    )
    .catch(function (error) {
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
              <a href="#services" className="btn btn-xl">Tell Me More</a>
            </div>
          </div>
        </header>

        <section id="services">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading">Services</h2>
            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-4">
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x text-primary"></i>
              <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
            </span>
            <h4 className="service-heading">E-Commerce</h4>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
          </div>
          <div className="col-md-4">
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x text-primary"></i>
              <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
            </span>
            <h4 className="service-heading">Responsive Design</h4>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
          </div>
          <div className="col-md-4">
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x text-primary"></i>
              <i className="fa fa-lock fa-stack-1x fa-inverse"></i>
            </span>
            <h4 className="service-heading">Web Security</h4>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-light" id="portfolio">
      <div className="row">
        <div className="col-lg-12 text-center">
          {
            this.state.data && map(this.state.data, (job, key) =>
            <div key={key}>
              <ul className="col-lg-12 text-center">
                <h2>ID:</h2><li className="section-subheading text-muted">{job.id}</li>
                <h2>Title:</h2><li className="section-subheading text-muted">{job.title}</li>
                <h2>Field:</h2><li className="section-subheading text-muted">{job.field}</li>
                <h2>Skill:</h2><li className="section-subheading text-muted">{job.key_skill}</li>
                <h2>Description:</h2><li className="section-subheading text-muted">{job.description}</li>
              </ul>
              <button className="btn btn-danger" value={job.id} onClick={this.handleDeleteJob}>
                Delete
              </button>
            </div>
          )
        }
      </div>
    </div>
      </section>
        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">Boost the Economy!</h2>
                <h3 className="section-subheading text-muted">Get connected with local talent</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <form id="contactForm" name="sentMessage" novalidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitle}
                          onClick={() => this.setState({title: ''})}/>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" value={this.state.field} onChange={this.handleField}
                          onClick={() => this.setState({field: ''})}/>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <input className="form-control" type="text" value={this.state.key_skill} onChange={this.handleSkill}
                          onClick={() => this.setState({skill: ''})}/>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <textarea className="form-control" id="message" type="text" value={this.state.description} onChange={this.handleDescription}
                          onClick={() => this.setState({description: ''})}/>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-lg-12 text-center">
                      <div id="success"></div>
                      <button className="btn btn-xl" type="submit">Create Job Post</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
    </div>
    );
  }
}

export default App;
