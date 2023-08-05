import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import app, { db } from '../../firebase.init';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const Chats = () => {
    const [chats, setChats] = useState([]);
   const {currentUser}=useContext(AuthContext)
    const { dispatch } = useContext(ChatContext);
       
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser?.uid), (doc) => {
                setChats(doc.data())
                console.log("Current data: ", doc.data());
            });
            return () => {
                unsub();
            }

        }

        currentUser?.uid && getChats()
    }, [currentUser?.uid])

    const handleSelect = (u) => {
        console.log(u)
        dispatch({ type: "CHANGE_USER", payload: u })
    }
    console.log( Object.entries(chats))
    // console.log(Object.entries(chats).map((data)=> {return data[1].userInfo?.displayName}));
    return (
        <Box pl={2} pr={2}>
            <Typography>Current Chats</Typography>
            {
                Object.entries(chats)?.map((chat) =>
                
                    <Box key={chat[0]}
                        onClick={() => handleSelect(chat[1]?.userInfo)}
                        display={'flex'} gap={1} mb={1} alignItems={'center'}
                        sx={{ "&:hover": { backgroundColor: '#f5f5f5' }, p: 1, cursor: 'pointer' }}>

                        <Box>
                        <Avatar sx={(chat[1]?.userInfo?.photoURL) ? null : { bgcolor: '#311b92' }} alt={chat[1]?.userInfo?.displayName} src={(chat[1]?.userInfo?.photoURL) ? chat[1]?.userInfo?.photoURL:chat[1]?.userInfo?.displayName} />
                           
                        </Box>
                        <Box >
                            <Typography>{chat[1]?.userInfo?.displayName}</Typography>

                            {/* <small>{chat[1]?.lastMessage?.text}</small> */}
                           
                        </Box>


                    </Box>)
            }
            



        </Box>
    );
};

export default Chats;