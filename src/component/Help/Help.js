import { Box, Paper, Stack } from '@mui/material';
import React from 'react';
import { format, render, cancel, register } from 'timeago.js';
import Navbar from '../Navbar/Navbar';
import SideBar from './SideBar';
import Chat from './Chat';
import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';
import { useState } from 'react';


const Help = ({ change, status, adminInfo, setAdminInfo, ticketDetails, setIsMessage, setSeatFieldInput }) => {
    const [open, setIsOpen] = useState(false)
    console.log("🚀 ~ file: Help.js:14 ~ Help ~ open:", open)

    const { data } = useContext(ChatContext)
    console.log("🚀 ~ file: Help.js:14 ~ Help ~ data:", data)
    return (
        <Box height={'100vh'} overflow={'auto'} >
            <Navbar
                setSeatFieldInput={setSeatFieldInput}
                ticketDetails={ticketDetails}
                setAdminInfo={setAdminInfo}
                adminInfo={adminInfo}
                status={status}
                change={change}
            ></Navbar>
            {/* <Messenger></Messenger> */}
            <Stack direction="row" sx={{ mt: 8 }}>
                {
                    open ? <Paper variant='outlined' square sx={{ width: { xl: '20vw', lg: "15vw", md: '24vw', sm: '26vw', xs: '40vh' }, display: { xs: 'none', sm: 'block' }, height: { xl: '90vh', lg: '92vh', md: '89.4vh', sm: "84vh", xs: '90vh' } }} overflow={'auto'}>
                        <SideBar setIsOpen={setIsOpen}></SideBar>
                    </Paper> : <Paper variant='outlined' square sx={{ width: { xl: '20vw', lg: '20vw', md: '24vw', sm: '26vw', xs: '50vh' }, height: { xl: '91vh', lg: '92vh', md: '89.4vh', sm: "84vh", xs: '90vh' }, overflow: "auto" }} overflow={'auto'}>
                        <SideBar setIsOpen={setIsOpen}></SideBar>
                    </Paper>
                }


                <Box sx={{ width: { xl: '80vw', lg: '80vw', md: '76vw', sm: '76vw', xs: open? '100vw' : "50vw" } }} >
                    <Chat open={open} setIsOpen={setIsOpen} setIsMessage={setIsMessage}></Chat>
                </Box>

            </Stack >




        </Box >
    );
};

export default Help;