import { Box } from '@mui/material';
import React from 'react';
import Message from './Message';
import { useContext } from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase.init';
import { ChatContext } from '../Context/ChatContext';

const Messages = ({ value, setIsMessage }) => {
  const [messages, setMessages] = useState([])
  console.log("🚀 ~ file: Messages.js:14 ~ Messages ~ messages:", messages)
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data?.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return () => {
      unSub()
    }
  }, [data?.chatId])

  return (
    <Box sx={{ height: { xl: value ? "73.53vh" : "82vh", lg: value ? "76.4vh" : "83.5vh", md: value ? "68.53vh" : "79.3vh", sm: value ? "50vh" : "68.1vh", xs: value ? "69.3vh" : "80.1vh" } }} overflow={"auto"} m={1}>
      {
        messages.map((m) => (
          <Message setIsMessage={setIsMessage} key={m?.id} message={m} />
        ))
      }
    </Box>
  );
};

export default Messages;