import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Box, Grid, Paper, Typography } from "@mui/material";
import SearchBar from "./SearchBar";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=game-of-thrones&key=AIzaSyASHvozwZgNePwB5bRx519MbgHV7VLMaZ4"
      );
      const booksData = response.data.items;
      setBooks(booksData);
      console.log(booksData);
    };
    fetchData();
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
        <Grid
          item
          container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            mt: "2rem",
          }}
          spacing={2}
        >
          {/* books rendered here */}
          {books.length > 0 ? (
            books.map((book) => (
              <Grid
                item
                key={book.volumeInfo.title}
                xs={12}
                sm={6}
                md={4}
                sx={{ textAlign: "center", alignItems: "center" }}
                p={4}
              >
                <Paper sx={{height:"30rem"}}>
                  <Typography variant="h6">{book.volumeInfo.title}</Typography>
                  <img
                    src={`${book.volumeInfo.imageLinks.smallThumbnail}`}
                    alt={`${book.volumeInfo.title} thumbnail`}
                    className="search__book"
                  />
                  <Typography variant="body1" sx={{width: "15rem", mx:"auto"}}>{book.volumeInfo.subtitle}</Typography>
                  <Typography variant="body2">By{book.volumeInfo.authors}</Typography>
                  {/* if authors =array or >1 then add commas and spaces, if no authors put no "by" */}
                  
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography>No books found</Typography>
          )}
          
          {/* books rendered above */}
        </Grid>
      </Box>
    </>
  );
}


{/* <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ textAlign: "center", alignItems: "center" }}
          >
            <Paper>
              <Typography variant="h6">Book Name</Typography>
              <img src="/images/GOT.jpg" alt="" className="home__book" />
              <Typography sx={{ textAlign: "left", ml: "1rem" }}>
                Book Description
              </Typography>
            </Paper>
          </Grid> */}