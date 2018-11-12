import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const MAP_Key = "AIzaSyA4VBEGSFyW6fd16XxYD_buASl7pUZzaFw";

class DisplayMap extends Component {
  state = {

  };

  render = () =>{

  }

  return (
      <Map></Map>
    )
  }
}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MapDisplay)