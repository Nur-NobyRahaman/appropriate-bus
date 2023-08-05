import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import uploadImage from '../../../src/image/upload.jpg'
import uploadIcon from '../../../src/image/upload-icon.png'
import { useState } from 'react';
import { useEffect } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase.init';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useSnackbar } from 'notistack';
import SlideBar from '../Home/SlideBar/SlideBar';

const AddHome = () => {
    const [img, setImg] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [photoURL, setPhotoURL] = useState('');
    const [progress, setProgress] = useState(0);
    const { enqueueSnackbar } = useSnackbar();



    const handleAdd = () => {
        fetch("http://localhost:5000/addHome", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                photoURL,

            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.result.insertedId) {
                    enqueueSnackbar(`${data?.status}`, { variant: "success" });
                    //     navigate("/login");
                    // } else {
                    //     enqueueSnackbar(`${data?.result}`, { variant: "warning" });
                }
                console.log(data, "admin register");
            });
    }



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
        <Box >
            <Typography sx={{mt:3,mb:3}} fontSize={20} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'}>Manage home</Typography>
            <Card sx={{ width: '30vw', mx: 'auto' }}>
                <CardContent>

                    <Button
                        id='file'
                        sx={{ width: '10vw', height: "15vh", mt: 2 }}
                    >
                        {
                            img ? <img src={URL.createObjectURL(img)} style={{ width: '100%', }} alt="" /> : <img style={{ width: '100%', }} src={uploadImage} alt="" />
                        }
                        <img style={{ width: '100%', }} id='file' alt="" />
                    </Button>
                    <input onChange={(e) => setImg(e.target.files[0])} accept='.png,.jpg,jpeg' type="file" name="" id="" />
                </CardContent>


                <CardContent>
                    <TextField onChange={e => setTitle(e.target.value)} fullWidth label='Title' color='success' size='small' margin='normal'></TextField> <br />
                    <TextField onChange={e => setDescription(e.target.value)} fullWidth label='Description' color='success' size='small' margin='normal'></TextField>
                </CardContent>
                <CardActions>
                    <Button onClick={handleAdd} startIcon={<AddCardIcon></AddCardIcon>} disabled={progress !== 100} sx={{ p: 1 }} fullWidth size="small" variant='contained' color='success'>Add</Button>
                </CardActions>
            </Card>

        </Box>
    );
};

export default AddHome;