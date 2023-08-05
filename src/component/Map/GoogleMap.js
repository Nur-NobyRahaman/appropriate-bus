import { Box } from '@mui/material';
import React, { useState } from 'react';
import MyLoaction from './MyLoaction';
import Direction from './Direction';

const GoogleMap = () => {
    const [origin ,setOrigin]=useState('')
    const [destination ,setDestination]=useState('')
    const displayDereation = (e) => {
        e.preventDefault()
        const start = e.target.origin.value;
        const end = e.target.destination.value
        setOrigin(start);
        setDestination(end);


    }
    console.log(origin,destination)
    return (
        <Box >
            <h1>Google Map</h1>
            <form onSubmit={displayDereation}>
                <input type="text" name='origin' />
                <input type="text" name='destination' />
                <input type="submit" value="show" />
            </form>
            <br />
            <Direction origin={origin} destination={destination}></Direction>
            {/* <MyLoaction></MyLoaction> */}

        </Box>
    );
};

export default GoogleMap;