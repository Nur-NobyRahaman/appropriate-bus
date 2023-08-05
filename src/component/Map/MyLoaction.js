import React from 'react'
import { GoogleMap, LoadScript, } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '60vh'
};

const center = {
    lat: 23.751669093685944,
    lng: 90.37785604943906
};

function MyComponent() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDUksaI6hVCMlLrRqkT11QPvm5-0bB7W4s"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
            >

                <Marker

                    position={center}
                />
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MyComponent)