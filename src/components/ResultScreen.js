import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';

export default function ResultScreen(props) {
  // Access the result data and timeTaken from the location state
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state ? location.state.result : null;
  const timeTaken = location.state ? location.state.timeTaken : null; // Corrected property name

  const handleStartAgainClick = () => {
    // Clear input fields and navigate to the homepage
    props.resetSelections();
    navigate("/");
  };

  if (!resultData) {
    return <div>No result found</div>;
  }

  return (
    <Card variant="outlined" style={{ margin: "20px", padding: "20px" }}>
      <CardContent>
        {resultData.status === "success" ? (
          <>
            <p>Congratulations on finding Falcone!</p>
            <p>Total Time Taken: {timeTaken} hours</p> {/* Use the correct variable name here */}
            <p>Planet Name: {resultData.planet_name}</p>
          </>
        ) : (
          <p>Falcone search failed with status:, {resultData.status}</p>
        )}
        <Button variant="contained" onClick={handleStartAgainClick}>
          Start Again
        </Button>
      </CardContent>
    </Card>
  );
}
