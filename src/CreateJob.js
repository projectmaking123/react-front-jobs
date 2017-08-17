import React, { Component } from 'react';
import axios from 'axios';


class CreateJob extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: "title",
      field: "field",
      key_skill: "skill",
      description: "description",
      contact: "contact",
      location: 'city'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleField = this.handleField.bind(this);
    this.handleSkill = this.handleSkill.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleContact = this.handleContact.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }

  handleSubmit(event){
    event.preventDefault()
    axios.post('https://jason-jobs-bacon.herokuapp.com/api/v1/jobs', {
      title: this.state.title,
      field: this.state.field,
      key_skill: this.state.key_skill,
      description: this.state.description,
      contact: this.state.contact,
      location: this.state.location,
      uid: this.props.currentUser.uid
    })
    .then(() => {
      this.props.handleJobList();
      }
    )
    .catch(function (error) {
      console.log(error);
    });
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
  handleLocation(event) {
    this.setState({location: event.target.value});
  }

  render() {
    const { title, field, key_skill, description, contact, location } = this.state
    return(
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
              <form id="contactForm" name="sentMessage" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" className="form-control" value={title} onChange={this.handleTitle}
                        onClick={() => this.setState({title: ''})}/>
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" value={field} onChange={this.handleField}
                        onClick={() => this.setState({field: ''})}/>
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="text" value={key_skill} onChange={this.handleSkill}
                        onClick={() => this.setState({key_skill: ''})}/>
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" value={location} onChange={this.handleLocation}
                        onClick={() => this.setState({location: ''})}/>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <textarea className="form-control" id="message" type="text" value={description} onChange={this.handleDescription}
                        onClick={() => this.setState({description: ''})}/>
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" value={contact} onChange={this.handleContact}
                        onClick={() => this.setState({contact: ''})}/>
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
    )
  }
}

export default CreateJob;
