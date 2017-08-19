import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div><i style={{fontSize: '20px'}} className="glyphicon glyphicon-pushpin"></i></div>

class GMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      }
    }
};

render() {
  const { location, lat, lng } = this.props
  return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <GoogleMapReact
              style={{
                height: '50vh',
                width: '50vh',
                padding: '0',
                margin: '0'
              }}
              defaultCenter={this.state.center}
              defaultZoom={15}
              >
              <Marker
                lat={lat}
                lng={lng}
                text={location}
              />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    );
  }
}

export default GMap;
