import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

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
    <Box
      sx={{ display: "flex", justifyContent: "space-between", height: "100vh" }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          ml: "24px",
        }}
      >
        {categories.map((category) => {
          if (category === "Library") {
            return (
              <Grid item key={category}>
                <Link to="/" className="home__link--item">
                  <Typography variant="h5">
                    Library{"   "}
                    <img
                      src="/public/images/Free-Icons-Pack/svg/Free Icons-23.svg"
                      alt=""
                      className="logo"
                    />
                  </Typography>
                </Link>
              </Grid>
            );
          } else if (category === "Shelves") {
            return (
              <Grid item key={category}>
                <Typography variant="h5">{category}</Typography>
              </Grid>
            );
          } else if (category === "To Read") {
            return (
              <Grid item key={category} sx={{ ml: "12px" }}>
                <Link to="/toread" className="home__link--item">
                  <Typography variant="h5">{category}</Typography>
                </Link>
              </Grid>
            );
          } else {
            return (
              <Grid item key={category} sx={{ ml: "12px" }}>
                <Link
                  to={`/${category.toLowerCase()}`}
                  className="home__link--item"
                >
                  <Typography variant="h5">{category}</Typography>
                </Link>
              </Grid>
            );
          }
        })}
      </Grid>
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
  );
}

{
  /* <Grid item>
          <Typography variant="h4">
            <Link to="/">
            Library
            </Link>
            </Typography>
        </Grid>
        
        <Grid item sx={{ ml: "8px" }}>
          <Typography variant="h6">Friends</Typography>
        </Grid>
        <Grid item sx={{ ml: "8px", mt: "8px" }}>
          <Typography variant="h6">Shelves</Typography>
        </Grid>
        {categories.map((category) => (
          <Grid item key={category} sx={{ ml: "12px" }}>
            <Typography variant="h6">{category}</Typography>
          </Grid>
        ))} */
}
