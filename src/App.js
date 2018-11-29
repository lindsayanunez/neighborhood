import React, { Component } from 'react';
import './App.css';
import locations from './data/locations.json';
import DisplayMap from './components/DisplayMap';
import ListDrawer from './components/ListDrawer';

class App extends Component {
  state = {
    lat: 40.6782,
    lon: -73.9442,
    zoom: 13,
    all: locations,
    open: false,
    selectedIndex: null
  }

  styles = {
    menuButton:{
      background: 'white',
      position: 'absolute',
        left: 10,
        top: 20,
      padding: 10,
      marginLeft: 10,
      marginRight: 20
    },
    hide: {
      display: 'none'
    },
    header:{
      marginTop: '0px'
    }
  };

componentDidMount = () => {
  this.setState({
    ...this.state,
    filtered: this.filterLocations(this.state.all, "")
  });
}

  toggleDrawer = () => {
    //change state to show if drawer is open or not
    this.setState({
      open: !this.state.open
    });
  }

  updateQuery = (query) => {
    //update and then filter the query value
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.all, query)
    });
  }

  filterLocations = (location, query) => {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  clickListItem = (index) => {
    //set state with new array of selected locations
    this.setState({ selectedIndex: index, open: !this.state.open})
  }

  render = () => {
    return (
      <div className="App">
      <div style={this.styles.header}>
        <button onClick={this.toggleDrawer} style={this.styles.menuButton}>
          <i className="fa fa-bars"></i>
        </button>
        <h1>Best Pizza in Brooklyn</h1>
      </div>
        <DisplayMap
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.filtered}
          selectedIndex={this.state.selectedIndex}
          clickListItem={this.clickListItem}/>
        <ListDrawer
          locations={this.state.filtered}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}
          filterLocations={this.updateQuery}
          clickListItem={this.clickListItem}/>
      </div>
    );
  }
}

export default App;

//Resources
// Doug Brown's Tutorial - https://youtu.be/NVAVLCJwAAo

