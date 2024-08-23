import React, { useState } from "react";
import { Box, Button, Typography, TextField, InputLabel } from "@mui/material";
import { ArrowBack, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { registerCar, unregisterCar } from "../actions/parkingActions";
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function ParkingLots() {
  const parkingSpaces = useSelector((state) => state.parking.spaces);
  const cars = useSelector((state) => state.parking.cars);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [registrationNo, setRegistrationNo] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [spaceToUnregister, setSpaceToUnregister] = useState("");
  const [parkingStartTime, setParkingStartTime] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSpace("");
    setRegistrationNo("");
  };

  const handleRegisterCar = () => {
    if (selectedSpace && registrationNo && !cars[selectedSpace]) {
      dispatch(registerCar(selectedSpace, registrationNo));
      setParkingStartTime((prev) => ({
        ...prev,
        [selectedSpace]: Date.now(),
      }));
      handleClose();
    }
  };

  const handleUnregisterClick = (space) => {
    setSpaceToUnregister(space);
    setConfirmationOpen(true);
  };

  const handleConfirmUnregister = () => {
    dispatch(unregisterCar(spaceToUnregister));
    setConfirmationOpen(false);
  };

  const handleCancelUnregister = () => {
    setConfirmationOpen(false);
  };

  const parkingtime = (startTime) => {
    const now = Date.now();
    const seconds = Math.floor((now - startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const parkingfess = (startTime) => {
    const now = Date.now();
    const seconds = Math.floor((now - startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const fee = minutes > 60 ? 5 + Math.ceil((minutes - 60) / 60) * 10 : 5;

    return {
      elapsedTime: `${Math.floor(minutes / 60)}h ${minutes % 60}m ${secs}s`,
      fee: fee,
    };
  };

  return (
    <>
      <Box>
        <AppBar sx={{ bgcolor: "#479ab8" }}>
          <Toolbar>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                sx={{ borderRadius: 3, bgcolor: "#479ab8" }}
                variant="contained"
                startIcon={<ArrowBack />}
              >
                Go Back
              </Button>
            </Link>

            <div className="lot-head">
              <Typography variant="h6">Parking Lots</Typography>
            </div>

            <div className="lot-btn">
              <Button
                onClick={handleClickOpen}
                sx={{ borderRadius: 3, bgcolor: "#479ab8" }}
                variant="contained"
                startIcon={<Add />}
              >
                New Car Registration
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Parking Spaces */}

      <Box sx={{ overflowX: "hidden" }}>
        <Grid className="grid-map">
          <div>
            {parkingSpaces.map((space) => (
              <div key={space} className="parking-space">
                Parking Space {space}
                {cars[space] ? (
                  <>
                    <div className="car">Car No : {cars[space]}</div>
                    <Button
                      onClick={() => handleUnregisterClick(space)}
                      variant="outlined"
                      size="small"
                    >
                      Unregister Car
                    </Button>
                  </>
                ) : (
                  <div>No car registered</div>
                )}
              </div>
            ))}
          </div>
        </Grid>

        {/* Registration Dialog */}

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <div className="register">
            <DialogTitle sx={{ m: 0, p: 2 }}>Register New Car</DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <form className="Enter_car">
                <Box sx={{ p: 2 }}>
                  <InputLabel>
                    Enter Car Registration No.
                  </InputLabel>
                  <TextField
                    type="text"
                    value={registrationNo}
                    onChange={(e) => setRegistrationNo(e.target.value)}
                    fullWidth
                  />
                  <InputLabel sx={{ mt: 2}}>
                    Select Parking Space
                  </InputLabel>
                  <TextField
                    select
                    SelectProps={{
                      native: true,
                    }}
                    value={selectedSpace}
                    onChange={(e) => setSelectedSpace(e.target.value)}
                    fullWidth
                  >
                    <option>Select a space</option>
                    {parkingSpaces.map((space) => (
                      <option value={space}>Parking Space {space}</option>
                    ))}
                  </TextField>
                </Box>
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleRegisterCar}
                sx={{ color: "black" }}
                className="register-btn"
              >
                Register Car
              </Button>
            </DialogActions>
          </div>
        </BootstrapDialog>

        {/* Unregistration Dialog */}

        <Dialog open={confirmationOpen} onClose={handleCancelUnregister}>
          <div className="unregister">
            <DialogTitle>Parking Deallocate Form</DialogTitle>
            <DialogContent>
              <Typography variant="h6">
                Registration No: {cars[spaceToUnregister]}
              </Typography>
              <Typography variant="h6">
                Your Parking Time:{" "}
                {parkingStartTime[spaceToUnregister]
                  ? parkingtime(parkingStartTime[spaceToUnregister])
                  : "N/A"}
              </Typography>
              <Typography variant="h6">
                Your Parking Fee: $
                {parkingStartTime[spaceToUnregister]
                  ? parkingfess(
                      parkingStartTime[spaceToUnregister]
                    ).fee
                  : "5"}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelUnregister} sx={{ color: "black" }}>
                CANCEL
              </Button>
              <Button onClick={handleConfirmUnregister} sx={{ color: "green"}}>
                 <b>PAY</b>
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </Box>
    </>
  );
}

export default ParkingLots;
