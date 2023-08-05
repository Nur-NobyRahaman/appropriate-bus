import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import Messages from './Messages';
import Input from './Input';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import app, { db } from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';
import { Menu } from '@mui/icons-material';


const Chat = ({ setIsMessage, setIsOpen ,open}) => {
    const { data } = useContext(ChatContext);

    return (
        <Box sx={{ height: { xl: '84vh', lg: '84vh', md: '80vh' } }} >
            {
                data?.user?.displayName && <Paper elevation={1} square sx={{ p: .2 }}>
                    <Box display={'flex'} justifyContent={'space-between'} pr={1}>
                        <Box sx={{ height: { xl: '7vh', lg: '7vh', md: '10vh' } }} p={2} display={'flex'} alignItems={'center'} gap={1}>
                            <Avatar sx={(data?.user?.photoURL) ? null : { bgcolor: '#311b92' }} alt={data?.user?.displayName} src={(data?.user?.photoURL) ? data?.user?.photoURL : data?.user?.displayName} />
                            <Typography >{data?.user?.displayName}</Typography>
                        </Box>

                        <IconButton onClick={() => {
                            setIsOpen(!open)
                        }} sx={{ display: { xs: 'block', sm: 'none' } }} size='small'>
                            <Menu ></Menu>
                        </IconButton>
                    </Box>
                </Paper>
            }
            {/* <Paper elevation={1} square sx={{ p: .2 }}>
                <Box height={'7vh'} p={2} display={'flex'} alignItems={'center'} gap={1}>
                    <Avatar sx={(data?.user?.photoURL) ? null : { bgcolor: '#311b92' }} alt={data?.user?.displayName} src={(data?.user?.photoURL) ? data?.user?.photoURL : data?.user?.displayName} />
                    <Typography >{data?.user?.displayName}</Typography>
                </Box>
            </Paper> */}

            <Messages setIsMessage={setIsMessage} value={data?.user?.displayName}></Messages>

            <Input></Input>
        </Box>
    );
};

export default Chat;