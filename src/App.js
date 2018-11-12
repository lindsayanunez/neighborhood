import React, { Component } from 'react';
import './App.css';
import locations from '.data/loctions.json';
import DisplayMap from '.components/DisplayMap';

class App extends Component {
  state = {

  }

  render() {
    return (
      <div className="App">
      <div>
        <h1>'Best Pizza in Brooklyn'</h1>
      </div>
      <DisplayMap/>

      </div>
    );
  }
}

export default App;
