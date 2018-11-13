import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const MAP_KEY = "AIzaSyA4VBEGSFyW6fd16XxYD_buASl7pUZzaFw";

class DisplayMap extends Component {
  state = {
    map: null,
    points: [],
    pointProps: [],
    activePoints: null,
    activePointProps: null;
    showingInfoWindow: false
  };

  componentDidMount = () =>{

  }

  mapReady = (props, map) =>{
    //Save the reference of the map in the state for location markers
    this.setState({map});
  }

  updatePoints = (locations) => {
    //check to see if there are locations
    if(!location)
      return;
    //Remove existing markers
    this.state.points.forEach(point => point.setMap(null ));

    //Create parallel references between the markers and the location props
    //Add markers to the map

    let pointProps = [];
    let points = locations.map((location, index) => {
      let mProps = {
        key: index,
        index,
        name: location.name,
        position: location.pos,
        url: location.url.
      };
      pointProps.push(mProps);

      let dropEffect = this.props.google.maps.Animation.Drop;
      let point =new this.props.google.maps.Point({
        position: location.pos,
        map: this.state.map,
        dropEffect
      });
      point.addListener('click', () => {
        this.onPointClick(mProp, point, null);
      });
      return point;
    })
    this.setState({points, pointProps});
  }

  render = () =>{

    const style = {
      width: '100%',
      height: '100%'
    }

    const center = {
      lat: this.props.lat,
      lng: this.props.lon
    }



  return (
      <Map
        role="application"
        aria-label="map"
        onReady={this.mapReady}
        google={this.props.google}
        zoom={this.props.zoom}
        style={style}
        initialCenter={center}
        onClick={this.closeInfoWindow}></Map>
    )
  }
}

export default GoogleApiWrapper({apiKey: MAP_KEY})(DisplayMap)