import React, { Component } from 'react';
import axios from 'axios';
import { DropdownButton } from 'react-bootstrap';


class CreateJob extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: "title",
      field: "field",
      key_skill: "skill",
      description: "description",
      contact: "contact",
      location: 'location'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleField = this.handleField.bind(this);
    this.handleSkill = this.handleSkill.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleContact = this.handleContact.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
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
    event.preventDefault();
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
  handleOptionChange(event) {
    this.setState({
      field: event.target.value
    });
  }

  render() {
    const { title, field, description, contact, location } = this.state
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
                      <input type="text" className="form-control" value={location} onChange={this.handleLocation}
                        onClick={() => this.setState({location: ''})}/>
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" value={contact} onChange={this.handleContact}
                        onClick={() => this.setState({contact: ''})}/>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <textarea className="form-control" id="message" type="text" value={description} onChange={this.handleDescription}
                        onClick={() => this.setState({description: ''})}/>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="clearfix"></div>

                <div className="row">
                  <fieldset className="form-group">
                    <legend>Fields</legend>
                    <table className="table">
                      <tbody>
                        <tr>
                          <td className="form-check col-6">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1"
                                value="Technology"
                                onChange={this.handleOptionChange}
                                checked={field === 'Technology'}
                                />
                              Technology
                            </label>
                          </td>
                          <td className="form-check col-6">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2"
                                value="Business"
                                onChange={this.handleOptionChange}
                                checked={field === 'Business'}
                                />
                              Business
                            </label>
                          </td>
                          <td className="form-check col-6">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2"
                                value="Science"
                                onChange={this.handleOptionChange}
                                checked={field === 'Science'}
                                />
                              Science
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td className="form-check col-6">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1"
                                value="Education"
                                onChange={this.handleOptionChange}
                                checked={field === 'Education'}
                                />
                              Education
                            </label>
                          </td>
                          <td className="form-check col-6">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2"
                                value="Medicine"
                                onChange={this.handleOptionChange}
                                checked={field === 'Medicine'}
                                />
                              Medicine
                            </label>
                          </td>
                          <td className="form-check col-6">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2"
                                value="Entertainment"
                                onChange={this.handleOptionChange}
                                checked={field === 'Entertainment'}
                                />
                              Entertainment
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </div>

                <DropdownButton title="Skills" id="dropButtonMenu">
                  <button onClick={this.handleSkill} value="Math" className="drop-down btn btn-info">Math</button>
                  <button onClick={this.handleSkill} value="English" className="drop-down btn btn-info">English</button>
                  <button onClick={this.handleSkill} value="Developer" className="drop-down btn btn-info">Developer</button>
                  <button onClick={this.handleSkill} value="Fitness" className="drop-down btn btn-info">Fitness</button>
                </DropdownButton>

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
