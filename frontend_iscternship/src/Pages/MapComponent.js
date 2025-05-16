
// MapComponent.jsx
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
     width: '100%',
     height: '200px'
};

const keyAPI = 'AIzaSyAPKP6YsDeSN2GRKanaLTQoiAKxFMw-j3E';

const MapComponent = ({ address }) => {
     const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        try{
             const geocodeAddress = async () => {
                     const response = await fetch(
                         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${keyAPI}`
                     );
                     const data = await response.json();
                     if (data.results.length > 0) {
                         const location = data.results[0].geometry.location;
                         setCoordinates(location);
                     }

             };

             if (address) {
                 geocodeAddress();
             }
        }catch(error) {
                     setCoordinates(null);
                 }
             }, [address]);

     return (
         <LoadScript googleMapsApiKey={keyAPI}>
             {coordinates? (
                 <GoogleMap
                     mapContainerStyle={containerStyle}
                     center={coordinates}
                     zoom={15}
                 >
                     <Marker position={coordinates} />
                 </GoogleMap>
             ):"Mapa não disponivel..."}
         </LoadScript>
  );
};

export default MapComponent;
