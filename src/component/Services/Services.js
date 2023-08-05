import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TextField, Typography } from '@mui/material';
import './Service.css'
import Soney from './SoneyBus/Soney';
import SokalSondha from './SokalSondhaBus/SokalSondha';
import { Navigate, json, useNavigate } from 'react-router';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import app from '../../firebase.init';
import Home from '../Home/Home';
import { AddTask, Done, DoneAll, DoneOutline, ThumbUpAlt } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import Navbar from '../Navbar/Navbar';



const Services = ({ setTicketDetails, change, status, adminInfo, setAdminInfo, ticketDetails, setSeatFieldInput }) => {
    const [open, setOpen] = React.useState(false);
    const [busDetails, setBusDetails] = useState('')
    const [inputField, setInputField] = useState(false)
    const [clicked, setClicked] = useState(0)
    const [nirala, setNirala] = useState(true)
    const [soney, setSoney] = useState(true)
    const [sokalSondha, setSokalSondha] = useState(true)
    const [seatField, setSeatField] = useState(false)
    const [tickedSelect, setTickedSelect] = useState(false)
    const [booked, setBooked] = useState(false);
    const [selectSeat, setSelectSeat] = useState('')
    const [totalSelectSeat, setTotalSelectSeat] = useState([])
    const [showBusDetails, setShowBusDetails] = useState('')
    const [seatArray, setSeatArray] = useState([])
    const [busName, setBusName] = useState('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(0)
    const [origin, setOrigin] = useState('')
    const [addPayment, setAddPayment] = useState(false)
    const [destination, setDestination] = useState('')
    const [checkTicketSelect, setCheckTicketSelect] = useState([])
    const [done, setDone] = useState(false)
    const [trueCount, setTrueCount] = useState(0)
    const [time, setTime] = useState('')
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate()

    const auth = getAuth(app)
    const [user] = useAuthState(auth)


    const handleClickOpen = (value) => {

        setOpen(true);
        if (value === "nirala bus") {
            setNirala(true)
            setSokalSondha(false)
            setSoney(false)
            const bus = {
                Name: "Nirala",
                Type: "Non AC",
                DhakaRoute: "Mohakhali to Tangail",
                TangailRoute: "Tangail to Mohakhali",
                Start: "6.30 am",
                End: "8.30 pm",
                Price: 250,
            }

            setBusDetails(bus)

        }

        else if (value === 'Sony') {
            setNirala(false)
            setSokalSondha(false)
            setSoney(true)
            const bus = {
                Name: "Sony",
                Type: "AC",
                DhakaRoute: "Kollanpur to Tangail",
                TangailRoute: "Tangail to Kollanpur",
                Start: "6 am",
                End: "9 pm",
                Price: 350
            }
            setBusDetails(bus)
        }
        else if (value === 'Sakalsandhya') {
            setNirala(false)
            setSokalSondha(true)
            setSoney(false)
            const bus = {
                Name: "Sakalsandhya",
                Type: "AC",
                TangailRoute: "Kollanpur to Tangail",
                TangailRoute: "Tangail to Kollanpur",
                Start: "6.15 am",
                End: "9.15 pm",
                Price: 350
            }
            setBusDetails(bus)
        }

    };
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
        setCheckTicketSelect([...checkTicketSelect, value])
    }

    const handleClose = (value) => {
        setTrueCount(trueCount + 1)

        setBusName(value)
        console.log(value)
        if (value === "Nirala") {
            setInputField(true)
            setShowBusDetails(value)
            console.log(value)


        }
        else if (value === "Sony") {
            setShowBusDetails(value)
            setInputField(false)
        }
        else if (value === "Sakalsandhya") {
            setShowBusDetails(value)
            setInputField(false)
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
        setOpen(false);
        if (value === "cancel") {
            setNirala(true)
            setSoney(true)
            setSokalSondha(true)
        }

    };


    const handleAddPayment = async (e) => {
        e.preventDefault()
        setAddPayment(true)
    }

    const handlePayment = () => {

        setClicked(clicked + 1)
        fetch("http://localhost:5000/niralaBus", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                busName: "Nirala Bus",
                name: name || user?.displayName,
                email: email || user?.email,
                Phone: phone,
                origin: origin,
                time: time,
                date: new Date(),
                destination: destination,
                totalBooking: totalSelectSeat,
                totalPrice: 250 * totalSelectSeat.length
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
                busName: "Nirala Bus",
                name: name || user?.displayName,
                email: email || user?.email,
                Phone: phone,
                origin: origin,
                time: time,
                date: new Date(),
                destination: destination,
                totalBooking: totalSelectSeat,
                totalPrice: 250 * totalSelectSeat.length
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
            busName: "Nirala Bus",
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


        setTicketDetails(
            {

                name: name || user?.displayName,
                email: email || user?.email,
                Phone: phone,
                origin: origin,
                destination: destination,
                totalBooking: totalSelectSeat,
                totalPrice: 250 * totalSelectSeat.length
            }
        )

        // navigate('/') 

    }
    const totalTrue = seatArray.filter((data) => { return data?.book === true })


    useEffect(() => {
        if (localStorage.getItem(`niralaTicket${time}`) != null) {

            const data = JSON.parse(localStorage.getItem(`niralaTicket${time}`))
            setSeatArray(data)

        }
        else {
            fetch("http://localhost:5000/niralaticket")
                .then((res) => res.json())
                .then((data) => {
                    if (data?.result) {
                        setSeatArray(data?.result)
                    }
                    console.log(data)
                })

            console.log("else")
        }



    }, [time])
    useEffect(() => {
        if (clicked > 0) {
            localStorage.setItem(`niralaTicket${time}`, JSON.stringify(seatArray))
            handleNavigate()
        }



    }, [clicked])

    const handleNavigate = async () => {
        await enqueueSnackbar("Payment successfully", { variant: "success" });
        await navigate('/')
    }
    return (
        <Box mt={10}>
            <Navbar
                setSeatFieldInput={setSeatFieldInput}
                ticketDetails={ticketDetails}
                setAdminInfo={setAdminInfo}
                adminInfo={adminInfo}
                status={status}
                change={change}></Navbar>
            <Typography textAlign={'center'} fontSize={20} fontWeight={'bold'}>Book Your Ticket</Typography>
            <Box mt={3} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
                {nirala ? <Button color='success' variant='contained' sx={{ width: '10vw', pt: 3, pb: 3 }} onClick={() => handleClickOpen("nirala bus")}>
                    nirala bus
                </Button> : null}
                {soney ? <Button color='success' variant='contained' sx={{ width: '10vw', pt: 3, pb: 3 }} onClick={() => handleClickOpen("Sony")}>
                    Sony
                </Button> : null}
                {sokalSondha ? <Button color='success' variant='contained' sx={{ width: '10vw', pt: 3, pb: 3 }} onClick={() => handleClickOpen("Sakalsandhya")}>
                    Sakalsandhya
                </Button> : null}



            </Box>


            <Box mt={5}>
                <Paper sx={{ width: '20vw', mx: 'auto', }}>
                    <form action="" onSubmit={handleAddPayment} >
                        {
                            inputField ?
                                <Box p={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                    <Typography fullWidth textAlign={'center'}> Field this input</Typography>
                                    <TextField inputProps={{ readOnly: true }} label='Name' value={user?.displayName} fullWidth size='small' color='success' onChange={(e) => setName(e.target.value)} margin='normal' type='name' name='name' required />
                                    <TextField inputProps={{ readOnly: true }} label='Email' onChange={(e) => setEmail(e.target.value)} value={user?.email} fullWidth size='small' color='success' margin='normal' type='email' name='email' required />
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

                                    {/* <TextField fullWidth size='small' color='success' margin='normal' type='name' label='Origin' name='origin' required /> */}
                                    {/* <TextField fullWidth size='small' color='success' margin='normal' type='name' label='Destination' name='destination' required /> */}
                                    {/* <Box display={'flex'} gap={3.2} justifyContent={'space-between'}>
                                        <input type="date" name="date" id="" />
                                        <input type="time" name="time" id="" />
                                    </Box> */}

                                    <Button disabled={origin === destination} startIcon={<Done></Done>} fullWidth variant='contained' size='small' sx={{ mt: 1.5 }} color='success' onClick={() => handleClose('seat')}>Select Seat</Button>

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
                                        <Button startIcon={<DoneAll></DoneAll>} disabled={totalTrue?.length < 1} fullWidth sx={{ mt: 3, }} size='small' variant='contained' color='success' onClick={() => handleClose("select")}> ticket selected</Button>
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
                                            <Typography fontWeight={'bold'} variant='div'>BDT 250 ৳</Typography>
                                            <Typography fontWeight={'bold'}>  BDT {250 * totalSelectSeat.length} ৳ </Typography>
                                        </Box>

                                    </Box>
                                    <Button startIcon={<AddTask></AddTask>} type='summit' fullWidth variant='contained' color='success' size='small'>add Payment</Button>

                                </Box> : null
                        }





                    </form>

                </Paper>
                {
                    (showBusDetails === "Sony") ? <Soney busName={busName}></Soney> : null
                }
                {
                    (showBusDetails === "Sakalsandhya") ? <SokalSondha busName={busName}></SokalSondha> : null
                }

            </Box>

            <Dialog
                open={open || addPayment}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle textTransform={'capitalize'} textAlign='center' id="alert-dialog-title">
                    {
                        addPayment ? "Bkash Payment" : "Bus details"
                    }



                </DialogTitle>
                <DialogContent>
                    {addPayment ?
                        <Box>
                            <TextField margin='normal' size='small' color='success' type='number' label='Phone Number'></TextField> <br />
                            <TextField margin='normal' size='small' color='success' type='password' label='password'></TextField>
                            <br />
                            <Typography fontWeight={'bold'}>Taka : {250 * totalSelectSeat.length} ৳</Typography>
                        </Box> :
                        <DialogContentText id="alert-dialog-description">
                            <Typography> Name: {busDetails.Name}</Typography>
                            <Typography> Type: {busDetails.Type} </Typography>
                            <Typography> Route: {busDetails.TangailRoute}  </Typography>
                            <Typography> Route: {busDetails.DhakaRoute} </Typography>
                            <Typography> Start: {busDetails.Start} </Typography>
                            <Typography> End: {busDetails.End} </Typography>
                            <Typography> Price: {busDetails.Price} ৳ </Typography>
                        </DialogContentText>}

                </DialogContent>
                {
                    addPayment ? <DialogActions sx={{ pr: 2, pb: 2 }}>

                        <Button variant='contained' color='error' size='small' onClick={handleClose}>cancel</Button>
                        <Button variant='contained' color='success' size='small' onClick={handlePayment} autoFocus>
                            Payment
                        </Button>
                    </DialogActions> : <DialogActions>

                        <Button color='error' size='small' variant='contained' onClick={() => handleClose("cancel")}>cancel</Button>
                        <Button color='success' size='small' variant='contained' onClick={() => handleClose(busDetails.Name)} autoFocus>

                            Agree
                        </Button>
                    </DialogActions>
                }

            </Dialog>
        </Box>
    );
};
const top100Films = [
    { label: 'Tangail', year: 1994 },
    { label: 'Mohakhali', year: 1972 },

]
const timeArray = [
    { label: '6.30am', },
    { label: '11.30am', },
    { label: '4.30pm', },
    { label: '9.30pm', },

]

export default Services;