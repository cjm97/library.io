import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ResponsiveAppBar from './ResponsiveAppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DoneIcon from '@mui/icons-material/Done';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import _ from 'lodash';

const listIcons = [
  <DoneIcon />,
  <BookmarkBorderIcon />,
  <ImportContactsIcon />,
  <InfoIcon />,
];
const listName = ['Read', 'To Read', 'Reading', 'Info'];

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const key = 'AIzaSyASHvozwZgNePwB5bRx519MbgHV7VLMaZ4'
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${filterText}&startIndex=1&maxResults=21&key=${key}`
      );

      const booksData = response.data.items;
      setBooks(booksData);
    };
    const delayedFetchData = _.debounce(fetchData, 100);
    delayedFetchData();
  }, [filterText]);

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <>
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
          <Box
            component='form'
            sx={{
              '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              id='book__search'
              label='Search Books'
              variant='outlined'
              value={filterText}
              onChange={handleFilterTextChange}
            />
          </Box>
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
              <Grid item key={book.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    display: 'flex',
                    height: '15rem',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      {console.log(`${book.volumeInfo.title.length} ${book.volumeInfo.title}`) }
                      <Typography component='div' className="book__card--title">
                        {book.volumeInfo.title}
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        color='text.secondary'
                        component='div'
                      >
                        {book.volumeInfo.authors === undefined
                          ? book.volumeInfo.publisher
                          : Array.isArray(book.volumeInfo.authors)
                          ? book.volumeInfo.authors
                              .join(', ')
                              .replace(/,(?=[^,]*$)/, ' &')
                          : book.volumeInfo.authors}
                      </Typography>
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        component='div'
                      >
                        {book.volumeInfo.subtitle}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        pl: 1,
                        pb: 1,
                      }}
                    >
                      {listIcons.map((item, index) =>
                        item === <InfoIcon /> ? (
                          <IconButton
                            key={listName[index]}
                            aria-label={listName[index]}
                            className={`${listName[index]}-button`}
                            title={`Click for more info`}
                          >
                            {item}
                          </IconButton>
                        ) : (
                          <IconButton
                            key={listName[index]}
                            aria-label={listName[index]}
                            className={`${listName[index]}-button`}
                            title={`Add to your "${listName[index]}" list`}
                          >
                            {item}
                          </IconButton>
                        )
                      )}
                    </Box>
                  </Box>
                  <CardMedia
                    component='img'
                    sx={{ width: 150 }}
                    image={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w400-h600&source=gbs_api
                    `}
                    alt={`${book.volumeInfo.title} thumbnail`}
                  />
                </Card>
              </Grid>
            ))
          ) : (
            <Grid
              item
              container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6" mb={4} >Begin searching for Books</Typography>
              
              <img src='/public/images/hero-image-reading.svg' alt='' className="home__book" />
              
            </Grid>
          )}

          {/* books rendered above */}
        </Grid>
      </Box>
    </>
  );
}
