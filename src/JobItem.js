import React, { Component } from 'react';
import axios from 'axios';
import './JobItem.css'

class JobItem extends Component {
  constructor(props){
    super(props)

    this.state = {
      show: false,
      title: this.props.job.title,
      field: this.props.job.field,
      key_skill: this.props.job.key_skill,
      description: this.props.job.description,
      contact: this.props.job.contact
    }
    this.showForm = this.showForm.bind(this);
    this.handleUpdateJob = this.handleUpdateJob.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleField = this.handleField.bind(this);
    this.handleSkill = this.handleSkill.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleContact = this.handleContact.bind(this);
    this.handleDeleteJob = this.handleDeleteJob.bind(this);
  }

  handleUpdateJob(event){
    event.preventDefault()
    if (this.props.currentUser) {
      axios.patch(`https://jason-jobs-bacon.herokuapp.com/api/v1/jobs/${parseInt(this.props.job.id, 10)}`, {
        title: this.state.title,
        field: this.state.field,
        key_skill: this.state.key_skill,
        description: this.state.description,
        contact: this.state.contact,
        uid: this.props.currentUser.uid
      })
      .then( (res) => {
        this.setState({show: false})
      }
    ).catch(function (error) {
      console.log(error);
    });
    this.props.handleJobList();
    }
  }

  handleDeleteJob(){
    axios.delete(`https://jason-jobs-bacon.herokuapp.com/api/v1/jobs/${parseInt(this.props.job.id, 10)}`)
    .then( () => {
      this.setState({ show: false })
      this.props.handleJobList();
      }
    ).catch(function (error) {
      console.log(error);
    });
  }

  showForm() {
    this.setState({show: true})
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
  handleContact(event) {
    this.setState({contact: event.target.value});
  }

  render() {
    const { job, currentUser, handleUpdateJob } = this.props
    const { show, title, field, key_skill, description, contact } = this.state
    return(
      <div className="jobs">
        <div className="card list-container">
          <div className="card-block">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">Field: {field}</p>
            <p className="card-text">Skill: {key_skill}</p>
            <p className="card-text">Description: {description}</p>
            <p className="card-text">Contact: {contact}</p>
            <div>
            {
              (currentUser && (currentUser.uid == job.uid)) &&
              <div>
                <button className="btn btn-danger" onClick={this.handleDeleteJob}>
                  Delete
                </button>
                <button className="btn btn-info" onClick={this.showForm}>
                  Update
                </button>
              </div>
            }
            </div>
          </div>
        </div>

        <div>
          {
            show &&
            <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <div className="well well-sm">
                          <form className="form-horizontal" onSubmit={this.handleUpdateJob}>
                              <fieldset>
                                  <legend className="text-center header">Update</legend>
                                  <div className="form-group">
                                      <span className="col-md-1 col-md-offset-2 text-center"></span>
                                      <div className="col-md-8">
                                          <input id="fname" type="text" value={title} onChange={this.handleTitle} className="form-control" />
                                      </div>
                                  </div>
                                  <div className="form-group">
                                      <span className="col-md-1 col-md-offset-2 text-center"></span>
                                      <div className="col-md-8">
                                          <input id="lname" type="text" value={field} onChange={this.handleField} className="form-control" />
                                      </div>
                                  </div>

                                  <div className="form-group">
                                      <span className="col-md-1 col-md-offset-2 text-center"></span>
                                      <div className="col-md-8">
                                          <input id="email" type="text" value={key_skill} onChange={this.handleSkill} className="form-control" />
                                      </div>
                                  </div>

                                  <div className="form-group">
                                      <span className="col-md-1 col-md-offset-2 text-center"></span>
                                      <div className="col-md-8">
                                          <textarea className="form-control" id="message" name="message" onChange={this.handleDescription} value={description} rows="7"></textarea>
                                      </div>
                                  </div>

                                  <div className="form-group">
                                      <span className="col-md-1 col-md-offset-2 text-center"></span>
                                      <div className="col-md-8">
                                          <input id="email" type="text" value={contact} onChange={this.handleContact} className="form-control" />
                                      </div>
                                  </div>

                                  <div className="form-group">
                                      <div className="col-md-12 text-center">
                                          <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                                      </div>
                                  </div>
                              </fieldset>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          }
        </div>
      </div>
    )
  }
}

export default JobItem;
