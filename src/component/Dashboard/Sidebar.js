import { Add, AddCard, AddHome, AutoAwesomeMosaic, DepartureBoard, Drafts, Inbox, Info, ManageHistory } from '@mui/icons-material';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import './Dashboard.css'

const Sidebar = ({ setSidebarInfo }) => {
    const [active, setActive] = useState(1)

    return (
        <Box height={'91.5vh'} overflow={'auto'}>
            <Paper sx={{ height: '91.5vh', overflow: 'auto' }} square>
                <List>
                    <ListItem disablePadding className={active === 1 && "sideBarActive"}>
                        <ListItemButton onClick={() => {
                            setActive(1)
                            setSidebarInfo("userInfo")
                        }}>
                            <ListItemIcon>
                                <Info color='success' sx={{ color: active === 1 && 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="User Info" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding className={active === 2 && "sideBarActive"} onClick={() => {
                        setActive(2)
                        setSidebarInfo("manageBus")
                    }}>
                        <ListItemButton>
                            <ListItemIcon>
                                < DepartureBoard color='success' sx={{ color: active === 2 && 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Manage Bus" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding className={active === 3 && "sideBarActive"} onClick={() => {
                        setActive(3)
                        setSidebarInfo("addBus")
                    }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Add color='success' sx={{ color: active === 3 && 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Add Bus" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding className={active === 4 && "sideBarActive"} onClick={() => {
                        setActive(4)
                        setSidebarInfo("addHome")
                    }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddHome color='success' sx={{ color: active === 4 && 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Add home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding className={active === 5 && "sideBarActive"} onClick={() => {
                        setActive(5)
                        setSidebarInfo("manageHome")
                    }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ManageHistory color='success' sx={{ color: active === 5 && 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Manage home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding className={active === 6 && "sideBarActive"} onClick={() => {
                        setActive(6)
                        setSidebarInfo("addServices")
                    }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddCard color='success' sx={{ color: active === 6 && 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Add services" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding className={active === 7 && "sideBarActive"} onClick={() => {
                        setActive(7)
                        setSidebarInfo("manageServices")
                    }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AutoAwesomeMosaic color={'success'} sx={{ color: active === 7 && 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Manage services" />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Paper>

        </Box>
    );
};

export default Sidebar;