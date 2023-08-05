import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TextField, Typography } from '@mui/material';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import app from '../../../firebase.init';
import { AddTask, Done, DoneAll } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const SokalSondha = ({ busName }) => {
    const [busDetails, setBusDetails] = useState('')
    const [inputField, setInputField] = useState(false)
    const [clicked, setClicked] = useState(0)
    const [seatField, setSeatField] = useState(false)
    const [tickedSelect, setTickedSelect] = useState(false)
    const [booked, setBooked] = useState(false);
    console.log(booked)
    const [selectSeat, setSelectSeat] = useState('')
    const [totalSelectSeat, setTotalSelectSeat] = useState([])
    const [showBusDetails, setShowBusDetails] = useState('')
    const [seatArray, setSeatArray] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(0)
    const [origin, setOrigin] = useState('')
    const [addPayment, setAddPayment] = useState(false);
    const [destination, setDestination] = useState('')
    const [checkTicketSelect, setCheckTicketSelect] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const [time, setTime] = useState('')
    const [done, setDone] = useState(false)
    const auth = getAuth(app)
    const [user] = useAuthState(auth)
    const navigate = useNavigate()



    // const handleClickOpen = (value) => {


    //     if (value === "nirala bus") {

    //         const bus = {
    //             Name: "Nirala",
    //             Type: "Non AC",
    //             DhakaRoute: "Mohakhali to Tangail",
    //             TangailRoute: "Tangail to Mohakhali",
    //             Start: "6.30 am",
    //             End: "8.30 pm"
    //         }

    //         setBusDetails(bus)

    //     }

    //     else if (value === 'Soney') {

    //         const bus = {
    //             Name: "Soney",
    //             Type: "AC",
    //             DhakaRoute: "Kollanpur to Tangail",
    //             TangailRoute: "Tangail to Kollanpur",
    //             Start: "6 am",
    //             End: "9 pm"
    //         }
    //         setBusDetails(bus)
    //     }
    //     else if (value === 'SokalSondha') {

    //         const bus = {
    //             Name: "SokalSondha",
    //             Type: "AC",
    //             TangailRoute: "Kollanpur to Tangail",
    //             TangailRoute: "Tangail to Kollanpur",
    //             Start: "6.15 am",
    //             End: "9.15 pm"
    //         }
    //         setBusDetails(bus)
    //     }

    // };
    const handleSeat = (value, isBook) => {
        console.log(value, isBook)
        setSeatArray(
            seatArray.map((data, index) => {
                if (data.name === value) {
                    return { ...data, book: !isBook };
                }
                return data;
            })
        )

        setSelectSeat(value)



    }

    const handleClose = (value) => {
        setInputField(true)
        if (value === "Nirala") {

            setShowBusDetails(value)
            console.log(value)


        }
        else if (value === "Soney") {
            setShowBusDetails(value)

        }
        else if (value === "SokalSondha") {
            setShowBusDetails(value)

        }
        else if (value === "seat") {
            setSeatField(true)

        }
        else if (value === "select") {
            setTickedSelect(true)
            const totalBook = seatArray.filter((data) => data?.book === true)
            setTotalSelectSeat(totalBook)
            console.log(totalBook)
        }
        setAddPayment(false)

    };


    const handleAddPayment = async (e) => {
        e.preventDefault()
        setAddPayment(true)

    }
   
    const handlePayment = () => {
        setClicked(clicked + 1);

        fetch("http://localhost:5000/sokalSondhaBus", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                busName: "Sakalsandhya Bus",
                name: name || user?.displayName,
                email: email || user?.email,
                Phone: phone,
                origin: origin,
                time: time,
                date: new Date(),
                destination: destination,
                totalBooking: totalSelectSeat,
                totalPrice: 350 *  totalSelectSeat.length
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // if (data?.status) {
                //     enqueueSnackbar(`${data?.status}`, { variant: "success" });
                // }
                console.log(data, "admin Place Name");
            });
        fetch("http://localhost:5000/ticketNotification", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                busName: "Sakalsandhya Bus",
                name: name || user?.displayName,
                email: email || user?.email,
                Phone: phone,
                origin: origin,
                time: time,
                date: new Date(),
                destination: destination,
                totalBooking: totalSelectSeat,
                totalPrice: 350 *  totalSelectSeat.length
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // if (data?.status) {
                //     enqueueSnackbar(`${data?.status}`, { variant: "success" });
                // }
                console.log(data, "admin Place Name");
            });

        localStorage.setItem(`userTicket${user?.email}`, JSON.stringify({
            busName: "Sakalsandhya Bus",
            name: name || user?.displayName,
            email: email || user?.email,
            Phone: phone,
            origin: origin,
            time: time,
            date: new Date(),
            destination: destination,
            totalBooking: totalSelectSeat,
            totalPrice: 250 * totalSelectSeat.length
        }))

        setSeatArray(
            seatArray.map((data, index) => {
                if (data?.book === true) {
                    return { ...data, book: false, ticketSelect: "Done" };
                }
                return data;
            })

        )

        setAddPayment(false)





    }


    useEffect(() => {
        if (localStorage.getItem(`sakalsandhyaTicket${time}`) != null) {
            const data = JSON.parse(localStorage.getItem(`sakalsandhyaTicket${time}`))
            setSeatArray(data)

        }
        else {
            fetch("http://localhost:5000/sokalSondhaTicket")
                .then((res) => res.json())
                .then((data) => {
                    if (data?.result) {
                        setSeatArray(data?.result)
                    }
                    console.log(data)
                })
        }

        // fetch("http://localhost:5000/sokalSondhaTicket")
        //         .then((res) => res.json())
        //         .then((data) => {
        //             if (data?.result) {
        //                 setSeatArray(data?.result)
        //             }
        //             console.log(data)
        //         })



    }, [time])
    useEffect(() => {
        if (clicked > 0) {
            localStorage.setItem(`sakalsandhyaTicket${time}`, JSON.stringify(seatArray))
            handleNavigate()
        }

    }, [clicked])
    const totalTrue = seatArray.filter((data) => {return data?.book === true})

    const handleNavigate = async () => {
        await enqueueSnackbar("Payment successfully", { variant: "success" });
        await navigate('/')
    }
    return (
        <Box>
            <Paper sx={{ width: '20vw', mx: 'auto', }}>
                <form action="" onSubmit={handleAddPayment} >
                    {
                        busName ?
                            <Box p={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <TextField inputProps={{readOnly: true}} label='Name' value={user?.displayName} fullWidth size='small' color='success' onChange={(e) => setName(e.target.value)} margin='normal' type='name' name='name' required />
                                <TextField  inputProps={{readOnly: true}} label='Email' onChange={(e) => setEmail(e.target.value)} value={user?.email} fullWidth size='small' color='success' margin='normal' type='email' name='email' required />
                                <TextField onChange={(e) => setPhone(e.target.value)} fullWidth size='small' color='success' margin='normal' type='number' label='phone' name='phone' required />
                                <Autocomplete
                                    onChange={(event, value) => setOrigin(value?.label)}
                                    size='small'
                                    fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}

                                    renderInput={(params) => <TextField margin='normal' {...params} label="Origin" required />}
                                />
                                <Autocomplete
                                    onChange={(event, value) => setDestination(value?.label)}
                                    size='small'
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    fullWidth
                                    renderInput={(params) => <TextField margin='normal' {...params} label="Destination" required />}
                                />
                                <Autocomplete
                                    onChange={(event, value) => setTime(value?.label)}
                                    size='small'
                                    disablePortal
                                    id="combo-box-demo"
                                    options={timeArray}
                                    fullWidth
                                    renderInput={(params) => <TextField margin='normal' {...params} label="Time" required />}
                                />
                                {/* <Box display={'flex'} gap={3.2} justifyContent={'space-between'}>
                            <input type="date" name="date" id="" />
                            <input type="time" name="time" id="" />
                        </Box> */}

                                <Button startIcon={<Done></Done>} disabled={origin === destination} fullWidth variant='contained' size='small' sx={{ mt: 1.5 }} color='success' onClick={() => handleClose('seat')}>Select Seat</Button>
                            </Box> : null
                    }
                    {
                        seatField ? <Box width={'20vw'} pb={2} mx={'auto'}  >
                            <Typography textAlign={'center'}> Chose Your Seat</Typography>
                            <Box mt={2} >
                                <Box textAlign={'center'} display={'grid'} gridTemplateColumns={"10% 10% 10% 10%"} gap={2} justifyContent={'center'} alignItems={'center'}>

                                    {
                                        seatArray.map((data, index) => <Box key={index}>

                                            {
                                                (data?.ticketSelect === "Done") ? <Paper key={index} className='seat' sx={{ backgroundColor: "#263238" }} onClick={() =>
                                                    console.log(data?.name)
                                                }><Typography>{data?.name}</Typography></Paper>
                                                    :
                                                    <Paper key={index} className='seat' sx={{ backgroundColor: (data?.book) ? "gray" : null }} onClick={() => handleSeat(data?.name, data?.book)}><Typography>{data?.name}</Typography></Paper>
                                            }

                                        </Box>)
                                    }

                                </Box>
                                <Box p={4}>
                                    <Button startIcon={<DoneAll></DoneAll>} fullWidth sx={{ mt: 3, }} size='small' variant='contained' disabled={totalTrue?.length < 1} color='success' onClick={() => handleClose("select")}>Tick selected</Button>
                                </Box>

                            </Box>
                        </Box> : null
                    }
                    {
                        tickedSelect ?
                            <Box mb={10} pl={4} pr={4} pb={4}>

                                <Box pl={4} mb={2} display={'flex'} alignItems={'center'} gap={2} justifyContent={'center'}>
                                    <Box>
                                        <Typography fontWeight={'bold'} variant='div'>Ticket Price : </Typography>
                                        <Typography fontWeight={'bold'}> Your bill :  </Typography>
                                    </Box>
                                    <Box>
                                        <Typography fontWeight={'bold'} variant='div'>BDT 350 tk</Typography>
                                        <Typography fontWeight={'bold'}>  BDT {350 * totalSelectSeat.length} tk </Typography>
                                    </Box>

                                </Box>
                                <Button startIcon={<AddTask></AddTask>} type='summit' fullWidth variant='contained' color='success' size='small'>Add Payment</Button>
                            </Box> : null
                    }





                </form>

            </Paper>
            <Dialog
                open={addPayment}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle textTransform={'capitalize'} textAlign='center' id="alert-dialog-title">
                    Bkash Payment
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField margin='normal' size='small' color='success' type='number' label='Phone Number'></TextField> <br />
                        <TextField margin='normal' size='small' color='success' type='password' label='password'></TextField>
                        <br />
                        <Typography>Taka : {350 * totalSelectSeat.length}</Typography>
                    </DialogContentText>

                </DialogContent>
                <DialogActions sx={{ pr: 2, pb: 2 }}>

                    <Button variant='contained' color='error' size='small' onClick={handleClose}>cancel</Button>
                    <Button variant='contained' color='success' size='small' onClick={handlePayment} autoFocus>
                        Payment
                    </Button>
                </DialogActions>


            </Dialog>
        </Box>
    );
};
const top100Films = [
    { label: 'Tangail', },
    { label: 'Kallyanpur', },

]

const timeArray = [
    { label: '6.15am', },
    { label: '11.15am', },
    { label: '4.15pm', },
    { label: '9.15pm', },

]
export default SokalSondha;