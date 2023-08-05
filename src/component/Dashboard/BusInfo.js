import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

const BusInfo = () => {
  const [busInfoInput, setBusInfoInput] = useState("");
  const [route, setRoute] = useState("");
  const [routeList, setRouteList] = useState([]);
  const [roadName, setRoadName] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleAdd = () => {
    setRouteList([...routeList, route]);
    enqueueSnackbar(`${route} Route Added`, { variant: "success" });
    setRoute("");
  };
  const handleBusInfo = (e) => {
    e.preventDefault();
    if (routeList.length > 1) {
      // const busNameInput = e.target.BusName.value;
      // setBusInfoInput(busNameInput);
      // setRoadName(routeList);

      fetch("http://localhost:5000/adminBusList", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: busInfoInput,
          roadName: routeList,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if(data?.status){
            enqueueSnackbar(`${data?.status}`, { variant: "success" });
          }
          console.log(data, "admin Place Name");
        });
        setRouteList([])
        // setBusInfoInput('')

      // enqueueSnackbar("success", { variant: "success" });
    } else {
      enqueueSnackbar("Add minimum two route list", { variant: "warning" });
    }
  };
 


  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Paper sx={{ width:{xl:"50vw",lg:"50vw",md:"50vw",sm:"60vw",xs:'70vw'} , pt: 3,pl:5 ,pr:5,pb:5 }}>
      <Typography
      textAlign={'center'}
          textTransform={"uppercase"}
          fontSize={20}
          fontWeight={"bold"}
        >
          Set bus name and route
        </Typography>
        <form onSubmit={handleBusInfo}>
          <TextField
          onChange={(e)=>setBusInfoInput(e.target.value)}
            margin="normal"
            fullWidth
            size="small"
            name="BusName"
            label="Bus Name"
            // value={placeInput}
            placeholder="place name"
            color="success"
            required
          ></TextField>

          {/* <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <TextField
              onChange={(e) => setRoute(e.target.value)}
              margin="normal"
              fullWidth
              size="small"
              name="RouteList"
              label="Route List"
              value={route}
              placeholder="Route List"
              color="secondary"
            ></TextField>
            <Box>
              <Button onClick={handleAdd} variant="contained" color="secondary">
                add
              </Button>
            </Box>
          </Box> */}
          <Box
            // sx={{
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            //   gap: 2,
            // }}
          >
            <TextField
              onChange={(e) => setRoute(e.target.value)}
              margin="normal"
              fullWidth
              size="small"
              name="RouteList"
              label="Route List"
              value={route}
              placeholder="Route List"
              color="secondary"
            ></TextField>
            <Box display={'flex'} justifyContent={'right'}>
              <Button onClick={handleAdd} variant="contained" color="secondary">
                add
              </Button>
            </Box>
          </Box>


          <Box textAlign={"left"} mt={1}>
            <Button disabled={routeList.length === 0} fullWidth type="submit" variant="contained" color="success">
              add bus name
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default BusInfo;
