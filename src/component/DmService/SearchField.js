import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React from 'react';
import Navbar from '../Navbar/Navbar';
import '../LocalBus/LocalBus.css'
import { Delete, Visibility } from '@mui/icons-material';
import { useState } from 'react';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { format } from 'timeago.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.init';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SearchField = ({ change, status, adminInfo, setAdminInfo, ticketDetails, setSeatFieldInput, searchFieldInput }) => {
    const [user, setUser] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const [viewId, setViewId] = useState('');
    const [viewDetails, setVideDetails] = useState([])
    const [deleteDia, setDeleteDia] = useState(false)
    const [count, setCount] = useState(0)
    const [allBusBooking, setAllBusBooking] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    console.log("🚀 ~ file: UserInfo.js:15 ~ UserInfo ~ allBusBooking:", allBusBooking)
    const [open, setOpen] = React.useState(false);


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
    console.log(searchFieldInput);
    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                if (searchFieldInput) {
                    const filter = list?.filter((data) => { return data?.email.toLowerCase().includes(searchFieldInput.toLowerCase()) || data?.displayName.toLowerCase().includes(searchFieldInput.toLowerCase()) })
                    setUser(filter)
                }
                else {
                    setUser(list);
                }

            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [searchFieldInput]);

    return (
        <Box height={'100vh'} overflow={'auto'} className={status ? null : "homePageLight"} color={"sec"}>
            <Navbar

                setSeatFieldInput={setSeatFieldInput}
                ticketDetails={ticketDetails}
                setAdminInfo={setAdminInfo}
                adminInfo={adminInfo}
                status={status}
                change={change}></Navbar>
            <Paper sx={{ mt: 12, height: '80vh', width: '70vw', mx: "auto", p: 4, overflow: 'auto' }}>
                <Typography fontWeight={'bold'} textAlign={'center'} sx={{ color: 'green' }} fontSize={20}>User Information</Typography>


                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <TableContainer sx={{ width: { xl: "60vw", lg: "60vw", md: "60vw", sm: "70vw", xs: "70vw" }, mt: 3, }} >
                        <Table
                            size="small"
                            sx={{ width: "60vw", border: '1px solid lightgray' }}
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

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user?.map((row, index, arr) => (
                                  
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

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Paper>

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
        </Box>

    );
};

export default SearchField;