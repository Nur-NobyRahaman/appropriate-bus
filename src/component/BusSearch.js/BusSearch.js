import React from 'react';
import LocalBus from '../LocalBus/LocalBus';
import { Box } from '@mui/material';

const BusSearch = ({ change, status, adminInfo, setAdminInfo, ticketDetails, setSeatFieldInput }) => {
    return (
        <Box height={'100vh'} overflow={'auto'} bgcolor={status ? "black" : '#cce6ce'}>
            <LocalBus
                setSeatFieldInput={setSeatFieldInput}
                ticketDetails={ticketDetails}
                setAdminInfo={setAdminInfo}
                adminInfo={adminInfo}
                status={status}
                change={change}></LocalBus>
        </Box>
    );
};

export default BusSearch;