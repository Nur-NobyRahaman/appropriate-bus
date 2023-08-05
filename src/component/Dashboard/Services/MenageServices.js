import { CancelSharp, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const MenageServices = () => {
    const [buses, setBuses] = useState([])
    const [singleBus, setSingleBus] = useState('')
    console.log("🚀 ~ file: MenageServices.js:10 ~ MenageServices ~ singleBus:", singleBus)
    const [deleteDia, setDeleteDia] = useState(false)
    const [editDia, setEditeDia] = useState(false)
    const [endId, setEndId] = useState('')
    const [timeSchedule, setTimeSchedule] = useState('')
    const [busName, setBusName] = useState('');
    const [price, setPrice] = useState(0);
    const [end, setEnd] = useState('');
    const [start, setStart] = useState('')
    const [destination, setDestination] = useState('')
    const [origin, setOrigin] = useState('')
    const [busType, setBusType] = useState('')
    const [allTimeSchedule, setAllTimeSchedule] = useState([]);
    const { enqueueSnackbar } = useSnackbar()

    const handleDelete = (condition) => {

        if (condition === 'yes') {
            const url = `http://localhost:5000/addServices/${endId}`
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data?.result?.deletedCount > 0) {
                        const reaming = buses.filter((data) => data?._id !== endId)
                        setBuses(reaming)
                    }
                    console.log(data, "deleted");
                });

            setDeleteDia(false)

        }
        else if (condition === 'no') {
            setDeleteDia(false)
        }
    }

    const handleAllTimeSchedule = () => {
        setAllTimeSchedule([...allTimeSchedule, timeSchedule])
        setTimeSchedule('')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target.busName.value;
        const type = e.target.busType.value;
        const origin = e.target.origin.value;
        const destination = e.target.destination.value;
        const start = e.target.start.value;
        const end = e.target.end.value;
        const price = e.target.price.value;

        fetch(`http://localhost:5000/addServices/${singleBus?._id}`, {
            method: "PUT", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                type,
                origin,
                destination,
                start,
                end,
                price,
                allTimeSchedule: allTimeSchedule.length > 0 ? allTimeSchedule : singleBus?.allTimeSchedule

            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.result?.modifiedCount > 0) {
                    setEditeDia(false)
                    enqueueSnackbar(`${data?.status}`, { variant: "success" });
                }
                console.log(data, "admin Place Name");
            });

        console.log('click', name, type, origin, destination, start, end, price);
        // e.target.reset()
        setAllTimeSchedule([])
    };

    useEffect(() => {
        setBusName(singleBus?.name);
        setBusType(singleBus?.type);
        setOrigin(singleBus?.origin);
        setDestination(singleBus?.destination);
        setStart(singleBus?.start);
        setEnd(singleBus?.end);
        setPrice(singleBus?.price);
    }, [singleBus])

    useEffect(() => {
        fetch("http://localhost:5000/addServices")
            .then(res => res.json())
            .then(data => {
                setBuses(data?.result)
                console.log(data)
            })
    }, [editDia])
    return (
        <Box >
            <Typography fontSize={20} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'}>Manage Services</Typography>
            <Box mt={3} display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}>

                <TableContainer sx={{ width: { xl: "32vw", lg: "32vw", md: "60vw", sm: "70vw", xs: "70vw" } }} component={Paper}>
                    <Table
                        size="small"
                        sx={{ width: "32vw" }}
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "8vw" }} align="center">
                                    No
                                </TableCell>
                                <TableCell sx={{ width: "8vw" }} align="center">
                                    Bus Name
                                </TableCell>
                                <TableCell sx={{ width: "8vw" }} align="center">
                                    Edit
                                </TableCell>
                                <TableCell sx={{ width: "8vw" }} align="center">
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {buses?.map((row, index) => (
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
                                    <TableCell sx={{ width: "22vw" }} align="center">
                                        {row.name}
                                    </TableCell>
                                    <TableCell sx={{ width: "12vw" }} align="center">
                                        <IconButton
                                            onClick={() => {
                                                setSingleBus(row)
                                                setEditeDia(true)
                                            }}
                                            size="small"
                                        >
                                            <Edit color="success"></Edit>
                                        </IconButton>
                                    </TableCell>

                                    <TableCell sx={{ width: "4vw" }} align="center">
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
                open={editDia}
                onClose={() => setEditeDia(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                    <Typography fontSize={18} fontWeight={'bold'} textTransform={'uppercase'} sx={{ color: "green" }}> Update to {singleBus?.name} Bus</Typography>
                    {/* <IconButton ><CloseRounded color='error'></CloseRounded></IconButton> */}
                    <IconButton onClick={() => setEditeDia(false)}><CancelSharp color='error'></CancelSharp></IconButton>

                </DialogTitle>

                <DialogContent sx={{ width: '30vw' }}>
                    <Box sx={{ width: { xl: "25vw", lg: "25vw", md: "25vw", sm: "60vw", xs: '70vw' }, pt: 3, pl: 5, pr: 5, pb: 3, mx: 'auto' }}>
                        <Box mb={2}>
                            <Typography textAlign={'center'} fontSize={20} fontWeight={'bold'} textTransform={'uppercase'}> Add bus for ticket</Typography>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <TextField fullWidth margin='normal' size='small' onChange={(e) => setBusName(e.target.value)} value={busName} color='success' name='busName' label='Bus Name' />
                            <TextField fullWidth margin='normal' size='small' onChange={(e) => setBusType(e.target.value)} value={busType} color='success' name='busType' label='Bus Type' />
                            <TextField fullWidth margin='normal' size='small' onChange={(e) => setOrigin(e.target.value)} value={origin} color='success' name='origin' label='Origin' />
                            <TextField fullWidth margin='normal' size='small' onChange={(e) => setDestination(e.target.value)} value={destination} color='success' name='destination' label='Destination' />
                            <TextField fullWidth margin='normal' size='small' onChange={(e) => setStart(e.target.value)} value={start} color='success' name='start' label='Start' />
                            <TextField fullWidth margin='normal' size='small' onChange={(e) => setEnd(e.target.value)} value={end} color='success' name='end' label='End' />
                            <TextField fullWidth margin='normal' type='number' onChange={(e) => setPrice(e.target.value)} value={price} size='small' name='price' color='success' label='Price' />
                            <TextField fullWidth margin='normal' size='small' color='success' value={timeSchedule} onChange={(e) => setTimeSchedule(e.target.value)} label='Bus time schedule' />
                            <Button onClick={handleAllTimeSchedule} variant='contained' color='secondary' sx={{ float: 'right' }}>Add time</Button>
                            <Button type='submit' sx={{ p: 1, mt: 1 }} variant='contained' fullWidth size='small' color='success'>Add services</Button>
                        </form>
                    </Box>
                </DialogContent>

                {/* <DialogActions>
                    <Button variant='contained' size='small' color='error' onClick={() => setEditeDia(false)}>no</Button>
                    <Button variant='contained' size='small' color='success' onClick={() =>
                        handleDelete("yes")
                    } autoFocus>
                        yes
                    </Button>
                </DialogActions> */}
            </Dialog>

        </Box>
    );
};

export default MenageServices;