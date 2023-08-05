import { Avatar, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import './Message.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import app from '../../firebase.init';
import { useContext } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { format, } from 'timeago.js';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
const Message = ({ message, setIsMessage }) => {
    console.log("🚀 ~ file: Message.js:14 ~ Message ~ message:", message?.text)
    console.log("🚀 ~ file: Message.js:14 ~ Message ~ message:", message)
    const auth = getAuth(app)
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const [counting, setCounting] = useState(0)
    const ref = useRef();



    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message])
    console.log(message);

    useEffect(() => {
        setIsMessage(message)
    }, [message])

 
    return (
        <Box ref={ref} className={`message ${message?.senderId === currentUser?.uid && "owner"}`} >
            <Box className="messageInfo" ref={ref}>
                <Avatar src={message?.senderId === currentUser?.uid ? currentUser?.photoURL : data?.user.photoURL}
                    alt=''
                    sizes='small' />



                <Typography color={"primary"} fontSize={8.5}>{format(new Date(message?.data?.seconds * 1000))}</Typography>
            </Box>
            <Box className="messageContent" ref={ref}>
                <p className={message?.text ? 'p' : null}> {message?.text}</p>
                {message?.img &&
                    <img className='messageContentImg' src={message?.img} alt="" />

                }

            </Box>
        </Box>
    );
};

export default Message;