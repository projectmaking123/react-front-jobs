import React, { Component } from 'react';
import axios from 'axios';
import map from 'lodash/map'
import './App.css';

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
      <div className="row">
        <h1>hello</h1>
        <h1>{this.state.value}</h1>
        {
          this.state.data && map(this.state.data, (job, key) =>
            <ul key={key} className="list-group">
              <h2>Title:</h2><li className="list-group-item">{job.title}</li>
              <h2>Field:</h2><li className="list-group-item">{job.field}</li>
              <h2>Skill:</h2><li className="list-group-item">{job.key_skill}</li>
              <h2>Description:</h2><li className="list-group-item">{job.description}</li>
            </ul>
          )
        }
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input type="text" value={this.state.title} onChange={this.handleTitle}
              onClick={() => this.setState({title: ''})}/>
          </label>
          <label>
            Field:
            <input type="text" value={this.state.field} onChange={this.handleField}
              onClick={() => this.setState({field: ''})}/>
          </label>
          <label>
            Skill:
            <input type="text" value={this.state.key_skill} onChange={this.handleSkill}
              onClick={() => this.setState({skill: ''})}/>
          </label>
          <label>
            Description:
            <input type="text" value={this.state.description} onChange={this.handleDescription}
              onClick={() => this.setState({description: ''})}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
