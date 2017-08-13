import React, { Component } from 'react';

class JobItem extends Component {
  render() {
    const { job } = this.props
    return(
      <div>
        <ul className="col-lg-12 text-center">
          <h2>ID:</h2><li className="section-subheading text-muted">{job.id}</li>
          <h2>Title:</h2><li className="section-subheading text-muted">{job.title}</li>
          <h2>Field:</h2><li className="section-subheading text-muted">{job.field}</li>
          <h2>Skill:</h2><li className="section-subheading text-muted">{job.key_skill}</li>
          <h2>Description:</h2><li className="section-subheading text-muted">{job.description}</li>
        </ul>
        <button className="btn btn-danger" value={job.id} onClick={this.props.handleDeleteJob}>
          Delete
        </button>
      </div>
    )
  }
}

export default JobItem;
