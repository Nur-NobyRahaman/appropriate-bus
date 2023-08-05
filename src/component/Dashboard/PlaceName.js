import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

const PlaceName = () => {
  const [placeInput, setPlaceInput] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const place = [
    {
      name: placeInput
    }
  ]
  const handlePlaceName = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/adminPlaceName", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: placeInput,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          enqueueSnackbar(`${data?.status}`, { variant: "success" });
        }
        console.log(data, "admin Place Name");
      });

    console.log(place);
    e.target.reset();
  };
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Paper sx={{ width: { xl: "50vw", lg: "50vw", md: "50vw", sm: "60vw", xs: '70vw' }, pt: 3, pl: 5, pr: 5, pb: 5 }}>
        <Typography
          textTransform={"uppercase"}
          fontSize={20}
          fontWeight={"bold"}
          textAlign={'center'}
        >
          Manage bus
        </Typography>
        <form onSubmit={handlePlaceName}>
          <TextField
            onChange={(e) => setPlaceInput(e.target.value)}
            margin="normal"
            fullWidth
            size="small"
            name="placeName"
            label="Place Name"
            // value={placeInput}
            placeholder="place name"
            color="success"
            required
          ></TextField>
          <Box textAlign={"left"}>
            <Button type="submit" variant="contained" color="success">
              add place name
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default PlaceName;
