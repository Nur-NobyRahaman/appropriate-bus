import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import { useEffect } from 'react';
import { useState } from 'react';
import { AddTask, CancelSharp, Done, DoneAll } from '@mui/icons-material';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import './DmService.css'
import SearchField from './SearchField';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51NbcPSAyUC0FH7xaAANPoXNwkASRCErTz5m6wCa8HQain9W0yjwni8yCiLyJUbGxNGW83py5RJlTN08QkhRXeqoC00byrQtkvL');

const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.

};

const DmService = ({ change, status, adminInfo, setAdminInfo, ticketDetails, setSeatFieldInput }) => {
    const [buses, setBuses] = useState([])
    const [busDetails, setBusDetails] = useState('')
    const [inputField, setInputField] = useState(false)
    const [open, setOpen] = React.useState(false);
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
    const { currentUser } = useContext(AuthContext)
    const [age, setAge] = React.useState('');
    const [seatField, setSeatField] = useState(false);
    const [selectSeat, setSelectSeat] = useState('')
    const [tickedSelect, setTickedSelect] = useState(false)
    const [totalSelectSeat, setTotalSelectSeat] = useState([])
    const [clicked, setClicked] = useState(0)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [allRoute, setAllRoute] = useState([])
    const [from, setFrom] = useState("");
    const [empty, setEmpty] = useState("Null");
    const [to, setTo] = useState("");
    const [findBus, setFindBus] = useState([]);
    const [successPayment, setSuccessPayment] = useState(false)
    const [trans, setTrans] = useState('')
    const ref = useRef();


    const bookingDetails = {
        busName: busDetails?.name,
        name: name || currentUser?.displayName,
        email: email || currentUser?.email,
        Phone: phone,
        time: time,
        date: new Date().getTime(),
        origin: origin,
        destination: destination,
        totalBooking: totalSelectSeat,
        totalPrice: busDetails?.price * totalSelectSeat.length
    }


    const handleChange = (event) => {
        setAge(event.target.value);
    };


    const handleClickOpen = (value) => {
        if (value === "seat") {
            setSeatField(true)
        }
        else if (value === "select") {
            setTickedSelect(true)
            const totalBook = seatArray.filter((data) => data?.book === true)
            setTotalSelectSeat(totalBook)
            console.log(totalBook)
        }
    }
    const handleClose = () => {
        setOpen(false);
        setBusDetails('')
        setInputField(false)
        setTickedSelect(false)
        setSeatField(false)

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



    }
    const handleAddPayment = async (e) => {
        e.preventDefault()
        setAddPayment(true)

    }


    const handlePayment = () => {
        setClicked(clicked + 1);


        fetch("http://localhost:5000/busBookingDetails", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                busName: busDetails?.name,
                name: name || currentUser?.displayName,
                email: email || currentUser?.email,
                Phone: phone,
                time: time,
                date: new Date().getTime(),
                origin: origin,
                destination: destination,
                totalBooking: totalSelectSeat,
                trans: trans,
                totalPrice: busDetails?.price * totalSelectSeat.length
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
                busName: busDetails?.name,
                name: name || currentUser?.displayName,
                email: email || currentUser?.email,
                Phone: phone,
                time: time,
                date: new Date().getTime(),
                origin: origin,
                destination: destination,
                totalBooking: totalSelectSeat,
                trans: trans,
                totalPrice: busDetails?.price * totalSelectSeat.length
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // if (data?.status) {
                //     enqueueSnackbar(`${data?.status}`, { variant: "success" });
                // }
                console.log(data, "admin Place Name");
            });

        localStorage.setItem(`userTicket${currentUser?.email}`, JSON.stringify({
            busName: busDetails?.name,
            name: name || currentUser?.displayName,
            email: email || currentUser?.email,
            Phone: phone,
            time: time,
            date: new Date().getTime(),
            origin: origin,
            destination: destination,
            totalBooking: totalSelectSeat,
            trans: trans,
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

    const handleFromInput = (value) => {
        if (value) {
            setFrom(value);
        } else {
            setEmpty("Null");
        }
    };
    const handleToInput = (value) => {
        if (value) {
            setTo(value);
        } else {
            setEmpty("Null");
        }
    };

    const handleSearch = () => {
        if (from && to) {
            setEmpty("notNull");
            const search = buses.filter(
                (bus) => { return (bus.origin.toLowerCase().includes(from.toLowerCase()) || bus.destination.toLowerCase().includes(from.toLowerCase())) && (bus.origin.toLowerCase().includes(to.toLowerCase()) || bus.destination.toLowerCase().includes(to.toLowerCase())) }
            );
            setFindBus(search);


        }

    };
    console.log(findBus);

    // get buses
    useEffect(() => {
        fetch("http://localhost:5000/addServices")
            .then(res => res.json())
            .then(data => {
                setBuses(data?.result)
                console.log(data)
            })
    }, [])

    useEffect(() => {
        if (successPayment) {
            handlePayment()
        }
    }, [successPayment])
    // filter bus route 
    useEffect(() => {

        let route = buses.map((data, index) => { return [data.origin, data.destination] })
        let uniques = [...new Set(route.flat(1))];
        setAllRoute(uniques)

    }, [buses])

    // get seats

    useEffect(() => {
        if (localStorage.getItem(`${busDetails?.name}${time}`) != null) {
            const data = JSON.parse(localStorage.getItem(`${busDetails?.name}${time}`))
            setSeatArray(data)

        }
        else {
            fetch("http://localhost:5000/soneyTicket")
                .then((res) => res.json())
                .then((data) => {
                    if (data?.result) {
                        setSeatArray(data?.result)
                    }
                    console.log(data)
                })
        }



    }, [time])


    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [inputField, seatField, tickedSelect])

    const busSeat = {
        seatDetails: busDetails?.name + time,
        seatArray
    }
    console.log("🚀 ~ file: DmService.js:295 ~ hanlde ~ busSeat:", busSeat)
    const hanlde = () => {

    }
    useEffect(() => {
        if (clicked > 0) {
            localStorage.setItem(`${busDetails?.name}${time}`, JSON.stringify(seatArray));
            handleNavigate()
        }
        hanlde()
    }, [clicked]);

    const totalTrue = seatArray.filter((data) => { return data?.book === true })

    const handleNavigate = async () => {
        await enqueueSnackbar("Payment successfully", { variant: "success" });
        await navigate('/')
    }
    return (
        <Box height={'100vh'} overflow={'auto'} bgcolor={status ? "#424242" : "#cce6ce"}>
            <Navbar
                setSeatFieldInput={setSeatFieldInput}
                ticketDetails={ticketDetails}
                setAdminInfo={setAdminInfo}
                adminInfo={adminInfo}
                status={status}
                change={change}></Navbar>
            <Box pl={5} pr={5}>



                <Typography sx={{ mt: 11 }} textAlign={'center'} fontSize={20} fontWeight={'bold'}>Book Your Ticket</Typography>
                <Box
                    sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, }}

                    justifyContent={'center'}
                    alignItems={"center"}
                    gap={2}
                    p={1.5}
                    mt={2}
                >

                    <Autocomplete
                        onChange={(index, value) => handleFromInput(value)}
                        color="success"
                        size="small"
                        disablePortal
                        getOptionLabel={(allRoute) => `${allRoute}`}
                        options={allRoute}
                        id="combo-box-demo"
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField
                                // value={from}
                                // onChange={(e) => setInput(e.target.value)}
                                color="success"
                                size="small"
                                {...params}
                                label="From"
                            />
                        )}
                    />

                    <Autocomplete
                        onChange={(index, value) => handleToInput(value)}
                        color="success"
                        size="small"
                        disablePortal
                        getOptionLabel={(allRoute) => `${allRoute}`}
                        options={allRoute}
                        id="combo-box-demo"
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField color="success" size="small" {...params} label="To" />
                        )}
                    />
                    <Button fullWidth sx={{ display: { xs: 'block', sm: 'none' }, bgcolor: status && "black", color: status && "white", "&:hover": status && { bgcolor: 'gray' } }} onClick={handleSearch} variant="contained" color="success">
                        Search
                    </Button>
                    <Button sx={{ display: { xs: 'none', sm: 'none' }, bgcolor: status && "black", color: status && "white", "&:hover": status && { bgcolor: 'gray' } }} onClick={handleSearch} variant="contained" color="success">
                        Search
                    </Button>
                </Box>
                <Box mt={3} ref={ref}>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2} flexWrap={'wrap'}>


                        {busDetails ? <Button color='success' sx={{ width: { xl: '10vw', lg: '15vw', md: '21vw', sm: '25vw', xs: '40vw' }, height: { xl: '10vh', lg: '13vh', md: "15vh", sm: '17vh', xs: '20vh' }, pt: 3, pb: 3 }} variant='contained' onClick={() => {
                            setOpen(true)
                        }} >{busDetails?.name}</Button> :


                            empty === "Null" ? buses?.map((data) =>
                                <Box key={data?._id} >
                                    <Button color='success' sx={{ bgcolor: status && "black", color: status && "white", "&:hover": status && { bgcolor: 'gray' }, width: { xl: "10vw", lg: '15vw', md: "21vw", sm: '25vw', xs: "35vw" }, height: { xl: '10vh', lg: '13vh', md: '15vh', sm: '17vh', xs: '20vh' }, pt: 3, pb: 3, textTransform: 'capitalize' }} variant='contained' onClick={() => {
                                        setBusDetails(data)
                                        setOpen(true)
                                    }} >{data?.name}</Button>
                                </Box>) :

                                <Box display={'fex'} gap={2} flexWrap={'wrap'}>
                                    {
                                        findBus.length > 0 ? findBus?.map((data, index, arr) =>

                                            <Box  >
                                                <Button color='success' sx={{ bgcolor: status && 'black', color: status && 'white', width: { xl: "10vw", lg: '15vw', md: '21vw', sm: '25vw', xs: '35vw' }, height: { xl: '10vh', lg: '13vh', md: '15vh', xs: '20vh' }, pt: 3, pb: 3, textTransform: 'capitalize' }} variant='contained' onClick={() => {
                                                    setBusDetails(data)
                                                    setOpen(true)
                                                }} >{data?.name}</Button>
                                            </Box>) : "No bus available this road"
                                    }
                                </Box>




                        }
                    </Box>



                    <Box mt={3} ref={ref}>
                        <Paper sx={{ width: { xl: '20vw', lg: '30vw', md: '50vw', sm: "50vw" }, mx: 'auto', }}>
                            <form action="" onSubmit={handleAddPayment}>
                                {
                                    inputField &&
                                    <Box ref={ref} p={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                        <Typography fullWidth textAlign={'center'}> Field this input</Typography>
                                        <TextField inputProps={{ readOnly: true }} label='Name' value={currentUser?.displayName || currentUser?.name} fullWidth size='small' color='success' onChange={(e) => setName(e.target.value)} margin='normal' type='name' name='name' required />
                                        <TextField inputProps={{ readOnly: true }} label='Email' value={currentUser?.email} onChange={(e) => setEmail(e.target.value)} fullWidth size='small' color='success' margin='normal' type='email' name='email' required />
                                        <TextField onChange={(e) => setPhone(e.target.value)} fullWidth size='small' color='success' margin='normal' type='number' label='phone' name='phone' required />

                                        <FormControl size='small' fullWidth margin='normal'>
                                            <InputLabel id="demo-simple-select-label">Origin</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={origin}
                                                label="Origin"
                                                onChange={(e) => setOrigin(e.target.value)}
                                            >
                                                <MenuItem value={busDetails.origin}>{busDetails.origin}</MenuItem>
                                                <MenuItem value={busDetails.destination}>{busDetails.destination}</MenuItem>

                                            </Select>
                                        </FormControl>
                                        <FormControl size='small' fullWidth margin='normal'>
                                            <InputLabel id="demo-simple-select-label">Destination</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={destination}
                                                label="Destination"
                                                onChange={(e) => setDestination(e.target.value)}
                                            >
                                                <MenuItem value={busDetails.destination}>{busDetails.destination}</MenuItem>
                                                <MenuItem value={busDetails.origin}>{busDetails.origin}</MenuItem>


                                            </Select>
                                        </FormControl>
                                        <FormControl size='small' fullWidth margin='normal'>
                                            <InputLabel id="demo-simple-select-label">Time</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={time}
                                                label="Time"
                                                onChange={(e) => setTime(e.target.value)}
                                            >
                                                {
                                                    busDetails?.allTimeSchedule?.map((data) => <MenuItem key={data?._id} value={data}>{data}</MenuItem>)
                                                }




                                            </Select>
                                        </FormControl>


                                        <Button disabled={origin === destination} startIcon={<Done></Done>} fullWidth variant='contained' size='small' sx={{ mt: 1.5 }} color='success' onClick={() => handleClickOpen('seat')}>Select Seat</Button>

                                    </Box>
                                }

                                {
                                    seatField ? <Box ref={ref} pb={2} mx={'auto'}  >
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
                                                                <Paper key={index} className='seat' onClick={() => handleSeat(data?.name, data?.book)} sx={{ backgroundColor: (data?.book) ? "gray" : null }} ><Typography>{data?.name}</Typography></Paper>
                                                        }

                                                    </Box>)
                                                }

                                            </Box>
                                            <Box p={4}>
                                                <Button startIcon={<DoneAll></DoneAll>} fullWidth sx={{ mt: 3, }} size='small' variant='contained' disabled={totalTrue?.length < 1} color='success' onClick={() => handleClickOpen("select")}>Ticket selected</Button>
                                            </Box>

                                        </Box>
                                    </Box> : null
                                }
                                {
                                    tickedSelect ?
                                        <Box ref={ref} mb={10} pl={4} pr={4} pb={4}>

                                            <Box pl={4} mb={2} display={'flex'} alignItems={'center'} gap={2} justifyContent={'center'}>
                                                <Box>
                                                    <Typography fontWeight={'bold'} variant='div'>Ticket Price : </Typography>
                                                    <Typography fontWeight={'bold'}> Your bill :  </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography fontWeight={'bold'} variant='div'>{busDetails.price} ৳</Typography>
                                                    <Typography fontWeight={'bold'}>   {busDetails.price * totalSelectSeat.length} ৳ </Typography>
                                                </Box>

                                            </Box>
                                            <Button startIcon={<AddTask></AddTask>} type='summit' fullWidth variant='contained' color='success' size='small'>add Payment</Button>
                                        </Box> : null
                                }
                            </form>

                        </Paper>
                    </Box>

                </Box>

            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Bus Details
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', gap: 1 }}>
                    <Box id="alert-dialog-description" >
                        <Typography > Name: </Typography>
                        <Typography> Type:  </Typography>
                        <Typography> Route:   </Typography>
                        <Typography> Route:  </Typography>
                        <Typography> Start:  </Typography>
                        <Typography> End:  </Typography>
                        <Typography> Price:  </Typography>
                    </Box>
                    <Box id="alert-dialog-description">
                        <Typography> {busDetails.name}</Typography>
                        <Typography> {busDetails.type} </Typography>
                        <Typography> {busDetails.origin} to {busDetails.destination}  </Typography>
                        <Typography> {busDetails.destination} to {busDetails.origin} </Typography>
                        <Typography> {busDetails.start} </Typography>
                        <Typography> {busDetails.end} </Typography>
                        <Typography> {busDetails.price} ৳ </Typography>
                    </Box>




                </DialogContent>

                <DialogActions>
                    <Button color='error' size='small' variant='contained' onClick={handleClose}>Disagree</Button>
                    <Button color='success' size='small' variant='contained' onClick={() => {
                        setInputField(true)
                        setOpen(false)
                    }} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={addPayment}
                onClose={() => setAddPayment(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                    <Typography fontSize={18} fontWeight={'bold'} textTransform={'capitalize'}> Please pay for {busDetails?.name} ticket </Typography>
                    {/* <IconButton ><CloseRounded color='error'></CloseRounded></IconButton> */}
                    <IconButton onClick={() => setAddPayment(false)}><CancelSharp color='error'></CancelSharp></IconButton>

                </DialogTitle>
                <DialogContent>
                    <DialogContentText>

                        <Typography>Please Pay : {busDetails.price * totalSelectSeat.length}</Typography>
                    </DialogContentText>


                </DialogContent>
                <DialogContent sx={{ width: { xl: '25vw', lg: "40vw", md: "55vw", sm: '60vw', xs: '83vw' } }}>
                    <DialogContentText>
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm
                                trans={trans}
                                setTrans={setTrans}
                                setSuccessPayment={setSuccessPayment}
                                name={currentUser?.displayName || currentUser?.name}
                                email={currentUser?.email}
                                price={busDetails.price * totalSelectSeat.length} />
                        </Elements>
                    </DialogContentText>


                </DialogContent>



            </Dialog>

        </Box>
    );
};

export default DmService;