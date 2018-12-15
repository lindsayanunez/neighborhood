(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{194:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(6),i=n.n(r),l=(n(72),n(21)),s=n(12),c=n(14),u=n(13),p=n(15),m=(n(74),n(39)),d=n(33),f=n(64),h=function(e){function t(){var e,n;Object(s.a)(this,t);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(n=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={show:!1,timeout:null},n.componentDidMount=function(){var e=window.setTimeout(n.displayMessage,1e3);n.setState({timeout:e})},n.componenetWillMount=function(){window.clearTimeout(n.state.timeout)},n.displayMessage=function(){n.setState({show:!0})},n}return Object(p.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return a.a.createElement("div",null,this.state.show?a.a.createElement("div",null,a.a.createElement("h1",null,"Map Loading Error"),a.a.createElement("h2",null,"This map will not load due to network error."),a.a.createElement("p",null,"Please, connect to the internet and try again.")):a.a.createElement("div",null,a.a.createElement("h1",null,"Loading...")))}}]),t}(o.Component),g="OUCOLRA5EZGI34CYBNRCZHRPD0DA5VVRJOAJNCWGLTGON0LO",w="HWPXULN0VH34HOK40IJFT1YE0HGYCFWMMCBMM4IPFQAD2OJZ",y="20180323",v=function(e){function t(){var e,n;Object(s.a)(this,t);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return(n=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={map:null,markers:[],markerProps:[],activeMarkers:null,activeMarkerProps:null,showingInfoWindow:!1,firstDrop:!0},n.componentDidMount=function(){},n.componentWillReceiveProps=function(e){if(n.setState({firstDrop:!1}),n.state.markers.length!==e.locations.length)return n.shutInfoWindow(),n.updateMarkers(e.locations),void n.setState({activeMarker:null});(!e.selectedIndex||n.state.activeMarker&&n.state.markers[e.selectedIndex]!==n.state.activeMarker)&&n.shutInfoWindow(),null!==e.selectedIndex&&"undefined"!==typeof e.selectedIndex&&n.onMarkerClick(n.state.markerProps[e.selectedIndex],n.state.markers[e.selectedIndex])},n.mapReady=function(e,t){n.setState({map:t}),n.updateMarkers(n.props.locations)},n.updateMarkers=function(e){if(e){n.state.markers.forEach(function(e){return e.setMap(null)});var t=[],o=e.map(function(e,o){var a={key:o,index:o,name:e.name,position:e.pos,url:e.url};t.push(a),console.log(n.props.google.maps);var r=n.state.firstDrop?n.props.google.maps.Animation.Drop:null,i=new n.props.google.maps.Marker({position:e.pos,map:n.state.map,dropEffect:r});return i.addListener("click",function(){n.onMarkerClick(a,i,null)}),i});n.setState({markers:o,markerProps:t})}},n.onMarkerClick=function(e,t,o){n.shutInfoWindow();var a,r="https://api.foursquare.com/v2/venues/search?client_id=".concat(g,"&client_secret=").concat(w,"&v=").concat(y,"&radius=100&ll=").concat(e.position.lat,",").concat(e.position.lng,"&llAcc=100"),i=new Headers,s=new Request(r,{method:"GET",headers:i});fetch(s).then(function(e){return e.json()}).then(function(o){var r=n.getCompanyInfo(e,o);if((a=Object(l.a)({},e,{foursquare:r[0]})).foursquare){var i="https://api.foursquare.com/v2/venues/".concat(r[0].id,"/photos?client_id=").concat(g,"&client_secret=").concat(w,"&v=").concat(y);fetch(i).then(function(e){return e.json()}).then(function(e){a=Object(l.a)({},a,{images:e.response.photos}),n.state.activeMarker&&n.state.activeMarker.setAnimation(null),t.setAnimation(n.props.google.maps.Animation.BOUNCE),n.setState({showingInfoWindow:!0,activeMarker:t,activeMarkerProps:a})})}else t.setAnimation(n.props.google.maps.Animation.BOUNCE),n.setState({showingInfoWindow:!0,activeMarker:t,activeMarkerProps:e})})},n.getCompanyInfo=function(e,t){return t.response.venues.filter(function(t){return t.name.includes(e.name)||e.name.includes(t.name)})},n.shutInfoWindow=function(){n.state.activeMarker&&n.state.activeMarker.setAnimation(null),n.setState({showingInfoWindow:!1,activeMarker:null,activeMarkerProps:null})},n.render=function(){var e={lat:n.props.lat,lng:n.props.lon},t=n.state.activeMarkerProps;return a.a.createElement(d.Map,{role:"application","aria-label":"map",onReady:n.mapReady,google:n.props.google,zoom:n.props.zoom,style:{width:"100%",height:"100%"},initialCenter:e,onClick:n.shutInfoWindow},a.a.createElement(d.InfoWindow,{marker:n.state.activeMarker,visible:n.state.showingInfoWindow,onClose:n.shutInfoWindow},a.a.createElement("div",null,a.a.createElement("h3",null,t&&t.name),t&&t.url?a.a.createElement("a",{href:t.url},"Visit website"):"",t&&t.images?a.a.createElement("div",null,a.a.createElement("img",{alt:"Food Picture from "+t.name,scr:t.images.items[0].prefix+"100x100"+t.images.items[0].suffix}),a.a.createElement("p",null,"Fourquare Photograph")):"")))},n}return Object(p.a)(t,e),t}(o.Component),k=Object(d.GoogleApiWrapper)({apiKey:"AIzaSyA4VBEGSFyW6fd16XxYD_buASl7pUZzaFw",LoadingContainer:h})(v),b=n(65),E=n.n(b),I=function(e){function t(){var e,n;Object(s.a)(this,t);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return(n=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={open:!1,query:""},n.styles={list:{width:"250px",padding:"0px 15px 0px"},noBullets:{listStyleType:"none",padding:0},fullList:{width:"auto"},listItem:{marginBottom:"15px"},listLink:{background:"transparent",border:"none",color:"black"},filterEntry:{border:"1px solid gray",padding:"3px",margin:"30px 0px 10px",width:"100%"}},n.updateQuery=function(e){n.setState({query:e}),n.props.filterLocations(e)},n.render=function(){return a.a.createElement("div",null,a.a.createElement(E.a,{open:n.props.open,onClose:n.props.toggleDrawer},a.a.createElement("div",{style:n.styles.list},a.a.createElement("input",{style:n.styles.filterEntry,type:"text",placeholder:"Search List",name:"filter",onChange:function(e){return n.updateQuery(e.target.value)},value:n.state.query}),a.a.createElement("ul",{style:n.styles.noBullets},n.props.locations&&n.props.locations.map(function(e,t){return a.a.createElement("li",{style:n.styles.listItem,key:t},a.a.createElement("button",{style:n.styles.listLink,key:t,onClick:function(e){return n.props.clickListItem(t)}},e.name))})))))},n}return Object(p.a)(t,e),t}(o.Component),M=function(e){function t(){var e,n;Object(s.a)(this,t);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return(n=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={lat:40.6782,lon:-73.9442,zoom:13,all:m,open:!1,selectedIndex:null},n.styles={menuButton:{background:"white",position:"absolute",left:10,top:20,padding:10,marginLeft:10,marginRight:20},hide:{display:"none"},header:{marginTop:"0px"}},n.componentDidMount=function(){n.setState(Object(l.a)({},n.state,{filtered:n.filterLocations(n.state.all,"")}))},n.toggleDrawer=function(){n.setState({open:!n.state.open})},n.updateQuery=function(e){n.setState(Object(l.a)({},n.state,{selectedIndex:null,filtered:n.filterLocations(n.state.all,e)}))},n.filterLocations=function(e,t){return m.filter(function(e){return e.name.toLowerCase().includes(t.toLowerCase())})},n.clickListItem=function(e){n.setState({selectedIndex:e,open:!n.state.open})},n.render=function(){return a.a.createElement("div",{className:"App"},a.a.createElement("div",{style:n.styles.header},a.a.createElement("button",{onClick:n.toggleDrawer,style:n.styles.menuButton},a.a.createElement("i",{className:"fa fa-bars"})),a.a.createElement("h1",null,"Best Pizza in Brooklyn")),a.a.createElement(k,{lat:n.state.lat,lon:n.state.lon,zoom:n.state.zoom,locations:n.state.filtered,selectedIndex:n.state.selectedIndex,clickListItem:n.clickListItem}),a.a.createElement(I,{locations:n.state.filtered,open:n.state.open,toggleDrawer:n.toggleDrawer,filterLocations:n.updateQuery,clickListItem:n.clickListItem}))},n}return Object(p.a)(t,e),t}(o.Component),z=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function O(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(a.a.createElement(M,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/neighborhood",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/neighborhood","/service-worker.js");z?(function(e,t){fetch(e).then(function(n){var o=n.headers.get("content-type");404===n.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):O(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):O(t,e)})}}()},39:function(e){e.exports=[{name:"L&B Spumoni Gardens",street:"2725 86th St",city:"Brooklyn",state:"NY",zip:"11223",url:"http://www.spumonigardens.com/",pos:{lat:40.594711,lng:-73.981339}},{name:"Smiling Pizzeria",street:"323 7th Ave",city:"Brooklyn",state:"NY",zip:"11215",url:"No Website",pos:{lat:40.66871,lng:-73.98006}},{name:"Juliana's",street:"19 Old Fulton St",city:"Brooklyn",state:"NY",zip:"11201",url:"http://www.julianaspizza.com/",pos:{lat:40.70277,lng:-73.99342}},{name:"Paulie Gee's",street:"60 Greenpoint Ave",city:"Brooklyn",state:"NY",zip:"11222",url:"http://www.pauliegee.com/",pos:{lat:40.72954,lng:-73.95857}},{name:"Lucali",street:"575 Henry St",city:"Brooklyn",state:"NY",zip:"11231",url:"https://www.lucalibrooklyn.com/",pos:{lat:40.6818,lng:-74.00023}},{name:"Roberta's",street:"261 Moore St",city:"Brooklyn",state:"NY",zip:"11206",url:"http://www.robertaspizza.com/",pos:{lat:40.70504,lng:-73.93356}},{name:"Barbonchino Pizza",street:"781 Franklin Ave,",city:"Brooklyn",state:"NY",zip:"11238",url:"http://www.barboncinopizza.com/",pos:{lat:40.67207,lng:-73.957176}},{name:"Speedy Romeo",street:"376 Classon Ave",city:"Brooklyn",state:"NY",zip:"11238",url:"http://speedyromeo.com/",pos:{lat:40.6875,lng:-73.96008}},{name:"Grimaldi's Pizza",street:"1 Front St",city:"Brooklyn",state:"NY",zip:"11201",url:"http://www.grimaldis-pizza.com/locations",pos:{lat:40.70263,lng:-73.99324}},{name:"Best Pizza",street:"33 Havemeyer St",city:"Brooklyn",state:"NY",zip:"11211",url:"https://www.bestpizzaofbrooklyn.com/",pos:{lat:40.71555,lng:-73.95336}}]},67:function(e,t,n){e.exports=n(194)},72:function(e,t,n){},74:function(e,t,n){}},[[67,2,1]]]);
//# sourceMappingURL=main.14585bc5.chunk.js.map