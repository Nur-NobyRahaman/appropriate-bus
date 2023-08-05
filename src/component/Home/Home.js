import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import SlideBar from "./SlideBar/SlideBar";
import ServiceShow from "./ServiceShow/ServiceShow";
import Footer from "../Footer/Footer";


const Home = ({ change, status, adminInfo, setAdminInfo, ticketDetails, setSeatFieldInput, searchFieldInput }) => {

  // useEffect(() => {
  //   window.location.reload(false)
  // }, [])
  return (
    <Box height={"100vh"}  overflow={'auto'} color={"sec"} bgcolor={status? "#424242":'#cce6ce'}>
      <Navbar
        searchFieldInput={searchFieldInput}
        setSeatFieldInput={setSeatFieldInput}
        ticketDetails={ticketDetails}
        setAdminInfo={setAdminInfo}
        adminInfo={adminInfo}
        status={status}
        change={change}
      ></Navbar>

      <Box>

        <SlideBar></SlideBar>
        <ServiceShow status={status}></ServiceShow>
        <Footer status={status}></Footer>
      </Box>

    </Box>
  );
};

export default Home;
