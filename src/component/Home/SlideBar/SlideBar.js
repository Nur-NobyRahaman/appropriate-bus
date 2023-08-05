import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Box, Paper } from '@mui/material';
import Item from '../Item';
import { useEffect } from 'react';
import { useState } from 'react';




const SlideBar = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/addHome")
            .then(res => res.json())
            .then(data => {
                setData(data?.result)
                console.log(data);
            })
    }, [])

    return (
        <Box >
            <Carousel sx={{ width: {xl:'98.5vw',lg:'98.71vw'}, height: "95vh" ,mt:5.5,}}>
                {
                    data.map((item, i) =>
                        <Paper key={i} variant="outlined" sx={{ width: '100vw', height: '95vh', }}>

                            <h2>{item.title}</h2>

                            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={item.photoURL} alt="" />

                            {/* <p>{item.description}</p> */}
                        </Paper>)
                }
            </Carousel>

        </Box>




    );
};

export default SlideBar;