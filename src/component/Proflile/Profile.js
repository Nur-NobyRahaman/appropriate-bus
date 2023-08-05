import { Avatar, Box, Button, Card, CardActions, CardContent, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import noUser from '../../../src/image/nouser.jpg'
import { getAuth, updateProfile } from 'firebase/auth';
import app, { db, storage } from '../../firebase.init';
import { useAuthState, useUpdatePassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useSnackbar } from 'notistack';
import EditIcon from '@mui/icons-material/Edit';
import { doc, updateDoc } from 'firebase/firestore';

const Profile = ({ ticketDetails, setAdminInfo, adminInfo, status, change, setSeatFieldInput }) => {
    const [img, setImg] = useState('')
    const [photoURL, setPhotoURL] = useState('');
    const [clickCount, setClickCount] = useState(0)
    const auth = getAuth(app);
    const [currentUser] = useAuthState(auth);
    const { enqueueSnackbar } = useSnackbar();
    const [progress, setProgress] = useState(0)



    const [updateProfileFirebase, updating, error] = useUpdateProfile(auth);


    const [updatePassword, updatingPassword, errorPassword] = useUpdatePassword(auth);
    if (updating) {
        enqueueSnackbar("Profile updated", { variant: "success" });
    }
    if (updatingPassword) {
        enqueueSnackbar("Password updated", { variant: "success" });
    }
    const handleFireStore = async () => {
        try {
            await updateDoc(doc(db, "users", currentUser?.uid), {
                uid: currentUser?.uid,
                displayName: currentUser?.displayName,
                email: currentUser?.email,
                photoURL: photoURL
            });


        } catch (err) {
            console.log(err);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault()
        setClickCount(clickCount + 1)
        const displayName = e.target.name.value;
        const email = e.target.email.value;
        const phoneNumber = e.target.phoneNumber.value;
        const password = e.target.password.value;
        try {

            await updatePassword(password)
            await updateProfileFirebase({ displayName, photoURL });


        } catch (err) {
            console.log(err);
        }


    }
    useEffect(() => {
        if (clickCount > 0) {
            handleFireStore()
        }


    }, [clickCount])
    console.log("photoURL", photoURL)
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
        <Box height={'100vh'} overflow={'auto'} bgcolor={status ? "black" : '#cce6ce'}>
            <Navbar
                setSeatFieldInput={setSeatFieldInput}
                ticketDetails={ticketDetails}
                setAdminInfo={setAdminInfo}
                adminInfo={adminInfo}
                status={status}
                change={change}
            ></Navbar>
            <Box mt={12}>
                <h2 style={{textAlign:'center',textTransform:"uppercase",fontWeight:'bold'}}>Update profile</h2>
                <Card sx={{ width: '50vh', mx: 'auto' }}>
                    <CardContent>
                        <Box position={'relative'} mb={2} mx={'auto'} sx={{ width: '25vh', height: "25vh", objectFit: 'cover', }}>
                            <input type="file" accept='.png,.jpg,jpeg' onChange={(e) => setImg(e.target.files[0])} id='file' style={{ display: 'none' }} />
                            <IconButton>

                                <label htmlFor="file">
                                    {
                                        img ?
                                            <img style={{ width: "25vh", height: "25vh", borderRadius: "50%", objectFit: 'cover', zIndex: -1 }} src={URL.createObjectURL(img)} alt="no img" /> :
                                            <Box >

                                                <img style={{ width: "25vh", height: "25vh", borderRadius: "50%", objectFit: 'cover', zIndex: -1 }} src={currentUser?.photoURL ? currentUser?.photoURL : noUser} alt="no img" />

                                            </Box>

                                    }
                                    <EditIcon sx={{ position: 'absolute', top: "10vw", right: "5.5vw", zIndex: 1, color: "white" }}></EditIcon>
                                </label>

                            </IconButton>


                        </Box>

                        <form action="" onSubmit={handleProfileUpdate}>
                            <TextField color='success' name='name' defaultValue={currentUser?.displayName} size='small' margin='normal' label={'Name'} fullWidth required></TextField>
                            <TextField color='success' inputProps={{ readOnly: true }} name='email' defaultValue={currentUser?.email} size='small' margin='normal' type='email' label={'Email'} fullWidth required></TextField>
                            <TextField color='success' name='password' size='small' margin='normal' type='password' label={'Change Password'} fullWidth required></TextField>
                            <TextField color='success' name='phoneNumber' size='small' margin='normal' type='number' label={'Phone Number'} fullWidth ></TextField>
                            <Button disabled={progress !== 100} startIcon={<EditIcon></EditIcon>} type='submit' color='success' variant='contained' fullWidth sx={{ p: 1, mt: 1 }} size="small">Update Profile</Button>
                        </form>

                    </CardContent>
                    <CardActions>

                    </CardActions>
                </Card>
            </Box>
        </Box>
    );
};

export default Profile;