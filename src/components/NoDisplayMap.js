import React, { Component } from "react";

class NoDisplayMap extends Component {
  state = {
    show: false,
    timeout: null
  };
  //After the components have mounted, set the timeout
  componentDidMount = () => {
    let timeout = window.setTimeout(this.displayMessage, 1000);
    this.setState({ timeout });
  };

  //before componenets mount clear the timeout
  componenetWillMount = () => {
    window.clearTimeout(this.state.timeout);
  };

  //changes state for message display
  displayMessage = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <div>
        {this.state.show ? (
          <div>
            <h1>Map Loading Error</h1>
            <h2>This map will not load due to network error.</h2>
            <p>Please, connect to the internet and try again.</p>
          </div>
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    );
  }
}

export default NoDisplayMap;
