import { Avatar, Box, Button, Collapse, Divider, IconButton, InputAdornment, List, ListItemButton, ListItemIcon, ListSubheader, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import app, { db } from '../../firebase.init';
import { ExpandLess, ExpandMore, Flare, Inbox, Send, StarBorder } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { query, where } from "firebase/firestore";
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const Search = ({ setIsOpen }) => {

    const [username, setUsername] = useState('')
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);
    console.log("🚀 ~ file: Search.js:17 ~ Search ~ user:", user)
    const [err, setErr] = useState(false)
    const { currentUser } = useContext(AuthContext);
    console.log("🚀 ~ file: Search.js:20 ~ Search ~ currentUser:", currentUser)
    const { currentAdmin } = useContext(AuthContext)
    console.log("🚀 ~ file: Search.js:22 ~ Search ~ currentAdmin:", currentAdmin)
    const { dispatch } = useContext(ChatContext);
    const [open, setOpen] = React.useState(true);
    const [admins, setAdmins] = useState([])
    const [searchStatus, setSearchStatus] = useState('')


    const handleClick = () => {
        setOpen(!open);
    };


    const handleSearch = async () => {

        if (currentUser?.uid && !currentAdmin?.uid) {

            const q = query(collection(db, "admin"), where("displayName", "==", username));

            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot?._snapshot?.docChanges.length > 0) {
                    setSearchStatus("Not found")
                }

                querySnapshot.forEach((doc) => {
                    if (doc.data()?.uid) {
                        setUser(doc.data())
                    }
                    else {
                        setErr(true)
                        console.log("else");
                    }

                    console.log(doc.id, " => ", doc.data());
                });

            } catch (err) {
                setErr(true)
                console.log(err);
            }
        }
        else if (currentAdmin?.uid && currentUser?.uid) {
            console.log("clicked");
            const q = query(collection(db, "users"), where("displayName", "==", username));

            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot?._snapshot?.docChanges.length > 0) {
                    setSearchStatus("Not found")
                }

                querySnapshot.forEach((doc) => {
                    setUser(doc.data())
                    console.log(doc.id, " => ", doc.data());
                });

            } catch (err) {
                setErr(true)
                console.log(err);
            }

        }




    };
    // console.log(user);

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleUseOpen = () => {
        setIsOpen(true)
    }


    const handleSelect = async (user) => {
        console.log("🚀 ~ file: Search.js:98 ~ handleSelect ~ user:", user)
        handleChatOpen(user)

        const combinedId = currentUser?.uid > user?.uid ?
            currentUser?.uid + user?.uid :
            user?.uid + currentUser?.uid;

        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                console.log('click', combinedId);
                // create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                // create user chats

                await updateDoc(doc(db, "userChats", currentUser?.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user?.uid,
                        displayName: user?.displayName,
                        photoURL: user?.photoURL,

                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", user?.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser?.uid,
                        displayName: currentUser?.displayName,
                        photoURL: currentUser?.photoURL,

                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
            }
        }
        catch (err) {
            console.log(err);
        }


        setUser(null)
        setUsername('')
        handleUseOpen()
    }

    const handleChatOpen = async (user) => {
        const u = {
            displayName: user?.displayName,
            photoURL: user?.photoURL,
            uid: user?.uid
        }
        dispatch({ type: "CHANGE_USER", payload: u })
        console.log("🚀 ~ file: Search.js:150 ~ handleChatOpen ~ u:", u)
    }
    useEffect(() => {
        fetch('http://localhost:5000/getadmin')
            .then((res) => res.json())
            .then((data) => {
                setAdmins(data?.result)
                console.log(data)
            })
    }, [])
    console.log(users);
    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                if (currentUser?.uid && !currentAdmin?.uid) {
                    const querySnapshot = await getDocs(collection(db, "admin"));
                    querySnapshot.forEach((doc) => {
                        list.push({ id: doc.id, ...doc.data() });
                    });
                    setUsers(list);

                }
                else if (currentAdmin?.uid && currentUser?.uid) {
                    const querySnapshot = await getDocs(collection(db, "users"));
                    querySnapshot.forEach((doc) => {
                        list.push({ id: doc.id, ...doc.data() });
                    });
                    setUsers(list);
                }

            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [currentAdmin, currentUser]);

    return (
        <Box p={2} >
            {/* <Box>
                <TextField value={username} onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} placeholder='find a user' sx={{ backgroundColor: 'whitesmoke' }} InputProps={{
                    startAdornment: <InputAdornment position='start'><SearchIcon></SearchIcon></InputAdornment>
                }}
                    size='small' />

            </Box>
            {
                err && <Typography>User not found</Typography>
            }
            {
                user ?
                    <Box onClick={handleSelect} display={'flex'} gap={1} mb={1} mt={1} alignItems={'center'} sx={{ "&:hover": { backgroundColor: '#f5f5f5' }, p: 1, cursor: 'pointer' }}>
                        <Avatar sx={(user?.photoURL) ? null : { bgcolor: '#311b92' }} alt={user?.displayName} src={(user?.photoURL) ? user?.photoURL : user?.displayName} />
                        <Typography>{user?.displayName}</Typography>
                        <Divider></Divider>

                    </Box> : <Typography>{searchStatus}</Typography>

            } */}






            <Box display={'flex'} alignItems={'center'} gap={2}>
                <Typography fontSize={16}>{currentUser?.uid && !currentAdmin?.uid ? "Admin" : "All users"}</Typography>
                <IconButton onClick={handleClick}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </Box>



            <Collapse in={open} timeout="auto" unmountOnExit>
                {
                    users?.map((user, index) => <List key={index} component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} onClick={() =>
                            handleSelect(user)

                        }>
                            <ListItemIcon>
                                <Avatar alt={user?.displayName} src={(user?.photoURL) ? user?.photoURL : user?.displayName} />
                            </ListItemIcon>
                            <ListItemText primary={user?.displayName} />
                        </ListItemButton>
                    </List>)
                }

            </Collapse>

        </Box >
    );
};

export default Search;