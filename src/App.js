import React, { Component } from 'react';
import './App.css';
import locations from './data/locations.json';
import DisplayMap from './components/DisplayMap';

class App extends Component {
  state = {
    lat: 40.6782,
    lon: -73.9442,
    zoom: 15,
    all: locations
  }

  render = () => {
    return (
      <div className="App">
      <div>
        <h1>'Best Pizza in Brooklyn'</h1>
      </div>
        <DisplayMap
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.all}/>

      </div>
    );
  }
}

export default App;
