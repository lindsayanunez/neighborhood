import React, { Component } from 'react';
import './App.css';
import locations from './data/locations.json';
import DisplayMap from './components/DisplayMap';
import ListDrawer from './components/ListDrawer';

class App extends Component {
  state = {
    lat: 40.6782,
    lon: -73.9442,
    zoom: 15,
    all: locations,
    open: false
  }

  toggleDrawer = () => {
    //change state to show if drawer is open or not
    this.setState({
      open: !this.state.open
    });
  }

  render = () => {
    return (
      <div className="App">
      <div>
        <button onClick={this.toggleDrawer} style={this.styles.menuButton>
          <i className="fa fa-bars">
        </button>
        <h1>'Best Pizza in Brooklyn'</h1>
      </div>
        <DisplayMap
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.all}/>
        <ListDrawer
          locations={this.state.all}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}/>
      </div>
    );
  }
}

export default App;
