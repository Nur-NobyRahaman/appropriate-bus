import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useState } from 'react';

const AddServices = () => {
    const [timeSchedule, setTimeSchedule] = useState('')
    const [allTimeSchedule, setAllTimeSchedule] = useState([])
    const { enqueueSnackbar } = useSnackbar()
    console.log("🚀 ~ file: AddServices.js:8 ~ AddServices ~ allTimeSchedule:", allTimeSchedule)

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

        fetch("http://localhost:5000/addServices", {
            method: "POST", // or 'PUT'
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
                allTimeSchedule

            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.status) {
                    enqueueSnackbar(`${data?.status}`, { variant: "success" });
                    e.target.reset()
                }
                console.log(data, "admin Place Name");
            });

        console.log('click', name, type, origin, destination, start, end, price);
        // e.target.reset()
        setAllTimeSchedule([])
    };
    return (
        <Box>
            <Paper sx={{ width: { xl: "40vw", lg: "40vw", md: "50vw", sm: "60vw", xs: '70vw' }, pt: 3, pl: 5, pr: 5, pb: 3, mx: 'auto' }}>
                <Box mb={2}>
                    <Typography textAlign={'center'} fontSize={20} fontWeight={'bold'} textTransform={'uppercase'}> Add bus for ticket</Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                    <TextField required fullWidth margin='normal' size='small' color='success' name='busName' label='Bus Name' />
                    <TextField required fullWidth margin='normal' size='small' color='success' name='busType' label='Bus Type' />
                    <TextField required fullWidth margin='normal' size='small' color='success' name='origin' label='Origin' />
                    <TextField required fullWidth margin='normal' size='small' color='success' name='destination' label='Destination' />
                    <TextField required fullWidth margin='normal' size='small' color='success' name='start' label='Start' />
                    <TextField required fullWidth margin='normal' size='small' color='success' name='end' label='End' />
                    <TextField required fullWidth margin='normal' type='number' size='small' name='price' color='success' label='Price' />
                    <TextField fullWidth margin='normal' size='small' color='success' value={timeSchedule} onChange={(e) => setTimeSchedule(e.target.value)} label='Bus time schedule' />
                    <Button onClick={handleAllTimeSchedule} variant='contained' color='secondary' sx={{ float: 'right' }}>Add time</Button>
                    <Button disabled={allTimeSchedule.length === 0} type='submit' sx={{ p: 1, mt: 1 }} variant='contained' fullWidth size='small' color='success'>Add services</Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AddServices;