import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>

class GMap extends Component {
  static defaultProps = {
  center: {lat: 59.95, lng: 30.33},
  zoom: 11
};

render() {
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
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text={'Kreyser Avrora'}
              />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    );
  }
}

export default GMap;
