import { Box, Button, CircularProgress, IconButton, Paper, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import app, { db, storage } from '../../firebase.init';
import { useContext } from 'react';
import { useState } from 'react';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const Input = () => {
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)
    const [photoURL, setPhotoURL] = useState('');
    const [progress, setProgress] = useState(0);
    const auth = getAuth(app)
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSend = async () => {
        try {
            if (img) {
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser?.uid,
                        data: Timestamp.now(),
                        img: photoURL
                    }),
                })

            }
            else {

                await updateDoc(doc(db, "chats", data?.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser?.uid,
                        data: Timestamp.now(),
                    }),
                })
            }

            // await updateDoc(doc(db, "userChats", currentUser?.uid), {
            //     [data.chatId + " .lastMessage"]: {
            //         text
            //     },
            //     [data.chatId + ".date"]: serverTimestamp(),
            // });
            // await updateDoc(doc(db, "userChats", data?.user.uid), {
            //     [data.chatId + " .lastMessage"]: {
            //         text
            //     },
            //     [data.chatId + ".date"]: serverTimestamp()
            // })
            setText('')
            setImg(null)

        } catch (err) {
            console.log(err)
        }


    };


    useEffect(() => {
        const upLoadFile = () => {
            const name = new Date().getTime() + img?.name
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, img);


            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }

                    setProgress(progress)
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error)
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                        setPhotoURL(downloadURL)
                    });
                }
            );

        }
        img && upLoadFile()
    }, [img])
    return (
        <Paper variant='outlined' square>

            <Stack direction="row" spacing={3} pt={1.1}>
                <IconButton sx={{ color: 'white', ml: 2 }} size='small'>
                    <input onChange={e => setImg(e.target.files[0])} type="file" name="" id="file" style={{ display: 'none' }} />
                    <label htmlFor="file">
                        <ImageIcon color='primary'></ImageIcon>
                    </label>

                </IconButton>

                <Box >
                    <TextField value={text} placeholder='Write Something....' size='small' type='text' sx={{
                        width: { lg: "65vw", md: "60vw", sm: "55vw", xl: "70vw" ,xs:'60vw'}
                    }} fullWidth variant="standard" onChange={e => setText(e.target.value)}></TextField>
                </Box>

                {/* <IconButton onClick={handleSend} size='small'><SendIcon color='primary'></SendIcon></IconButton> */}
                {
                    (img && progress !== 100) ? 
                    <IconButton onClick={handleSend} size='small'>< CircularProgress size={'small'}   variant="determinate" value={progress} color='success'/></IconButton> : <IconButton onClick={handleSend} size='small'><SendIcon color='primary'></SendIcon></IconButton>
                }



            </Stack>

        </Paper >

    );
};

export default Input;