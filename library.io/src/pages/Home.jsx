import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Grid
      container
      direction="column"
      sx={{ m: "auto", mt: "200px", width: 800 }}
    >
      <Grid container item>
        <Grid item xs={12} sm={6}>
          <Typography variant="h1">Welcome to the Library.</Typography>
          <Typography variant="h4">Available on Desktop & Mobile.</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ my: "auto", pl: 5 }}>
          <img
            src="/public/images/Free-Icons-Pack/svg/Free Icons-23.svg"
            alt=""
            className="hero__image--dark"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sx={{ mt: "50px" }}>
          <Button variant="contained">
            <Link to="/signup" className="hero__signup">Sign-Up</Link>
          </Button>
        </Grid>
        <Grid item sx={{ mt: "50px" }}>
          <Button variant="contained">
            <Link to="/signin" className="hero__signup">Log In</Link>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
