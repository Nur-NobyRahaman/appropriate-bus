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

const Dboard = ({ change, status, adminInfo, setAdminInfo }) => {
    const auth = getAuth();
    const [user, setUser] = useState([]);
    const [sideBarSelect, setSideBarSelect] = useState("userInfo");
    const handleSideBarSelect = (data) => {
        setSideBarSelect(data);
    };



    console.log("auth", auth);
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            setUser(user.filter((item) => item?.id !== id));
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setUser(list);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    console.log("list", user);
    return (
        <Box overflow={'auto'} height={'100vh'} className={status ? "dashBoardPageDark" : "dashBoardPage"}>
            <Navbar
                setAdminInfo={setAdminInfo}
                adminInfo={adminInfo}
                status={status}
                change={change}
            ></Navbar>

            {/* <Box mt={11}>
          <Typography
            textAlign={"center"}
            fontSize={25}
            fontWeight={"bold"}
            mb={3}
          >
            Dashboard
          </Typography>
        </Box> */}

            <Stack direction="row" mt={8.5} spacing={2}>
                <Box flex={0.3} className={status ? "sideBarDark" : "sideBarLight"} height={"90vh"} overflow={'auto'}>
                    <Stack>
                        <Box
                            mt={3}
                            className={(sideBarSelect === "userInfo") ? "sideBarActive" : "sideBar"}
                            onClick={() => handleSideBarSelect("userInfo")}
                        >
                            <Typography sx={{ pl: 2, pt: .5, pb: .5 }}>User Info</Typography>
                        </Box>

                        <Box className={(sideBarSelect === "RouteName") ? "sideBarActive" : "sideBar"} onClick={() => handleSideBarSelect("RouteName")}>
                            <Typography sx={{ pl: 2, pt: .5, pb: .5 }}>Manage Bus</Typography>
                        </Box>
                        <Box className={(sideBarSelect === "busName") ? "sideBarActive" : "sideBar"} onClick={() => handleSideBarSelect("busName")}>
                            <Typography sx={{ pl: 2, pt: .5, pb: .5 }}>Add Bus</Typography>
                        </Box>
                        <Box className={(sideBarSelect === "addHome") ? "sideBarActive" : "sideBar"} onClick={() => handleSideBarSelect("addHome")}>
                            <Typography sx={{ pl: 2, pt: .5, pb: .5 }}>Add home</Typography>
                        </Box>
                        <Box className={(sideBarSelect === "manageHome") ? "sideBarActive" : "sideBar"} onClick={() => handleSideBarSelect("manageHome")}>
                            <Typography sx={{ pl: 2, pt: .5, pb: .5 }}>Manage home</Typography>
                        </Box>
                        <Box className={(sideBarSelect === "addServices") ? "sideBarActive" : "sideBar"} onClick={() => handleSideBarSelect("addServices")}>
                            <Typography sx={{ pl: 2, pt: .5, pb: .5 }}>Add services</Typography>
                        </Box>
                        <Box className={(sideBarSelect === "manageServices") ? "sideBarActive" : "sideBar"} onClick={() => handleSideBarSelect("manageServices")}>
                            <Typography sx={{ pl: 2, pt: .5, pb: .5 }}>Manage services</Typography>
                        </Box>
                    </Stack>
                </Box>
                <Box flex={2.5} textAlign={"center"} overflow={'auto'}>
                    <Typography
                        textTransform={'uppercase'}
                        textAlign={"center"}
                        fontSize={25}
                        fontWeight={"bold"}
                        mb={2}
                        mt={2}
                    >
                        Dashboard
                    </Typography>
                    {(sideBarSelect === "userInfo") ? (
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <TableContainer sx={{ width: { xl: "60vw", lg: "60vw", md: "60vw", sm: "70vw", xs: "70vw" } }} component={Paper}>
                                <Table
                                    size="small"
                                    sx={{ width: "60vw" }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ width: "8vw" }} align="center">
                                                No
                                            </TableCell>
                                            <TableCell sx={{ width: "16vw" }} align="center">
                                                Id
                                            </TableCell>
                                            <TableCell sx={{ width: "8vw" }} align="center">
                                                Name
                                            </TableCell>
                                            <TableCell sx={{ width: "20vw" }} align="center">
                                                Email
                                            </TableCell>
                                            <TableCell sx={{ width: "8vw" }} align="center">
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user?.map((row, index) => (
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
                                                    {row.id}
                                                </TableCell>
                                                <TableCell sx={{ width: "12vw" }} align="center">
                                                    {row.displayName}
                                                </TableCell>
                                                <TableCell sx={{ width: "20vw" }} align="center">
                                                    {row.email}
                                                </TableCell>
                                                <TableCell sx={{ width: "4vw" }} align="center">
                                                    <IconButton
                                                        onClick={() => handleDelete(row?.id)}
                                                        size="small"
                                                    >
                                                        <DeleteIcon color="error"></DeleteIcon>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    ) : null}

                    {
                        (sideBarSelect === "busName") ? <BusInfo></BusInfo> : null
                    }
                    {
                        (sideBarSelect === "RouteName") ? <PlaceName></PlaceName> : null
                    }
                    {
                        (sideBarSelect === "addHome") ? <AddHome></AddHome> : null
                    }
                    {
                        (sideBarSelect === "manageHome") ? <ManageHome></ManageHome> : null
                    }
                    {
                        (sideBarSelect === "addServices") ? <AddServices></AddServices> : null
                    }
                    {
                        (sideBarSelect === "manageServices") ? <MenageServices></MenageServices> : null
                    }
                </Box>
            </Stack>
        </Box>
    );
};

export default Dboard;
