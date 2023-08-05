import { Box, Button, Paper } from '@mui/material';
import React from 'react';

const Item = ({ item }) => {
    return (
        <Paper variant="outlined" sx={{ width: '100vw', height: '85vh', border:"2px solid black" }}>
            <h2>{item.title}</h2>
           
            <img style={{ width: '100%', height: '80%', objectFit: 'cover' }} src={item.photoURL} alt="" />

            {/* <p>{item.description}</p> */}
        </Paper>
    );
};

export default Item;