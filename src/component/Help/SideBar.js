import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import Search from './Search';
import Chats from './Chats';
import { ChatContext } from '../Context/ChatContext';

const SideBar = ({ setIsOpen }) => {

    return (
        <Box >
            {
                <Box>
                    <Box>
                        <Typography pl={2} pt={2} component={'div'} fontSize={22} fontWeight={'bold'}>Chat</Typography>
                    </Box>
                    <Search setIsOpen={setIsOpen}></Search>
                    <Chats setIsOpen={setIsOpen}></Chats>
                </Box>
            }

        </Box>
    );
};

export default SideBar;