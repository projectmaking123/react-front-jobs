import React, { Component } from 'react';
import axios from 'axios';
import GMap from './GMap';
import './JobItem.css';

class JobItem extends Component {
  constructor(props){
    super(props)

    this.state = {
      jobShow: false,
      applied: 'inline',
      formShow: false,
      mapShow: false,
      title: this.props.job.title,
      field: this.props.job.field,
      key_skill: this.props.job.key_skill,
      description: this.props.job.description,
      contact: this.props.job.contact,
      location: this.props.job.location,
      creation: this.props.job.created_at,
      applicants: this.props.job.applicants,
      lat: null,
      lng: null
    }
    this.showForm = this.showForm.bind(this);
    this.handleUpdateJob = this.handleUpdateJob.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleField = this.handleField.bind(this);
    this.handleSkill = this.handleSkill.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleContact = this.handleContact.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleDeleteJob = this.handleDeleteJob.bind(this);
    this.handleGeoMapApi = this.handleGeoMapApi.bind(this);
    this.applyToJob = this.applyToJob.bind(this);
  }

  componentDidMount(){
    this.handleGeoMapApi();
  }

  applyToJob(){
    const { currentUser } = this.props
    this.setState({applied: 'none'})
    axios.post(`https://jason-jobs-bacon.herokuapp.com/api/v1/jobs/${this.props.job.id}/users`, {
      name: currentUser.displayName,
      email: currentUser.email,
      uid: currentUser.uid
    })
    .then(() => {
      this.props.handleJobList();
      }
    )
    .catch(function (error) {
      console.log(error);
    });
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
        location: this.state.location,
        uid: this.props.currentUser.uid
      })
      .then( (res) => {
        this.setState({formShow: false})
        this.props.handleJobList();
        this.handleGeoMapApi();
      }
    ).catch(function (error) {
      console.log(error);
    });
    }
  }

  handleGeoMapApi() {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.location}&sensor=true`)
    .then(response => {
      this.setState({
        lat: response.data.results[0].geometry.location.lat,
        lng: response.data.results[0].geometry.location.lng
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleDeleteJob(){
    axios.delete(`https://jason-jobs-bacon.herokuapp.com/api/v1/jobs/${parseInt(this.props.job.id, 10)}`)
    .then( () => {
      this.setState({ formShow: false })
      this.props.handleJobList();
      }
    ).catch(function (error) {
      console.log(error);
    });
  }

  showForm() {
    this.setState({formShow: true})
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
    const { job, currentUser } = this.props
    const { formShow, mapShow, title, field, key_skill, description, contact, location, lat, lng, creation, jobShow, applied } = this.state
    return(
      <div className="text-center card-display">
        <div>
          <div>
            <h4 className="card-title">{title}</h4>
            <div>
              { !jobShow &&
                <button className="btn btn-info" onClick={() => this.setState({jobShow: true})}>
                  Show More
                </button>
              }
              { jobShow &&
                <button className="btn btn-danger" onClick={() => this.setState({jobShow: false})}>
                  Show Less
                </button>
              }
            </div>
            <div>
            { jobShow &&
              <div>
                <p className="card-text">Field: {field}</p>
                <p className="card-text">Skill: {key_skill}</p>
                <p className="card-text">Description: {description}</p>
                <p className="card-text">Contact: {contact}</p>
                <p className="card-text">Location: {location}</p>
                <p className="card-text">Posted: {creation.match(/^20\d+-\d+-\d+/)[0]}</p>
              </div>
            }
            </div>
              {
                (currentUser && this.props.job.applicants) &&
                this.props.job.applicants.map((user, key) => {
                  if (user.uid === currentUser.uid) {
                    return (<p className="card-text" key={key}> Applied </p>)
                  }
                })
              }
              {
                (currentUser && !this.props.job.applicants.some(user => user.uid === currentUser.uid )) &&
                <a className={"btn btn-outlined btn-theme apply-btn"}
                  data-wow-delay="0.7s"
                  onClick={this.applyToJob}
                  style={{
                    display: applied
                  }}>
                  Apply
                </a>
              }
              <div>
                {(currentUser && (currentUser.uid === job.uid)) &&
                  <div>
                    <button className="btn btn-danger" onClick={this.handleDeleteJob}>
                      Delete
                    </button>
                    <button className="btn btn-info" onClick={this.showForm}>
                      Update
                    </button>
                  </div>
                }
                {
                  !mapShow &&
                  <button className="btn btn-success" onClick={() => this.setState({mapShow: true})} >Show Map</button>
                }
                {
                  mapShow &&
                  <button className="btn btn-danger" onClick={() => this.setState({mapShow: false})} >Hide Map</button>
                }
            </div>
          </div>
        </div>

          <div>
            {
              formShow &&
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="well well-sm">
                      <form className="form-horizontal" onSubmit={this.handleUpdateJob}>
                        <fieldset>
                          <legend className="text-center header">Update</legend>
                          <div className="form-group">
                            <span className="col-md-1 col-md-offset-2 text-center"><label>Title</label></span>
                            <div className="col-md-8">
                              <input id="message" type="text" value={title} onChange={this.handleTitle} className="form-control" />
                            </div>
                          </div>
                          <div className="form-group">
                            <span className="col-md-1 col-md-offset-2 text-center"><label>Field</label></span>
                            <div className="col-md-8">
                              <input id="message" type="text" value={field} onChange={this.handleField} className="form-control" />
                            </div>
                          </div>

                          <div className="form-group">
                            <span className="col-md-1 col-md-offset-2 text-center"><label>Skill</label></span>
                            <div className="col-md-8">
                              <input id="message" type="text" value={key_skill} onChange={this.handleSkill} className="form-control" />
                            </div>
                          </div>

                          <div className="form-group">
                            <span className="col-md-1 col-md-offset-2 text-center"><label>Description</label></span>
                            <div className="col-md-8">
                              <textarea className="form-control" id="message" name="message" onChange={this.handleDescription} value={description} rows="7"></textarea>
                            </div>
                          </div>

                          <div className="form-group">
                            <span className="col-md-1 col-md-offset-2 text-center"><label>Contact</label></span>
                            <div className="col-md-8">
                              <input id="email" type="text" value={contact} onChange={this.handleContact} className="form-control" />
                            </div>
                          </div>

                          <div className="form-group">
                            <span className="col-md-1 col-md-offset-2 text-center"><label>Location</label></span>
                            <div className="col-md-8">
                              <input id="email" type="text" value={location} onChange={this.handleLocation} className="form-control" />
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
        {
          (mapShow && lng) &&
          <GMap
            location={location}
            lat={lat}
            lng={lng}
            />
        }
      </div>
    )
  }
}

export default JobItem;
