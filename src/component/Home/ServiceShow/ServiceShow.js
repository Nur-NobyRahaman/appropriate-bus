import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import '../../LocalBus/LocalBus.css'
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const ServiceShow = ({ status }) => {
    const [buses, setBuses] = useState([]);
    const [more, setMore] = useState(true)
    const navigate = useNavigate()
    console.log("🚀 ~ file: ServiceShow.js:11 ~ ServiceShow ~ more:", more)


    const handleNavigate = () => {
        navigate('/services')
    }
    // get buses
    useEffect(() => {
        fetch("http://localhost:5000/addServices")
            .then(res => res.json())
            .then(data => {
                setBuses(data?.result)
                console.log(data)
            })
    }, [])
    return (
        <Box mt={6} >
            <h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>our Services</h1>
            <Box width={'90vw'} mx={'auto'} display={"flex"} flexWrap={'wrap'} justifyContent={'center'} gap={2} mt={5} >

                {
                    more &&
                    buses?.map((data, index) =>
                        8 > index &&
                        <Paper
                            onClick={handleNavigate}
                            // className={status ? "pageDark card" : "pageLight card"}
                            elevation={1}
                            sx={{

                                transition: 'all 0.1s ease',
                                "&:active": {
                                    transform: "scale(0.96)"
                                },
                                bgcolor: !status && "#2e7d32",
                                width: {
                                    xl: "20vw",
                                    lg: "24vw",
                                    md: "33vw",
                                    sm: "35vw",
                                    xs: "79vw",
                                },
                                height: {
                                    xl: "35vh",
                                    lg: "35vh",
                                    md: "45vh",
                                    sm: "67vh",
                                    xs: "39vh",
                                }, p: 4, overflow: 'auto'
                            }} key={data?._id}>
                            <Typography color={'white'} fontSize={19} fontWeight={'bold'} textAlign={'center'}>{data?.name}</Typography>
                            <Box display={'flex'} alignItems={'center'} gap={1} mt={2}>
                                <Box>
                                    <Typography color={'whitesmoke'}>Type:</Typography>
                                    <Typography color={'whitesmoke'}>Route:</Typography>
                                    <Typography color={'whitesmoke'}>Route:</Typography>
                                    <Typography color={'whitesmoke'}>Start:</Typography>
                                    <Typography color={'whitesmoke'}>End:</Typography>
                                    <Typography color={'whitesmoke'}>Price:</Typography>

                                </Box>
                                <Box>
                                    <Typography color={'whitesmoke'}>{data?.type}</Typography>
                                    <Typography color={'whitesmoke'}>{data.origin} to {data.destination}</Typography>
                                    <Typography color={'whitesmoke'}>{data.destination} to {data.origin}</Typography>
                                    <Typography color={'whitesmoke'}>{data?.start}</Typography>
                                    <Typography color={'whitesmoke'}>{data?.end}</Typography>
                                    <Typography color={'whitesmoke'}>{data?.price}৳</Typography>
                                </Box>
                            </Box>


                        </Paper>)


                }
                {
                    !more &&

                    buses?.map((data, index) =>

                        <Paper
                            className={status ? "pageDark card" : "pageLight card"}

                            elevation={1} sx={{
                                bgcolor: status ? null : "#2e7d32",
                                transition: 'all 0.1s ease',
                                "&:active": {
                                    transform: "scale(0.96)"
                                },
                                width: {
                                    xl: "20vw",
                                    lg: "25vw",
                                    md: "33vw",
                                    sm: "35vw",
                                    xs: "79vw",
                                },
                                height: {
                                    xl: "35vh",
                                    lg: "35vh",
                                    md: "45vh",
                                    sm: "67vh",
                                    xs: "39vh",
                                }, p: 4, overflow: 'auto'
                            }} key={data?._id}>
                            <Typography color={'white'} fontSize={19} fontWeight={'bold'} textAlign={'center'}>{data?.name}</Typography>
                            <Box display={'flex'} alignItems={'center'} gap={1} mt={2}>
                                <Box>
                                    <Typography color={'whitesmoke'}>Type:</Typography>
                                    <Typography color={'whitesmoke'}>Route:</Typography>
                                    <Typography color={'whitesmoke'}>Route:</Typography>
                                    <Typography color={'whitesmoke'}>Start:</Typography>
                                    <Typography color={'whitesmoke'}>End:</Typography>
                                    <Typography color={'whitesmoke'}>Price:</Typography>

                                </Box>
                                <Box>
                                    <Typography color={'whitesmoke'}>{data?.type}</Typography>
                                    <Typography color={'whitesmoke'}>{data.origin} to {data.destination}</Typography>
                                    <Typography color={'whitesmoke'}>{data.destination} to {data.origin}</Typography>
                                    <Typography color={'whitesmoke'}>{data?.start}</Typography>
                                    <Typography color={'whitesmoke'}>{data?.end}</Typography>
                                    <Typography color={'whitesmoke'}>{data?.price}৳</Typography>
                                </Box>
                            </Box>


                        </Paper>)
                }



            </Box>
            <Box sx={{ width: {xl:"82vw", lg: '77vw', sm: "72vw", md: "67vw", xs: '79vw' }, mb: 3 }} mx={'auto'} display={'flex'} justifyContent={'end'} mt={2}>
                <Button sx={{ bgcolor: status && "black", color: status && "white", "&:hover": status && { bgcolor: 'gray' } }} startIcon={!more && <NavigateBefore></NavigateBefore>} onClick={() => setMore(!more)} endIcon={more && <NavigateNext></NavigateNext>} variant='contained' color='success' size='small' >{more ? "More" : "Less"}</Button>
            </Box>



        </Box>
    );
};

export default ServiceShow;