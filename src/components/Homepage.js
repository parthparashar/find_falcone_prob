import React,{useState} from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Body from "./Body";

const Homepage = (props) => {
  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', marginTop: "50px" }}>
      <Body 
        selectedPlanets={props.selectedPlanets}
        selectedVehicles={props.selectedVehicles}
        setSelectedPlanets={props.setSelectedPlanets}
        setSelectedVehicles={props.setSelectedVehicles}
        //resetSelections={props.resetSelections}
        arr = {props.arr}
      />
    </Box>
  )
}
export default Homepage;