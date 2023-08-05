import { Box } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

const Navigation = async () => {
     const  { currentUser } = useContext(AuthContext);
    const navigate = useNavigate()
    const handleNavigate = async () => {
        await navigate('/login')
    }
    return (
        <Box>

        </Box>
    );
};

export default Navigation;