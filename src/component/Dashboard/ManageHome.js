import { AddCard, Delete, Edit, Update } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import noUser from '../../../src/image/nouser.jpg'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase.init';
import uploadImage from '../../../src/image/upload.jpg'
import { useSnackbar } from 'notistack';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ManageHome = () => {
    const [editValue, setEditValue] = useState('')
    const [homeData, setHomeData] = useState([])
    const [deleteDia, setDeleteDia] = useState(false)
    const [endId, setEndId] = useState('')
    const [open, setOpen] = React.useState(false);
    const [img, setImg] = useState('')
    const [progress, setProgress] = useState(0)
    const [title, setTitle] = useState(editValue?.title)
    const [description, setDescription] = useState('')
    const [photoURL, setPhotoURL] = useState('');
    const[inputClick,setInputClick] = useState(false)
   
    const [updateStatus,setUpdatedStatus] =useState('')
    const { enqueueSnackbar } = useSnackbar()
    console.log("🚀 ~ file: ManageHome.js:27 ~ ManageHome ~ editValue:", editValue)
    console.log("🚀 ~ file: ManageHome.js:27 ~ ManageHome ~ editValue:", editValue?.title)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    console.log("🚀 ~ file: ManageHome.js:12 ~ ManageHome ~ endId:", endId)


    const handleDelete = (condition) => {


        if (condition === 'yes') {
            const url = `http://localhost:5000/addHome/${endId}`
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data?.result?.deletedCount > 0) {
                        const reaming = homeData.filter((data) => data?._id !== endId)
                        setHomeData(reaming)
                    }
                    console.log(data, "deleted");
                });

            setDeleteDia(false)

        }
        else if (condition === 'no') {
            setDeleteDia(false)
        }
    }

    const handleUpdate = () => {
        fetch(`http://localhost:5000/addHome/${editValue?._id}`, {
            method: "PUT", // or 'PUT'
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
                if (data?.result?.modifiedCount) {
                    enqueueSnackbar(`${data?.status}`, { variant: "success" });
                    setOpen(false);
                    setUpdatedStatus(data?.status)
                    //     navigate("/login");
                    // } else {
                    //     enqueueSnackbar(`${data?.result}`, { variant: "warning" });
                }
                console.log(data, "admin register");
            });
    }



    useEffect(() => {
        fetch("http://localhost:5000/addHome")
            .then(res => res.json())
            .then(data => {
                setHomeData(data?.result)
                console.log(data);
            })
    }, [updateStatus])
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
        <Box mt={5}>
            <Typography fontSize={20} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'}>Manage home</Typography>
            <Box mt={2}>
                <TableContainer sx={{ width: { xl: "60vw", lg: "60vw", md: "60vw", sm: "70vw", xs: "70vw" }, mx: 'auto' }} component={Paper}>
                    <Table size='small' sx={{ width: '60vw' }}>
                        <TableHead >
                            <TableRow >
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">No</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Image</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Title</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Edit</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {homeData.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center" sx={{ width: "10vw" }}>
                                        <Box>
                                            <img src={row?.photoURL} style={{ width: '50%', height: '50%', objectFit: 'cover' }} alt="" />
                                        </Box>


                                    </TableCell>
                                    <TableCell align="center">{row?.title ? row?.title : "No title"}</TableCell>
                                    <TableCell align="center">{row?.Description ? row?.Description : "No description"}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => {
                                                setOpen(true)
                                                setEditValue(row)
                                            }}

                                            size="small"
                                        >
                                            <EditNoteIcon color="success"></EditNoteIcon>

                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => {
                                                setEndId(row?._id)
                                                setDeleteDia(true)
                                            }}
                                            size="small"
                                        >
                                            <Delete color="error"></Delete>
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Dialog
                open={deleteDia}
                onClose={() => handleDelete('no')}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete?
                </DialogTitle> */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button variant='contained' size='small' color='error' onClick={() => handleDelete('no')}>no</Button>
                    <Button variant='contained' size='small' color='success' onClick={() =>
                        handleDelete("yes")
                    } autoFocus>
                        yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Update here</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText> */}
                    <Button
                        id='file'
                        sx={{ width: '10vw', height: "15vh", mt: 2 }}
                    >
                        {
                            img ? <img src={URL.createObjectURL(img)} style={{ width: '100%', }} alt="" /> : <img style={{ width: '100%', }} src={editValue?.photoURL} alt="" />
                        }
                        <img style={{ width: '100%', }} id='file' alt="" />
                    </Button>
                    <input onChange={(e) => setImg(e.target.files[0])} accept='.png,.jpg,jpeg' type="file" name="" id="" />
                </DialogContent>
                <DialogContent>
                    <TextField onChange={e => setTitle(e.target.value)} fullWidth label='Title' value={title} placeholder='title'   color='success' size='small' margin='normal'></TextField> <br />
                    <TextField onChange={e => setDescription(e.target.value)} value={description} fullWidth label='Description' color='success' size='small' margin='normal'></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdate} startIcon={<Update></Update>} disabled={progress !== 100} sx={{ p: 1 }} fullWidth size="small" variant='contained' color='success'>Update</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ManageHome;  