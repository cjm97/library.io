import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, Paper, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { useState, useEffect } from "react";
import axios from "axios";

const categories = [
  "Library",
  "Friends",
  "Shelves",
  "Reading",
  "To Read",
  "Read",
];

export default function LoggedIn() {
  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid
          item
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            mt: "24px",
            mr: "24px",
          }}
        >
          <SearchBar />
        </Grid>
      </Box>
      <Box>
        {/* if search bar empty render below */}
        <Grid
          item
          container
          sx={{ display: "flex", justifyContent: "space-around", mt: "2rem" }}
          spacing={4}
        >
          {categories.slice(3).map((category) => (
            <Grid
              item
              key={category}
              xs={12}
              sm={6}
              md={4}
              sx={{ textAlign: "center", alignItems: "center" }}
            >
              <Paper>
                <Typography variant="h6">{category}</Typography>
                <img src="/images/GOT.jpg" alt="" className="home__book" />
                <Typography sx={{ textAlign: "left", ml: "1rem" }}>
                  Book description
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {/* else render search contents */}
      </Box>
    </>
  );
}
