import React from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Buttons(props) {
  const t_time = props.timeTaken;
  console.log(t_time," t_time")
  const navigate = useNavigate();

  const getToken = async () => {
    try {
      const response = await axios.post('https://findfalcone.geektrust.com/token', {}, {
        headers: {
          Accept: 'application/json',
        },
      });
      return response.data.token;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };

  const isDisabled = props.selectedPlanets.some((planet) => planet === null) || props.selectedVehicles.some((vehicle) => vehicle === null);

  const handleApi = async () => {
    if (!isDisabled) {
      let token = await getToken();
      if (token) {
        findFalcone(token, props.selectedPlanets, props.selectedVehicles,props.timeTaken,props.resetSelections);
      }
    } 
  };

  const findFalcone = async (token, selectedPlanets, selectedVehicles, timeTaken) => {
    const availablePlanets = props.planets.map((planet) => planet.name);
  
    const requestBody = {
      token: token,
      planet_names: selectedPlanets,
      vehicle_names: selectedVehicles,
    };
  
    try {
      const response = await axios.post('https://findfalcone.geektrust.com/find', requestBody, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      const result = response.data;
      if (result) {
        console.log(result, "result");
        // Redirect to the result page with the result data
        navigate("/result", { state: { result, timeTaken } });
      } 
    } catch (error) {
      console.error('Error finding Falcone:', error);
    }
  }

  return (
    <>
      <Button variant="contained" style={{ borderRadius: "25px",  margin: '0 auto' ,marginTop: "40px", marginBottom: "30px" }} onClick={handleApi} disabled={isDisabled}>FIND FALCONE</Button>
    </>
  )
}
