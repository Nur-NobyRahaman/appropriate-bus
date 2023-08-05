import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Slide,
    TextField,
    Typography,
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import "./LocalBus.css";
import { getAuth } from "firebase/auth";
import app from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRightAltSharp, CancelSharp } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LocalBus = ({ change, status, adminInfo, setAdminInfo, ticketDetails, setSeatFieldInput }) => {
    const [placeName, setPlaceName] = useState([]);
    const [allRoute, setAllRoute] = useState([])
    const [busName, setBusName] = useState([]);
    const [input, setInput] = useState("");
    const [findBus, setFindBus] = useState([]);
    const [from, setFrom] = useState("");
    const [empty, setEmpty] = useState("Null");
    const [to, setTo] = useState("");
    const auth = getAuth(app);
    const [user] = useAuthState(auth);
    const [open, setOpen] = React.useState(false);
    const [end, setEnd] = useState('');
    const [singleBus, setSingleBus] = useState('')
    const navigate = useNavigate()



    const handleClickOpen = (data) => {
        console.log(data);
        setOpen(true);
        setEnd(data)

    };

    const handleClose = () => {
        setOpen(false);
    };

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
            const search = busName.filter(
                (bus) => bus.roadName.includes(from) && bus.roadName.includes(to)
            );
            setFindBus(search);


        }

    };

    useEffect(() => {
        fetch(`http://localhost:5000/busName/${end}`)
            .then((res) => res.json())
            .then((data) => {
                setSingleBus(data?.result);
                console.log(data)
            });
    }, [end]);

    useEffect(() => {
        fetch("http://localhost:5000/placeName")
            .then((res) => res.json())
            .then((data) => {
                setPlaceName(data);
                // console.log("placeName", data);
            });
    }, []);
    useEffect(() => {
        fetch("http://localhost:5000/busName")
            .then((res) => res.json())
            .then((data) => {
                setBusName(data);
            });
    }, [from, to]);

    useEffect(() => {
        const routeName = busName.map((data, index) => data.roadName)
        let uniques = [...new Set(routeName.flat(1))];
        setAllRoute(uniques)

    }, [busName])
    return (
        <Box mt={8} color={"sec"} mb={5}>
            <Navbar
                setSeatFieldInput={setSeatFieldInput}
                ticketDetails={ticketDetails}
                setAdminInfo={setAdminInfo}
                adminInfo={adminInfo}
                status={status}
                change={change}
            ></Navbar>
            <Box
                sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, }}

                justifyContent={'center'}
                alignItems={"center"}
                gap={2}
                p={5}
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
                            value={from}
                            onChange={(e) => setInput(e.target.value)}
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
                <Button sx={{ display: { xs: 'none', sm: 'block' }, bgcolor: status && "black", color: status && "white", "&:hover": status && { bgcolor: 'gray' } }} onClick={handleSearch} variant="contained" color="success">
                    Search
                </Button>
            </Box>

            {empty === "Null" ? (
                <Box>
                    <Typography
                        fontSize={22}
                        fontWeight={"bolder"}
                        p={4}
                        textAlign={"center"}
                        sx={{ textTransform: "uppercase" }}
                    >
                        All Bus
                    </Typography>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        fontSize={16}
                        flexWrap={"wrap"}
                        gap={1}
                        p={3}
                    >
                        {busName.map((data, index) => (
                            <Paper
                                onClick={() => handleClickOpen(data?._id)}
                                className={status ? "pageDark card" : "pageLight card"}
                                sx={{
                                    transition: 'all 0.1s ease',
                                    "&:active": {
                                        transform: "scale(0.96)"
                                    },
                                    // backgroundImage: 'linear-gradient(to right, #00bfa5,#00c853)',
                                    bgcolor: status ? null : "#2e7d32",
                                    p: 2,
                                    color: status ? null : "#f9fbe7",
                                    width: {
                                        xl: "10vw",
                                        lg: "15vw",
                                        md: "16vw",
                                        sm: "20vw",
                                        xs: "27vw",
                                    },
                                    height: {
                                        xl: "12vh",
                                        lg: "13vh",
                                        md: "14vh",
                                        sm: "20vh",
                                        xs: "15vh",
                                    },
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                key={index}
                                elevation={3}
                            >
                                {data.name}
                            </Paper>
                        ))}

                    </Box>
                </Box>
            ) : (
                <Box>
                    <Typography
                        fontSize={22}
                        fontWeight={"bolder"}
                        p={4}
                        textAlign={"center"}
                    >
                        {findBus.length > 0 ? "Available Bus" : "All Bus"}
                    </Typography>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={2}
                        mt={3}
                        flexWrap={"wrap"}
                    >
                        {findBus.map((data, index) => (
                            <Paper
                                onClick={() => handleClickOpen(data?._id)}
                                className={status ? "pageDark card" : "pageLight card"}
                                sx={{

                                    bgcolor: status ? null : "#2e7d32",

                                    color: status ? null : "#f9fbe7",
                                    p: 2,
                                    width: {
                                        xl: "10vw",
                                        lg: "15vw",
                                        md: "15vw",
                                        sm: "20vw",
                                        xs: "27vw",
                                    },
                                    height: {
                                        xl: "12vh",
                                        lg: "13vh",
                                        md: "13vh",
                                        sm: "20vh",
                                        xs: "15vh",
                                    },
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                key={index}
                                elevation={3}
                            >
                                {data.name}
                            </Paper>
                        ))}
                        {findBus.length > 0 ? null : "No bus available this road"}
                    </Box>
                </Box>
            )}

            {/* {findBus.length > 0 ? (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
            mt={5}
            flexWrap={"wrap"}
          >
            {findBus.map((data, index) => (
              <Card key={index} sx={{ width: "15vw", m: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography>{data?.name}</Typography>
                </CardContent>
              </Card>
            ))}
            {findBus.length > 0 ? null : "No bus available this road"}
          </Box>
        ) : (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            gap={1}
            p={3}
          >
            {busName.map((data, index) => (
              <Paper
                sx={{ p: 2, width: "20vw", height: "10vh", textAlign: "center" }}
                key={index}
                elevation={3}
              >
                {data.name}
              </Paper>
            ))}
          </Box>
        )} */}

            <Dialog

                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                    <Typography fontSize={18} fontWeight={'bold'} textTransform={'uppercase'}> {singleBus?.name} Details </Typography>
                    {/* <IconButton ><CloseRounded color='error'></CloseRounded></IconButton> */}
                    <IconButton onClick={handleClose}><CancelSharp color='error'></CancelSharp></IconButton>

                </DialogTitle>
                <DialogContent sx={{ width: { xl: '30vw',lg:'35vw',md:'42vw',sm:'48vw' ,xs:'90vw'} ,p:3}}>
                    <Typography fontSize={16} fontWeight={'bold'} textTransform={'uppercase'} textAlign={'center'}> Routes </Typography>
                    <Box display={'flex'} flexWrap={'wrap'} gap={.5} mt={2} alignContent={'center'} justifyContent={"normal"} textAlign={'justify'}>


                        {
                            singleBus?.roadName?.map((data, index, arr) => <Box textAlign={'justify'} display={'flex'} alignContent={'center'} key={index}>
                                {data} <ArrowRightAltSharp sx={{ display: arr.length - 1 === index ? 'none' : 'block' }}></ArrowRightAltSharp>
                            </Box>)
                        }
                    </Box>
                </DialogContent>

            </Dialog>
        </Box>
    );
};

export default LocalBus;