import React from "react"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps"
import {compose, withProps, withHandlers} from 'recompose';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel"

const googleApiKeyJS = "AIzaSyB0fy93k6kiEYE_U0cUZYnRLXR-mzUQSyo"
const torontoCoordinates = {
    lat:43.6529,
    lng:-79.3849
}

let zoomVal = 12;

const MapWithMarkerClusterer = compose(
    withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleApiKeyJS}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
}), 
withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
            console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            console.log(clickedMarkers)
    }, 
}),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
    defaultZoom={zoomVal}
    defaultCenter={torontoCoordinates}
    onClick={props.zoomClick}
    >  
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            gridSize={3}
            >
        {props.markers.map(marker => (
        <Marker
            key={marker.alias}
            position={{ lat: marker.coordinates.latitude, lng: marker.coordinates.longitude }}
            />
        ))}
        </MarkerClusterer>
    </GoogleMap>
);

// const MyMapComponent = compose(
//     withProps({
//     googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleApiKeyJS}&libraries=geometry,drawing,places`,
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
// }),
//     withScriptjs,
//     withGoogleMap
// )
// ((props) =>
//     <GoogleMap
//     defaultZoom={8}
//     defaultCenter={torontoCoordinates}
//     >
//     {props.isMarkerShown &&
//     // <Marker 
//     //     position={{ 
//     //     lat: 43.6572841, lng: -79.41402435 }} 
//     //     /> 
//         // && 
//         <Marker position={{lat:43.75113, lng:-79.7741 }} />
//     }
//     </GoogleMap>
// )

export default MapWithMarkerClusterer;