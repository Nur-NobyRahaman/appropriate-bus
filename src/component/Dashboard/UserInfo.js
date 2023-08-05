import { Delete, Edit, ViewAgenda, Visibility } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { db } from '../../firebase.init';
import { useState } from 'react';
import dayjs from 'dayjs';
import { format } from 'timeago.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserInfo = () => {
    const [user, setUser] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const [viewId, setViewId] = useState('');
    const [viewDetails, setVideDetails] = useState([])
    const [deleteDia, setDeleteDia] = useState(false)
    const [count, setCount] = useState(0)
    const [allBusBooking, setAllBusBooking] = useState([]);
    console.log("🚀 ~ file: UserInfo.js:15 ~ UserInfo ~ allBusBooking:", allBusBooking)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "users", deleteId));
            setUser(user.filter((item) => item?.id !== deleteId));
        } catch (err) {
            console.log(err);
        }
        setDeleteDia(false)
    };
    const handleView = (email) => {
        const filter = allBusBooking?.filter((data) => data?.email.includes(email))
        setVideDetails(filter)
        console.log("🚀 ~ file: UserInfo.js:27 ~ handleView ~ filter:", filter)
    }

    useEffect(() => {
        fetch(`http://localhost:5000/busBookingDetails`)
            .then((res) => res.json())
            .then((data) => {
                setAllBusBooking(data?.result);
                console.log(data)
            });
    }, [count]);

    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setUser(list);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    return (
        <Box >
            <Typography sx={{ mt: 3, mb: 3 }} fontSize={20} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'}>User information</Typography>
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <TableContainer sx={{ width: { xl: "60vw", lg: "60vw", md: "60vw", sm: "70vw", xs: "70vw" } }} component={Paper}>
                    <Table
                        size="small"
                        sx={{ width: "60vw" }}
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "4vw", fontWeight: 'bold' }} align="center">
                                    No
                                </TableCell>

                                <TableCell sx={{ width: "12vw", fontWeight: 'bold' }} align="center">
                                    Name
                                </TableCell>
                                <TableCell sx={{ width: "20vw", fontWeight: 'bold' }} align="center">
                                    Email
                                </TableCell>
                                <TableCell sx={{ width: "6vw", fontWeight: 'bold' }} align="center">
                                    View
                                </TableCell>
                                <TableCell sx={{ width: "6vw", fontWeight: 'bold' }} align="center">
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "&:last-child td, &:last-child th": { border: 0 },
                                    }}
                                >
                                    <TableCell
                                        sx={{ width: "4vw" }}
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {index + 1}
                                    </TableCell>

                                    <TableCell sx={{ width: "12vw" }} align="center">
                                        {row.displayName}
                                    </TableCell>
                                    <TableCell sx={{ width: "20vw" }} align="center">
                                        {row.email}
                                    </TableCell>
                                    <TableCell sx={{ width: "6vw" }} align="center">
                                        <IconButton
                                            onClick={() => {
                                                handleView(row?.email)
                                                setViewId(row?.email)
                                                setCount(count + 1)
                                                setOpen(true)
                                            }}
                                            size="small"
                                        >
                                            <Visibility color="success"></Visibility>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell sx={{ width: "6vw" }} align="center">
                                        <IconButton
                                            onClick={() => {
                                                setDeleteId(row?.id)
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

                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle
                >
                    <Typography fontSize={18} fontWeight={'bold'} textTransform={'uppercase'} textAlign={'center'} sx={{ color: 'green' }}>Bus Booking Details</Typography>


                </DialogTitle>
                <DialogContent sx={{ width: '25vw', mt: 1 }}>
                    {
                        viewDetails.length > 0 ?

                            viewDetails?.map((data) => <Box key={data?._id}>
                                <Box>
                                    <Typography fontSize={17} mb={1} mt={1} >  {data?.busName} Bus</Typography>
                                    <Typography color={'primary'} sx={{ mt: 1.5, float: 'right' }} fontSize={11}>{format(data?.date)}</Typography>
                                </Box>

                                <Typography color="text.secondary">Origin : {data?.origin}</Typography>
                                <Typography color="text.secondary">destination : {data?.destination}</Typography>
                                <Typography color="text.secondary">Date: {dayjs(data?.date).format('ddd DD-MM-YYYY')} </Typography>
                                <Typography color="text.secondary">time : {data?.time}</Typography>
                                <Typography color="text.secondary">seat : {data?.totalBooking?.map((data) => data?.name + ",")
                                }</Typography>
                                <Typography color="text.secondary">Price : {data?.totalPrice}</Typography>
                                <Divider sx={{ mt: 1, }}></Divider>
                            </Box>) : <Typography fontSize={17} mb={1} textAlign={'center'} textTransform={'uppercase'}> no ticket booking</Typography>

                    }


                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='success' size='small' onClick={() => {

                        setOpen(false)
                    }}>ok</Button>

                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteDia}
                onClose={() => setDeleteDia(false)}
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
                    <Button variant='contained' size='small' color='error' onClick={() => setDeleteDia(false)}>no</Button>
                    <Button variant='contained' size='small' color='success' onClick={handleDelete
                    } autoFocus>
                        yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserInfo;