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
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import SkeletonBook from './SkeletonBook';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // commented out so i don't get banned from API, uncomment to test

  useEffect(() => {
    let booksTimeoutId;
    const fetchData = async () => {
      //define fetch data function
      const key = 'AIzaSyASHvozwZgNePwB5bRx519MbgHV7VLMaZ4';
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${filterText}&startIndex=1&maxResults=21&key=${key}`
      );

      const booksData = response.data.items;
      setBooks(booksData);
    };
    const delayedFetchData = () => {
      clearTimeout(booksTimeoutId);
      booksTimeoutId = setTimeout(() => {
        fetchData();
        setIsLoading(false);
      }, 1000); //call fetch data function with 1000ms delay
    };
    delayedFetchData();
    return () => {
      clearTimeout(booksTimeoutId);
      // search completed
    };
  }, [filterText, isLoading]);

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value);
    setIsLoading(true);
    setIsSearching(true);
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            noValidate
            autoComplete='off'
          >
            {books.length === 0 && (
              <Typography variant='h6' mb={4} sx={{ display: 'inline' }}>
                Begin searching for books
              </Typography>
            )}

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
            mb: '2rem',
          }}
          spacing={2}
        >
          {/* books rendered here */}
          {isLoading ? (
            <SkeletonBook />
          ) : books.length > 0 ? ( //if search result populates books, render book cards
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
                      <Typography component='div' className='book__card--title'>
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
                        item.displayName === 'InfoIcon' ? (
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
                            // if book is added to any list, show some sort of UI that shows it has been added to a list already
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
            !isSearching && (
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
                <img
                  src='/public/images/hero-image-reading.svg'
                  alt=''
                  className='home__book'
                />
              </Grid>
            )
          )}

          {/* books rendered above */}
        </Grid>
      </Box>
    </>
  );
}
