import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { useState, useEffect } from "react";

const categories = [
  "Library",
  "Friends",
  "Shelves",
  "Reading",
  "To Read",
  "Read",
];


export default function LoggedIn() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=search-terms&key=AIzaSyASHvozwZgNePwB5bRx519MbgHV7VLMaZ4")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);
  console.log(books);
  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between"
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
    </>
  );
}


