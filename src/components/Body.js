import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import Header from "./Header";

import Buttons from "./Buttons";

export default function Body(props) {
  const [planets, setPlanets] = useState([]);
  //const [selectedPlanets, setSelectedPlanets] = useState(Array(arr.length).fill(null));
  const [vehicles, setVehicles] = useState([]);
  //const [selectedVehicles, setSelectedVehicles] = useState(Array(arr.length).fill(null));
  const [timeTaken, setTimeTaken] = useState(0);
  const defaultProps = {
    options: planets
      .map((planet) => planet.name)
      .filter((name) => !props.selectedPlanets.includes(name)),
    getOptionLabel: (option) => option,
  };
  

  const fetchData = async () => {
    try {
      const response = await axios.get("https://findfalcone.geektrust.com/planets");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchVehicleData = async () => {
    try {
      const response = await axios.get("https://findfalcone.geektrust.com/vehicles");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlanetSelect = (index, planetName) => {
    const updatedSelectedPlanets = [...props.selectedPlanets];
    updatedSelectedPlanets[index] = planetName;
    props.setSelectedPlanets(updatedSelectedPlanets);

    // Recalculate distances and update disabled vehicles for the specific card
    const selectedPlanet = planets.find((planet) => planet.name === planetName);
    const updatedVehicles = vehicles.map((vehicle) => {
      if (planetName && vehicle.max_distance < selectedPlanet.distance) {
        return { ...vehicle, disabled: true };
      } else {
        return { ...vehicle, disabled: false };
      }
    });
    setVehicles(updatedVehicles);
  };

  const handleVehicleSelect = (index, event) => {
    const selectedVehicleName = event.target.value;

    // Check if the selected vehicle is available (total_no > 0) and not disabled
    const selectedVehicle = vehicles.find((vehicle) => vehicle.name === selectedVehicleName);

    if (selectedVehicle && selectedVehicle.total_no > 0 && !selectedVehicle.disabled) {
      const updatedSelectedVehicles = [...props.selectedVehicles];
      updatedSelectedVehicles[index] = selectedVehicleName;
      props.setSelectedVehicles(updatedSelectedVehicles);

      // Update the count of the selected vehicle
      const updatedVehicles = vehicles.map((vehicle) => {
        if (vehicle.name === selectedVehicleName) {
          return { ...vehicle, total_no: vehicle.total_no - 1 };
        }
        return vehicle;
      });

      setVehicles(updatedVehicles);
    }
  };

  const calculateTotalTimeTaken = () => {
    let total_time = 0;
    for (let i = 0; i < props.arr.length; i++) {
      const selectedPlanet = planets.find((planet) => planet.name === props.selectedPlanets[i]);
      const selectedVehicle = vehicles.find((vehicle) => vehicle.name === props.selectedVehicles[i]);

      if (selectedPlanet && selectedVehicle) {
        total_time += selectedPlanet.distance / selectedVehicle.speed;
      }
    }
    return total_time;
  }

  useEffect(() => {
    async function loadData() {
      let planetValue = await fetchData();
      setPlanets(planetValue);
      let vehicleValue = await fetchVehicleData();
      setVehicles(vehicleValue);
    }
    loadData();
  }, []);

  

  useEffect(() => {
    setTimeTaken(calculateTotalTimeTaken());
  }, [props.selectedPlanets, props.selectedVehicles, planets, vehicles]);

  return (
    
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardHeader title="Time Taken by Vehicles" />
          <CardContent>
            <p>Total Time: {timeTaken} hours</p>
          </CardContent>
        </Card>
      </Grid>
      {props.arr.map((planet, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card variant="outlined">
            <CardHeader title={`Destination ${index + 1}`} />
            <CardContent>
              <Stack spacing={1} sx={{ width: 180 }}>
                <Autocomplete
                  {...defaultProps}
                  id={`auto-complete-${index}`}
                  autoComplete
                  includeInputInList
                  renderInput={(params) => (
                    <TextField {...params} label="autoComplete" variant="standard" />
                  )}
                  value={props.selectedPlanets[index]}
                  onChange={(event, newValue) => {
                    handlePlanetSelect(index, newValue);
                  }}
                />
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name={`radio-buttons-group-${index}`}
                    value={props.selectedVehicles[index]}
                    onChange={(event) => {
                      handleVehicleSelect(index, event);
                    }}
                  >
                    {vehicles.map((vehicle) => (
                      <FormControlLabel
                        key={vehicle.name}
                        value={vehicle.name}
                        control={<Radio />}
                        label={`${vehicle.name} (${vehicle.total_no})`}
                        disabled={vehicle.disabled || vehicle.total_no <= 0}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Buttons selectedPlanets={props.selectedPlanets} selectedVehicles={props.selectedVehicles} planets={planets} timeTaken={timeTaken}  />
    </Grid>
  );
}
