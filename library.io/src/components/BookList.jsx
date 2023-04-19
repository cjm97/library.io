import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import SearchBar from './SearchBar';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DoneIcon from '@mui/icons-material/Done';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import InfoIcon from '@mui/icons-material/Info';

const listIcons = [
  <DoneIcon />,
  <BookmarkBorderIcon />,
  <ImportContactsIcon />,
  <InfoIcon />,
];
const listName = ['Read', 'To Read', 'Reading', 'Info'];

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://www.googleapis.com/books/v1/volumes?q=colleen-hoover&key=AIzaSyASHvozwZgNePwB5bRx519MbgHV7VLMaZ4'
      );
      const booksData = response.data.items;
      setBooks(booksData);
      console.log(books);
    };
    fetchData();
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid
          item
          container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            mt: '24px',
            mr: '24px',
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
            display: 'flex',
            justifyContent: 'space-around',
            mt: '2rem',
          }}
          spacing={2}
        >
          {/* books rendered here */}
          {books.length > 0 ? (
            books.map((book) => (
              <Grid
                item
                key={book.id}
                xs={12}
                sm={6}
                md={4}
                sx={{ textAlign: 'center', alignItems: 'center' }}
                p={4}
              >
                <Paper sx={{ height: '30rem' }}>
                  <Typography variant='h6' sx={{ py: '2rem' }}>
                    {book.volumeInfo.title}
                  </Typography>
                  <img
                    // higher quality image source from below link, w400-h600 determines image size
                    src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w400-h600&source=gbs_api
                    `}
                    alt={`${book.volumeInfo.title} thumbnail`}
                    className='search__book'
                  />
                  <Typography
                    variant='body1'
                    sx={{ width: '15rem', mx: 'auto', mt: '1rem' }}
                  >
                    {book.volumeInfo.subtitle}
                  </Typography>
                  <Typography variant='body2' sx={{ mt: '1rem' }}>
                    By{' '}
                    {book.volumeInfo.authors === undefined
                      ? book.volumeInfo.publisher
                      : Array.isArray(book.volumeInfo.authors)
                      ? book.volumeInfo.authors
                          .join(', ')
                          .replace(/,(?=[^,]*$)/, ' &')
                      : book.volumeInfo.authors}
                  </Typography>
                  <Grid
                    item
                    container
                    sx={{ display: 'flex', justifyContent: 'space-around' }}
                  >
                    {listIcons.map((item) => (
                      <Button key={item} variant='contained'>
                        {item}
                      </Button>
                    ))}
                  </Grid>
                  <Grid item container sx={{display:'flex', justifyContent:'space-around'}}>

                  {listName.map((item) => (
                    <Typography variant='body2'>{item}</Typography>
                    ))}
                    </Grid>
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

{
  /* <Grid
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
          </Grid> */
}
