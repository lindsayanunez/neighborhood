import React, { Component } from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-map-react';
import NoDisplayMap from './NoDisplayMap';

const MAP_KEY = "AIzaSyA4VBEGSFyW6fd16XxYD_buASl7pUZzaFw";
const CLIENT_FS = "OUCOLRA5EZGI34CYBNRCZHRPD0DA5VVRJOAJNCWGLTGON0LO";
const SECRET_FS = "HWPXULN0VH34HOK40IJFT1YE0HGYCFWMMCBMM4IPFQAD2OJZ";
const FS_VERSION = "20180323";

class DisplayMap extends Component {
  state = {
    map: null,
    points: [],
    pointProps: [],
    activePoints: null,
    activePointProps: null,
    showingInfoWindow: false
  };

  componentDidMount = () =>{

  }

  componentWillRecieveProps = (props) => {
    this.setState({firstDrop: false});

    //Update the markers when the filtering of locations changes
    if(this.state.points.length !== props.locations.length){
      this.shutInfoWindow();
      this.updatePoints();
      this.setState({activePoint: null});

      return;
    }

    //Close window if the clicked marker is not for the open info window
    if(!props.selectedIndex || (this.state.activePoint &&
      (this.state.markers[props.selectedIndex] !== this.state.activePoint))){
      this.closeInfoWindow();
    }

    //Check for a selected index
    if (props.selectedIndex === null || typeof(props.selectedIndex) === "undefined"){
      return;
    };

    //Marker acts as clicked
    this.onPointClick(this.state.pointProps[props.selectedIndex], this.state.markers[props.selectedIndex]);

  }

  mapReady = (props, map) =>{
    //Save the reference of the map in the state for location markers
    this.setState({map});
    this.updatePoints(this.props.locations);
  }

  shutInfoWindow = () =>{
    this.state.activePoint &&
    this.state.activePoint.setAnimation(null);
    this.setState({showingInfoWindow: false, activePoint: null, activePointProps: null});
  }

  getCompanyInfo = (props, data) => {
    //comparing stored data to FS data
    return data.response.venues.filter(item => item.name.includes(props.name) || props.name.includes(item.name));
  }

  onPointClick = (props, point, e ) => {
    //close the open info windows
    this.shutInfoWindow();

    //Fetch the Foursquare Data
    let url = "https://api.foursquare.com/v2/venues/search?client_id=${CLIENT_FS}&client_secret=${SECRET_FS}&v=${FS_VERSION}&radius=100&ll=${props.position.lat},${props.position.lng}&llAcc=100";
    let headers = new Headers();
    let request = new Request(url, {
      method: 'GET',
      headers
    });

    //Make points for the active marker
    let activePointProps;
    fetch(request)
      .then(response => response.json())
      .then(result => {
        //Retrieve business reference for the restaurant in FS

        let restaurant = this.getCompanyInfo(props, result);
        activePointProps = {
          ...props,
          foursquare: restaurant[0]
        };
        //If there is FS data, get the picture
        //else complete setting state
        if(activePointProps.foursquare){
          let url = 'https://api.foursquare.com/v2/venues/${restaurant[0].id}/photos?client_id=${CLIENT_FS}&client_secret=${SECRET_FS}&v=${FS_VERSION}`';
          fetch(url)
            .then(response =>response.json())
            .then(result => {
              activePointProps = {
                ...activePointProps,
                images: result.response.photos
              };
              if(this.state.activePoint)
                this.state.activePoint.setAnimation(null);
              point.setAnimation(this.props.google.maps.Animation.BOUNCE);
              this.setState({showingInfoWindow: true, activePoint: point, activePointProps});
            })
        }else{
          //Set the state to show the marker info
          point.setAnimation(this.props.google.maps.Animation.BOUNCE);
          this.setState({showingInfoWindow: true, activePoint: point, activePointProps: props});
        }
      })
  }

  updatePoints = (locations) => {
    //check to see if there are locations
    if(!locations)
      return;
    //Remove existing markers
    this.state.points.forEach(point => point.setMap(null ));

    //Create parallel references between the markers and the location props
    //Add markers to the map

    let pointProps = [];
    let points = locations.map((location, index) => {
      let pProps = {
        key: index,
        index,
        name: location.name,
        position: location.pos,
        url: location.url
      };
      pointProps.push(pProps);

      let dropEffect = this.state.firstDrop ? this.props.google.maps.Animation.Drop : null;
      let point =new this.props.google.maps.Point({
        position: location.pos,
        map: this.state.map,
        dropEffect
      });
      point.addListener('click', () => {
        this.onPointClick(pProps, point, null);
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

let apProps = this.state.activePointProps;

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
          point={this.state.activePoint}
          visible = {this.state.showingInfoWindow}
          onShut={this.shutInfoWindow}>
          <div>
            <h3>{apProps && apProps.name}</h3>
            {apProps && apProps.url ? (
              <a href={apProps.url}>Visit website</a>
              ): ""}
            {apProps && apProps.images ? (
                <div>
                  <images
                  alt= {"Food Picture from " + apProps.name}
                  scr= {apProps.images.items[0].prefix + "100x100" + apProps.images.items[0].suffix}></images>
                  <p>Fourquare Photograph</p>
                </div>
              )
              : ""
          }
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({apiKey: MAP_KEY, LoadingContainer: NoDisplayMap})(DisplayMap)