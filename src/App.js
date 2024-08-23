import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParkingApp from "./components/ParkingForm";
import ParkingLots from "./components/ParkingList";
import "./design/style.css"; 
import "./design/parkingLots.css";

function App() {
  return (
  <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<ParkingApp/>}></Route>
    <Route path="/parking-list" element={<ParkingLots/>}></Route>
   </Routes>
   </BrowserRouter>
  </>    
  );
}

export default App;
