import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const MenuBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#282c34" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img
            src={"eletric.png"}
            alt="MonoPhaseAnalyzer Logo"
            style={{ height: 40, marginRight: 10 }}
          />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
        </Box>
        <Box>
          <Button color="inherit" href="/">
            Início
          </Button>
          <Button color="inherit" href="/modelo">
            Modelo 3D
          </Button>
          <Button color="inherit" href="/parametros">
          Parâmetros
          </Button>
          <Button color="inherit" href="/calculate-regulacao">
          Calcular Regulação
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
