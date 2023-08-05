import {
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import app, { db } from "../../firebase.init";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Dashboard.css";
import { deleteUser, getAuth } from "firebase/auth";
import PlaceName from "./PlaceName";
import BusInfo from "./BusInfo";
import ManageHome from "./ManageHome";
import AddHome from "./AddHome";
import AddServices from "./Services/AddServices";
import MenageServices from "./Services/MenageServices";
import Sidebar from "./Sidebar";
import Feed from "./Feed";



const Dashboard = ({ change, status, adminInfo, setAdminInfo,setSeatFieldInput }) => {
  const [sidebarInfo, setSidebarInfo] = useState("userInfo")

  return (
    <Box overflow={'auto'} height={'100vh'} className={status ? "dashBoardPageDark" : "dashBoardPage"}>
      <Navbar
       setSeatFieldInput={setSeatFieldInput}
        setAdminInfo={setAdminInfo}
        adminInfo={adminInfo}
        status={status}
        change={change}
      ></Navbar>
      <Stack direction="row" spacing={2} mt={8}>

        <Box flex={.4}>
          <Sidebar status={status} setSidebarInfo={setSidebarInfo}>
          </Sidebar>
        </Box>

        <Box flex={2}>
          <Feed  sidebarInfo={sidebarInfo}></Feed>
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
