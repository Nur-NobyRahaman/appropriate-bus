import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import Navbar from "../Navbar/Navbar";

const Contact = ({ change, status, adminInfo, setAdminInfo, setSeatFieldInput }) => {
  return (
    <Box height={'100vh'} overflow={'auto'} bgcolor={status ? "black" : '#cce6ce'}>
      <Navbar
        setSeatFieldInput={setSeatFieldInput}
        setAdminInfo={setAdminInfo}
        adminInfo={adminInfo}
        status={status}
        change={change}
      ></Navbar>
      <Box>
        <Box
          mt={9}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.7610323394033!2d90.34594197502528!3d23.791522487197046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0ec6bd8f501%3A0xecb20b6904793773!2sMazar%20Rd%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1689037472090!5m2!1sen!2sbd"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>

        <Paper sx={{ width: { xl: "30vw", lg: "40vw", md: '60vw', sm: "70vw", xs: "90vw" }, mx: 'auto', p: 4, mt: 5, mb: 5 }}>
          <Typography fontSize={18} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'} color={status ?'white':'green'} mb={2}> Contact with email</Typography>

          <form action="https://formspree.io/f/mdorolqg" method="post"  >
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ width: { xl: '54vh', lg: "37", md: "54vw", sm: '60vw', xs: '80vw' } }}>
              <TextField
                fullWidth
                color="success"
                size="small"
                label="User Name"
                name="name"
                margin="normal"

              ></TextField>
              <TextField
                type="email"
                name="email"
                color="success"
                size="small"
                required
                label="Enter Email"
                margin="normal"
              ></TextField>
              <TextField
                multiline
                rows={4}
                color="success"
                size="small"
                required
                label="Write Message"
                name="message"
                margin="normal"
              ></TextField>
              <Button target="_blank" type="submit" variant="contained" color="success" sx={{bgcolor :status && "black" ,color: status && "white" , "&:hover":status &&{bgcolor:'gray'}}}>Submit</Button>

            </Box>
          </form>

        </Paper>

      </Box>


    </Box>
  );
};

export default Contact;
