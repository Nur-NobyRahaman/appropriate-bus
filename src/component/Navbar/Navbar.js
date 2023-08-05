
import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar, Badge, CardContent, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Menu, MenuItem, Slide, TextField } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { getAuth, signOut } from 'firebase/auth';
import app from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import auth from '../../firebase.init';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Close, Delete, More, Redo } from '@mui/icons-material';
import { format, render, cancel, register } from 'timeago.js';
import dayjs from 'dayjs';
import Profile from '../Proflile/Profile';
import { AuthContext } from '../Context/AuthContext';
import busLogo from '../../../src/image/bus1.png'
import busLogo2 from '../../../src/image/bus2.png'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Navbar = ({ status, change, adminInfo, setAdminInfo, ticketDetails, setSeatFieldInput, searchFieldInput }) => {
    console.log("🚀 ~ file: Navbar.js:34 ~ Navbar ~ searchFieldInput:", searchFieldInput)

    const auth = getAuth(app)
    const [user] = useAuthState(auth)
    const [menu, setMenu] = useState(true)
    const navigate = useNavigate()
    const [niralaBus, setNiralaBus] = useState([])
    const [sony, setSony] = useState([])
    const [sakalsandhya, setSakalsandhya] = useState([])
    const [ticketNotification, setTicketNotification] = useState([])
    console.log("🚀 ~ file: Navbar.js:46 ~ Navbar ~ ticketNotification:", ticketNotification)
    const [userTicket, setUserTicket] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(false);
    const [showAll, setShowAll] = useState(false)
    const [deleteDia, setDeleteDia] = useState(false)
    const [endPoint, setEndPoint] = useState('')
    const [endId, setEndId] = useState('')
    const [confirm, setConfirm] = useState(0)
    const [badge, setBadge] = useState(0)
    const [profile, setProfile] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const [searchDia, setSearchDia] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [is, setIs] = useState(false)
    console.log("🚀 ~ file: Navbar.js:54 ~ Navbar ~ searchValue:", searchValue)

    const open = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = React.useState(false);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
        setOpenDialog(false)
        // setDeleteDia(false)
    };
    const handleDarkMode = () => {
        change()
        setAnchorEl(false);
    };
    const handleSignOutClose = () => {
        signOut(auth)
        setAnchorEl(false);
        // window.location.reload(false)
    };


    const handleDelete = (condition) => {
        setConfirm(confirm + 1)

        if (condition === 'yes') {
            const url = `http://localhost:5000/ticketNotification/${endId}`
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data?.result?.deletedCount > 0) {
                        const reaming = ticketNotification.filter((data) => data?._id !== endId)
                        setTicketNotification(reaming)
                    }
                    console.log(data, "deleted");
                });

            setDeleteDia(false)

        }
        else if (condition === 'no') {
            setDeleteDia(false)
        }




    }

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
        // if (niralaBus.length > 0 || sony.length > 0 || sakalsandhya.length > 0) {
        //     setConfirm(true)
        // }
        // else{
        //     setConfirm(false)

        // }

    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };



    useEffect(() => {
        // fetch("http://localhost:5000/niralaBus")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         const filter = data.result.filter((data) => { return data?.email === currentUser?.email })
        //         setNiralaBus(filter)
        //         console.log(data);
        //         console.log("filter", filter);
        //     })

        // fetch("http://localhost:5000/soneyBus")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         const filter = data.result.filter((data) => { return data?.email === currentUser?.email })
        //         setSony(filter)
        //         console.log(data);
        //         console.log("filter", filter);

        //     })
        // fetch("http://localhost:5000/sokalSondhaBus")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         const filter = data.result.filter((data) => { return data?.email === currentUser?.email })
        //         setSakalsandhya(filter)
        //         console.log(data);
        //         console.log("filter", filter);
        //     })
        fetch("http://localhost:5000/ticketNotification")
            .then((res) => res.json())
            .then((data) => {
                const filter = data.result.filter((data) => { return data?.email === currentUser?.email })
                setTicketNotification(filter)
                console.log(data);
                console.log("filter", filter);
            })



        handleLocalStorage()

    }, [user, currentUser])


    const handleLocalStorage = async () => {
        const userTicket = await JSON.parse(localStorage.getItem(`userTicket${currentUser?.email}`))
        setUserTicket(userTicket)

    }
    const handleProfile = async () => {
        setAnchorEl(false);
        await navigate('/profile')
    }
    const handleSearch = async (e) => {

        setSearchValue(e.target.value)
        setSeatFieldInput(e.target.value)



    }

    const handleFocus = async () => {
        await navigate('/searchField')
    }
    useEffect(() => {
        setSearchValue(searchFieldInput)
    }, [searchFieldInput])
    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <AppBar component="nav" color='success'>
                <Toolbar sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                    <IconButton
                        onClick={() => setMenu(!menu)}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: 'block', sm: "block", md: "none", } }}
                    >
                        {menu ? <MenuIcon /> : <CloseIcon></CloseIcon>}

                    </IconButton>
                    <Box width={'30vw'} sx={{ display: { md: 'none', sm: "none", xs: 'none', lg: "block" } }} display={'flex'} alignItems={'center'} gap={4} >

                        <Box width={'14%'} sx={{
                            display: {
                                lg: 'block',
                                md: 'node', xs: 'none', transition: 'all 0.25s ease',
                                "&:active": {
                                    transform: "scale(1.02)"
                                },
                            }
                        }}>
                            <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={"/busSearch"}>
                                <Box  >
                                    <img style={{ width: '100%', height: '100%', objectFit: 'cover', }} src={busLogo} alt="" /></Box>

                                {/* <img style={{ width: '22%', height: '25%', objectFit: 'cover' }} src={busLogo2} alt="" /> */}
                            </NavLink>
                            {/* <Typography>Bus Search</Typography> */}
                        </Box>


                    </Box>

                    <Box width={'40vw'} display={'flex'} justifyContent={'center'} >
                        {
                            menu ? <Box sx={{ display: { xs: 'none', md: 'flex', sm: 'none' }, justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                                <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={"/"}>Home</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={"/contact"}>Contact</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={"/services"}>Services</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={"/busSearch"}>Local Bus</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={"/help"}>Help</NavLink>
                                {/* <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={"/dmServices"}>dmServices</NavLink> */}
                                {
                                    adminInfo?._id && <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={'/dashboard'}>
                                        Dashboard
                                    </NavLink>
                                }



                            </Box> :

                                <Box p={3} bgcolor={status ? 'black' : '#1b5e20'} sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', left: 0, top: '7vh', width: '100vw', gap: 1.5 }}>
                                    <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={"/"}>Home</NavLink>
                                    <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={"/contact"}>Contact</NavLink>
                                    <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={"/services"}>Services</NavLink>
                                    <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={"/busSearch"}>Local Bus</NavLink>
                                    <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={"/help"}>Help</NavLink>
                                    {
                                        adminInfo?._id && <NavLink className={({ isActive }) => isActive ? "navlinkActive" : "navlink"} to={'/dashboard'}>
                                            Dashboard
                                        </NavLink>
                                    }


                                </Box>
                        }

                    </Box>



                    <Box width={'30vw'} sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                        <Box>

                            {adminInfo?._id && <TextField sx={{ bgcolor: "white", borderRadius: '5px' }} onFocus={handleFocus} onChange={handleSearch} fullWidth size='small' color='success' placeholder='Search user by email or name'></TextField>}
                        </Box>


                        {(user?.displayName || adminInfo?.name) ?
                            <IconButton onClick={handleClickOpenDialog} sx={{ color: 'white' }}>
                                <Badge badgeContent={ticketNotification.length || (userTicket?.busName ? 1 : null)} color="error">
                                    <NotificationsIcon color="common" />
                                </Badge>
                            </IconButton>
                            : null
                        }
                        {(user?.displayName || adminInfo?.name) ?
                            <Typography fontSize={12}>Hi, {user?.displayName || adminInfo?.name}</Typography> : null
                        }

                        {

                            (user?.uid || adminInfo?._id) ? <Avatar sx={{ bgcolor: user?.photoURL ? null : '#311b92', cursor: 'pointer' }} onClick={handleClick} alt={user?.displayName || adminInfo?.name} src={(user?.photoURL) ? user?.photoURL : user?.displayName || adminInfo?.name} /> : <NavLink className={"navlink"} to={"/login"}>Login</NavLink>

                        }



                    </Box>
                </Toolbar>
            </AppBar>
            {
                (user?.uid) &&
                <Menu

                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                    <MenuItem sx={{ fontSize: 'small' }} onClick={handleDarkMode}>{status ? "Light Mode" : "Dark Mode"}</MenuItem>
                    <MenuItem sx={{ fontSize: 'small' }} onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem sx={{ fontSize: 'small' }} onClick={() => handleSignOutClose()}>Logout</MenuItem>



                </Menu>
            }
            {
                (adminInfo?._id) &&
                <Menu

                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <NavLink className={status ? "navlinkDark" : "navLinkLight"} to={'/dashboard'}>
                        <MenuItem sx={{ fontSize: 'small' }} onClick={handleClose}>Dashboard</MenuItem>
                    </NavLink>

                    <MenuItem sx={{ fontSize: 'small' }} onClick={handleDarkMode}>{status ? "Light Mode" : "Dark Mode"}</MenuItem>
                    <MenuItem sx={{ fontSize: 'small' }} onClick={() => {
                        setAdminInfo({})
                        localStorage.setItem("admin", JSON.stringify(""))
                        signOut(auth)
                        navigate('/login')
                        // window.location.reload(false)
                    }}>Logout</MenuItem>



                </Menu>
            }
            {/* {
                (user?.uid) ?
                    <Menu

                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem sx={{ fontSize: 'small' }} onClick={handleDarkMode}>{status ? "Light Mode" : "Dark Mode"}</MenuItem>
                        <MenuItem sx={{ fontSize: 'small' }} onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem sx={{ fontSize: 'small' }} onClick={handleSignOutClose}>Logout</MenuItem>



                    </Menu> : null

                        (adminInfo?._id) ?
                        <Menu

                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <NavLink className={status ? "navlinkDark" : "navLinkLight"} to={'/dashboard'}>
                                <MenuItem sx={{ fontSize: 'small' }} onClick={handleClose}>Dashboard</MenuItem>
                            </NavLink>

                            <MenuItem sx={{ fontSize: 'small' }} onClick={handleDarkMode}>{status ? "Light Mode" : "Dark Mode"}</MenuItem>
                            <MenuItem sx={{ fontSize: 'small' }} onClick={() => {
                                setAdminInfo({})
                                localStorage.setItem("admin", JSON.stringify(""))
                                navigate('/login')
                            }}>Logout</MenuItem>



                        </Menu> : null
            } */}

            <Dialog

                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle textAlign={'center'} fontWeight={'bold'} sx={{ color: 'green' }}>Your Ticket</DialogTitle>
                {
                    showAll && ticketNotification.length > 0 ?
                        <DialogContent sx={{ width: { xl: '25vw',lg:'32vw' ,md:'42vw',sm:'55vw', xs:'80vw'}, }}>

                            {
                                ticketNotification.map((data, index) => <DialogContent key={index} >
                                    <Box>
                                        <Box >
                                            <Typography variant="h6" component="div" >{data?.busName}
                                            </Typography>
                                            <Typography color={'primary'} sx={{ mt: 1.5, float: "right" }} fontSize={11}>{format(data?.date)}</Typography>
                                        </Box>
                                        <Typography>Name: {data?.name}</Typography>
                                        <Typography>Email: {data?.email}</Typography>
                                        <Typography>Origin: {data?.origin}</Typography>
                                        <Typography>Destination: {data?.destination}</Typography>
                                        <Typography>Date: {dayjs(data?.date).format('ddd DD-MM-YYYY')} </Typography>
                                        <Typography>Time: {data?.time}</Typography>
                                        <Typography>TransactionId: {data?.trans}</Typography>
                                        {/* {
                                   data?.totalBooking?.map((data,index)=> <Typography key={index}>Seat Number: {data?.name}</Typography>)
                                } */}

                                        <Typography key={index}>Seat Number: {data?.totalBooking?.map((data) => data?.name + " , ")}</Typography>
                                        <Typography>Price: {data?.totalPrice}</Typography>
                                        <Button sx={{ mt: 1 }} onClick={() => {
                                            setEndId(data?._id)
                                            setDeleteDia(true)
                                        }} startIcon={<Delete></Delete>} variant='contained' color='error' size='small' fullWidth>Delete</Button>
                                    </Box>
                                    <Divider sx={{ mt: 2 }}></Divider>
                                </DialogContent>)
                            }

                        </DialogContent> :
                        <DialogContent sx={{ width: { xl: '20vw',lg:'30vw',md:'40vw',sm:'52vw' ,xs:'80vw'}, mt: 1 }}>
                            <Box>
                                <Box mb={1}>
                                    <Typography variant="h6" component="div" >{userTicket?.busName}
                                    </Typography>
                                    <Typography color={'primary'} sx={{ mt: 1.5, float: 'right' }} fontSize={11}>{userTicket?.date ? format(new Date(userTicket?.date)) : null}</Typography>
                                </Box>
                                <Typography>Name: {userTicket?.name}</Typography>
                                <Typography>Email: {userTicket?.email}</Typography>
                                <Typography>Origin: {userTicket?.origin}</Typography>
                                <Typography>Destination: {userTicket?.destination}</Typography>
                                {/* {
                                   data?.totalBooking?.map((data,index)=> <Typography key={index}>Seat Number: {data?.name}</Typography>)
                                } */}
                                <Typography>Date: {dayjs(userTicket?.date).format('ddd DD-MM-YYYY')} </Typography>
                                <Typography>Time: {userTicket?.time}</Typography>
                                <Typography >Seat Number: {userTicket?.totalBooking?.map((data) => data?.name + " , ")}</Typography>
                                <Typography>Price: {userTicket?.totalPrice}</Typography>
                                <Typography>TransactionId: {userTicket?.trans}</Typography>
                            </Box>
                        </DialogContent>
                }

                <CardContent>

                </CardContent>
                <DialogActions>
                    {
                        showAll && ticketNotification.length > 0 ?
                            <Button variant='contained' endIcon={<Redo></Redo>} size='small' color='success' onClick={() => setShowAll(false)}>back</Button> :
                            <Button disabled={ticketNotification.length === 0} variant='contained' size='small' startIcon={<More></More>} color='success' onClick={() => setShowAll(true)}>More</Button>

                    }

                    <Button size='small' variant='contained' color='error' onClick={handleCloseDialog}>Close</Button>

                </DialogActions>
            </Dialog>



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
                open={searchDia}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setSearchDia(false)}
                aria-describedby="alert-dialog-slide-description"
                fullScreen
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent sx={{ width: '100vw' }}>
                    {/* <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSearchDia(false)}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>



        </Box>
    );
};

export default Navbar;