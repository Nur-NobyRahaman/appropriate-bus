import React, { useState } from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
const containerStyle = {
    width: '100%',
    height: '400px'
};

const location = {
    lat: 23.733348, lng: 90.406707
};


function Direction() {
    const origin ='mirpur 10 dhaka'
    const destination='dhanmondi 32 dhaka'
    const [directionResponse, setDirectionResponse] = useState(null);
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCVD0ZcflR8scbQ9w6v9y_RSiy3MZ96bEQ"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={16}
            >
                {
                    origin !== '' && destination !== '' && <DirectionsService
                    // required
                    options={{
                      destination: destination,
                      origin: origin,
                      travelMode: 'DRIVING'
                    }}
                    // required
                    callback={res => {
                        if(res !== null){
                          setDirectionResponse(res);
                        }
                    }}
                  />
                }
                {
                    directionResponse && <DirectionsRenderer
                    // required
                    options={{ 
                      directions: directionResponse
                    }}
                    
                  />
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Direction)