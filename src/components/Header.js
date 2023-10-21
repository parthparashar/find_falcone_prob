import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();

  const handleGeekTrustHomeClick = () => {
    // Navigate to the homepage
    navigate("/" );
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='default'>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Button variant="text" color="inherit">Finding Falcone</Button>
          <div>
            <Button variant="text" onClick={props.resetSelections}>RESET</Button>
            <span style={{ marginRight: '25px' }}></span>
            <Button variant="outlined" onClick={handleGeekTrustHomeClick}>GEEK TRUST HOME</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}