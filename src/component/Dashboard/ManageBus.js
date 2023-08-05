import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Slide, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './Dashboard.css'
import { ArrowRightAltSharp, CancelSharp, Close, CloseRounded, HighlightOffTwoTone } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ManageBus = ({ status }) => {
    const [busName, setBusName] = useState([])
    console.log("🚀 ~ file: ManageBus.js:14 ~ ManageBus ~ busName:", busName)
    const [open, setOpen] = React.useState(false);
    const [end, setEnd] = useState('');
    const [singleBus, setSingleBus] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [v, setV] = useState(singleBus?.name);
    console.log("🚀 ~ file: ManageBus.js:20 ~ ManageBus ~ v:", v)
    const [busType, setBusType] = useState('');
    const [route, setRoute] = useState('');
    const [roadList, setRoadList] = useState([])
    const [count,setCount] =useState(0)
    console.log("🚀 ~ file: ManageBus.js:24 ~ ManageBus ~ roadList:", roadList)


    const handleClickOpen = (data) => {
        setOpen(true);
        setEnd(data)

    };
    const handleAdd = () => {
        setBusName(
            busName.map((data) => {
                if (data?.name === singleBus?.name) {
                    setRoadList([...data?.roadName, route]);
                    return [...data?.roadName, route]

                }
                return data
            }))

    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const bus = {
            name: v,
            type: busType,
            roadName: roadList,
        }
        fetch(`http://localhost:5000/busNamePut/${singleBus?._id}`, {
            method: "PUT", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: v,
                type: busType,
                roadName: roadList,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.result?.modifiedCount) {
                    setIsEdit(false)
                    // enqueueSnackbar(`${data?.status}`, { variant: "success" });
                    // setOpen(false);
                    // setUpdatedStatus(data?.status)
                    //     navigate("/login");
                    // } else {
                    //     enqueueSnackbar(`${data?.result}`, { variant: "warning" });
                }
                console.log(data, "admin register");
            });
            setRoute('')
            setRoadList([])
            setCount(count + 1)
        console.log(bus);
    }

    const handleDelete = () => {
        const url = `http://localhost:5000/busName/${end}`
        fetch(url, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.result?.deletedCount > 0) {
                    const reaming = busName.filter((data) => data?._id !== end)
                    setBusName(reaming)
                }
                console.log(data, "deleted");
            });
    }

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setV(singleBus?.name)
    }, [isEdit])
    

    useEffect(() => {
        fetch(`http://localhost:5000/busName/${end}`)
            .then((res) => res.json())
            .then((data) => {
                setSingleBus(data?.result);
                console.log(data)
            });
    }, [end,count]);
    useEffect(() => {
        fetch("http://localhost:5000/busName")
            .then((res) => res.json())
            .then((data) => {
                setBusName(data);
            });
    }, [isEdit , count]);
    console.log("🚀 ~ file: ManageBus.js:120 ~ ManageBus ~ count:", count)
    return (
        <Box>
            <Typography sx={{ mb: 3, mt: 3 }} fontSize={20} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'}>Manage Local bus</Typography>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={16}
                flexWrap={"wrap"}
                gap={2}
                p={3}
            >
                {busName?.map((data, index) => (
                    <Paper
                        onClick={() => handleClickOpen(data?._id)}
                        className={status ? "pageDark card" : "pageLight card"}
                        sx={{
                            transition: 'all 0.1s ease',
                            "&:active": {
                                transform: "scale(0.96)"
                            },
                            bgcolor: status ? null : "#66bb6a",
                            p: 2,
                            color: status ? null : "#f9fbe7",
                            width: {
                                xl: "10vw",
                                lg: "15vw",
                                md: "15vw",
                                sm: "15vw",
                                xs: "27vw",
                            },
                            height: {
                                xl: "12vh",
                                lg: "13vh",
                                md: "13vh",
                                sm: "15vh",
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
                <DialogContent sx={{ width: '30vw' }}>
                    <Typography  fontSize={14} fontWeight={'bold'} textTransform={'uppercase'} > Bus Type : {singleBus?.type} </Typography>
                    <Typography sx={{mt:1}} fontSize={16} fontWeight={'bold'} textTransform={'uppercase'} textAlign={'center'}> Routes </Typography>
                    <Box display={'flex'} flexWrap={'wrap'} gap={.5} mt={2} alignContent={'center'} justifyContent={"normal"} textAlign={'justify'}>


                        {
                            singleBus?.roadName?.map((data, index) => <Box textAlign={'justify'} display={'flex'} alignContent={'center'} key={index}>
                                {data} <ArrowRightAltSharp></ArrowRightAltSharp>
                            </Box>)
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='success' size='small' onClick={() => setIsEdit(true)}>Edit</Button>
                    <Button variant='contained' color='error' size='small' onClick={() => {
                        setEnd(singleBus?._id)
                        handleDelete()
                        setOpen(false)
                    }}>Delete</Button>
                </DialogActions>
            </Dialog>

            <Dialog

                open={isEdit}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setIsEdit(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle >
                    <Typography fontSize={18} fontWeight={'bold'} textTransform={'uppercase'} textAlign={'center'}>  {singleBus?.name}  update</Typography>


                </DialogTitle>
                <DialogContent sx={{ width: '30vw' }}>
                    <form onSubmit={handleUpdate}>
                        <TextField fullWidth placeholder='Bus Name' size='small' color='success' value={v} onChange={(e) => setV(e.target.value)} margin='normal' required></TextField>
                        <TextField fullWidth label='Bus Type' size='small' color='success' margin='normal' onChange={e => setBusType(e.target.value)} required></TextField>
                        <TextField fullWidth label='Add Bus Route' size='small' color='success' margin='normal' onChange={e => setRoute(e.target.value)}></TextField>
                        <Button variant='contained' color='secondary' size='small' onClick={handleAdd}>Add</Button>
                        <DialogActions>
                            <Button variant='contained' color='error' size='small' onClick={() => {
                                setIsEdit(false)
                                setOpen(false)
                            }}>cancel</Button>
                            <Button disabled={roadList?.length === 0} type='submit' variant='contained' color='success' size='small' onClick={() => {
                                setEnd(singleBus?._id)
                                setOpen(false)
                            }}>update</Button>
                        </DialogActions>
                    </form>
                    {/* <Typography fontSize={16} fontWeight={'bold'} textTransform={'uppercase'} textAlign={'center'}> Routes </Typography>
                    <Box display={'flex'} flexWrap={'wrap'} gap={.5} mt={2} alignContent={'center'} justifyContent={"normal"} textAlign={'justify'}>



                        {
                            singleBus?.roadName?.map((data, index) => <Box textAlign={'justify'} display={'flex'} alignContent={'center'} key={index}>
                                {data} <ArrowRightAltSharp></ArrowRightAltSharp>
                            </Box>)
                        }
                    </Box> */}
                </DialogContent>

            </Dialog>
        </Box>
    );
};

export default ManageBus;