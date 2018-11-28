import React, { Component } from "react";
import { Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import NoDisplayMap from "./NoDisplayMap.js";

const MAP_KEY = "AIzaSyA4VBEGSFyW6fd16XxYD_buASl7pUZzaFw";
const CLIENT_FS = "OUCOLRA5EZGI34CYBNRCZHRPD0DA5VVRJOAJNCWGLTGON0LO";
const SECRET_FS = "HWPXULN0VH34HOK40IJFT1YE0HGYCFWMMCBMM4IPFQAD2OJZ";
const FS_VERSION = "20180323";

class DisplayMap extends Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    activeMarkers: null,
    activeMarkerProps: null,
    showingInfoWindow: false,
    firstDrop: true,
  };

  componentDidMount = () => {};

  componentWillRecieveProps = props => {
    this.setState({ firstDrop: false });

    //Update the markers when the filtering of locations changes
    if (this.state.markerss.length !== props.locations.length) {
      this.shutInfoWindow();
      this.updateMarkers(props.locations);
      this.setState({ activeMarker: null });

      return;
    }

    //Close window if the clicked marker is not for the open info window
    if (
      !props.selectedIndex ||
      (this.state.activeMarker &&
        this.state.markers[props.selectedIndex] !== this.state.activeMarker)
    ) {
      this.shutInfoWindow();
    }

    //Check for a selected index
    if (
      props.selectedIndex === null ||
      typeof props.selectedIndex === "undefined"
    ) {
      return;
    }

    //Marker acts as clicked
    this.onMarkerClick(
      this.state.markerProps[props.selectedIndex],
      this.state.markers[props.selectedIndex]
    );
  };

  mapReady = (props, map) => {
    //Save the reference of the map in the state for location markers
    this.setState({ map });
    this.updateMarkers(this.props.locations);
  };

    updateMarkers = locations => {
    //check to see if there are locations
    if (!locations) return;
    //Remove existing markers
    this.state.markers.forEach(marker => marker.setMap(null));

    //Create parallel references between the markers and the location props
    //Add markers to the map

    let markerProps = [];
    let markers = locations.map((location, index) => {
      let pProps = {
        key: index,
        index,
        name: location.name,
        position: location.pos,
        url: location.url
      };
      markerProps.push(pProps);
      console.log(this.props.google.maps);
      let dropEffect = this.state.firstDrop
        ? this.props.google.maps.Animation.Drop
        : null;
      let marker = new this.props.google.maps.Marker({
        position: location.pos,
        map: this.state.map,
        dropEffect
      });
      marker.addListener("click", () => {
        this.onMarkerClick(pProps, marker, null);
      });
      return marker;
    });
    this.setState({ markers, markerProps });
  };





  onMarkerClick = (props, marker, e) => {
    //close the open info windows
    this.shutInfoWindow();

    //Fetch the Foursquare Data
    let url = `https://api.foursquare.com/v2/venues/search?client_id=${CLIENT_FS}&client_secret=${SECRET_FS}&v=${FS_VERSION}&radius=100&ll=${props.position.lat},${props.position.lng}&llAcc=100`;
    let headers = new Headers();
    let request = new Request(url, {
      method: "GET",
      headers
    });

    //Make markers for the active marker
    let activeMarkerProps;
    fetch(request)
      .then(response => response.json())
      .then(result => {
        //Retrieve business reference for the restaurant in FS

        let restaurant = this.getCompanyInfo(props, result);
        activeMarkerProps = {
          ...props,
          foursquare: restaurant[0]
        };
        //If there is FS data, get the picture
        //else complete setting state
        if (activeMarkerProps.foursquare) {
          let url = `https://api.foursquare.com/v2/venues/${
            restaurant[0].id}/photos?client_id=${CLIENT_FS}&client_secret=${SECRET_FS}&v=${FS_VERSION}`;
          fetch(url)
            .then(response => response.json())
            .then(result => {
              activeMarkerProps = {
                ...activeMarkerProps,
                images: result.response.photos
              };
              if (this.state.activeMarker)
                this.state.activeMarker.setAnimation(null);
              marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
              this.setState({
                showingInfoWindow: true,
                activeMarker: marker,
                activeMarkerProps
              });
            });
        } else {
          //Set the state to show the marker info
          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
          this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            activeMarkerProps: props
          });
        }
      });
  };

  getCompanyInfo = (props, data) => {
    //comparing stored data to FS data
    return data.response.venues.filter(
      item => item.name.includes(props.name) || props.name.includes(item.name)
    );
  };

  shutInfoWindow = () => {
    this.state.activeMarker && this.state.activeMarker.setAnimation(null);
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      activeMarkerProps: null
    });
  };


  render = () => {
    const style = {
      width: "100%",
      height: "100%"
    };

    const center = {
      lat: this.props.lat,
      lng: this.props.lon
    };

    let apProps = this.state.activeMarkerProps;

    return (
      <Map
        role="application"
        aria-label="map"
        onReady={this.mapReady}
        google={this.props.google}
        zoom={this.props.zoom}
        style={style}
        initialCenter={center}
        onClick={this.shutInfoWindow}>
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.shutInfoWindow}>
          <div>
            <h3>{apProps && apProps.name}</h3>
            {apProps && apProps.url ? (
              <a href={apProps.url}>Visit website</a>
            ) : (
              ""
            )}
            {apProps && apProps.images ? (
              <div>
                <img
                  alt={"Food Picture from " + apProps.name}
                  scr={
                    apProps.images.items[0].prefix +
                    "100x100" +
                    apProps.images.items[0].suffix
                  }/>
                <p>Fourquare Photograph</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </InfoWindow>
      </Map>
    );
  };
}

export default GoogleApiWrapper({
  apiKey: MAP_KEY,
  LoadingContainer: NoDisplayMap
})(DisplayMap);
