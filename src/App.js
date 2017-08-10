import React, { Component } from 'react';
import axios from 'axios';
import map from 'lodash/map'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      value: '',
      data: null
    }
  }

  componentDidMount(){
    axios.get('https://jason-jobs-bacon.herokuapp.com/api/v1/jobs').then(response => {
      console.log(response.data.data);
      this.setState({ data: response.data.data })
    })
  }

  render() {
    return (
      <div className="App">
        <h1>hello</h1>
        <h1>{this.state.value}</h1>
        {
          this.state.data && map(this.state.data, (job, key) =>
            <ul key={key} className="jobs-list">
              <h2>Title:</h2><li>{job.title}</li>
              <h2>Field:</h2><li>{job.field}</li>
              <h2>Skill:</h2><li>{job.key_skill}</li>
              <h2>Description:</h2><li>{job.description}</li>
            </ul>
          )
        }
      </div>
    );
  }
}

export default App;
