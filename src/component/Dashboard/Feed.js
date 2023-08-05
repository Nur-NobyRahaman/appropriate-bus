import { Box, Typography } from '@mui/material';
import React from 'react';
import BusInfo from './BusInfo';
import PlaceName from './PlaceName';
import AddHome from './AddHome';
import ManageHome from './ManageHome';
import AddServices from './Services/AddServices';
import MenageServices from './Services/MenageServices';
import UserInfo from './UserInfo';
import ManageBus from './ManageBus';

const Feed = ({ sidebarInfo ,status}) => {
    console.log("🚀 ~ file: Feed.js:5 ~ Feed ~ sidebarInfo:", sidebarInfo)
    return (
        <Box height={'91.5vh'} overflow={'auto'}>
            {/* <Typography
                textAlign={"center"}
                fontSize={25}
                fontWeight={"bold"}
                mt={2}
            >
                Dashboard
            </Typography> */}
            <Box mt={3}>
            {
                (sidebarInfo === "userInfo") ? <UserInfo status={status}></UserInfo> : null
            }
            {
                (sidebarInfo === "addBus") ? <BusInfo status={status}></BusInfo> : null
            }
            {
                (sidebarInfo === "manageBus") ? <ManageBus status={status}></ManageBus> : null
            }
            {
                (sidebarInfo === "addHome") ? <AddHome status={status}></AddHome> : null
            }
            {
                (sidebarInfo === "manageHome") ? <ManageHome status={status}></ManageHome> : null
            }
            {
                (sidebarInfo === "addServices") ? <AddServices status={status}></AddServices> : null
            }
            {
                (sidebarInfo === "manageServices") ? <MenageServices status={status}></MenageServices> : null
            }
            </Box>

            
        </Box>
    );
};

export default Feed;