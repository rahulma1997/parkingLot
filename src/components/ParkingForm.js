import React, { useState } from "react";
import { Box, TextField, Paper, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setParkingSpaces } from "../actions/parkingActions";

function ParkingApp() {
  const [numberOfSpaces, setNumberOfSpaces] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setParkingSpaces(Number(numberOfSpaces)));
    setNumberOfSpaces("");
    navigate("/parking-list");
  };

  return (
    <Box className="background">
      <Paper className="parking" elevation={20} sx={{ bgcolor: "lightblue" }}>
        <h1>
          <b>Enter Parking Space</b>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="parking-text">
            <TextField
              variant="outlined"
              placeholder="Enter Space"
              type="number"
              value={numberOfSpaces}
              onChange={(e) => setNumberOfSpaces(e.target.value)}
              min="1"
            />
          </div>
          <div className="Park-btn">
            <Button variant="contained" className="Park-btn1" type="submit">
              Set Space
            </Button>
          </div>
        </form>
      </Paper>
    </Box>
  );
}

export default ParkingApp;
