import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { Box, Grid, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DoneIcon from '@mui/icons-material/Done';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import SkeletonBook from './SkeletonBook';
import { UserContext } from '../contexts/userContext';
import BookInfoDialog from './BookInfoDialog';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [readingBooks, setReadingBooks] = useState([]);
  const [toReadBooks, setToReadBooks] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const { user } = useContext(UserContext);
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);

  // commented out so i don't get banned from API, uncomment to test
  const listIcons = [
    { icon: <DoneIcon />, name: 'Read', state: readBooks },
    { icon: <BookmarkBorderIcon />, name: 'To Read', state: toReadBooks },
    { icon: <ImportContactsIcon />, name: 'Reading', state: readingBooks },
    { icon: <InfoIcon />, name: 'Info' },
    { icon: <AddCircleIcon />, name: 'Custom List' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const readResponse = await axios.get(`http://localhost:8001/api/read/2`);
      const readData = readResponse.data.data;
      setReadBooks(readData);
      const readingResponse = await axios.get(
        `http://localhost:8001/api/reading/2`
      );
      const readingData = readingResponse.data.data;
      setReadingBooks(readingData);
      const toReadResponse = await axios.get(
        `http://localhost:8001/api/toread/2`
      );
      const toReadData = toReadResponse.data.data;
      setToReadBooks(toReadData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let booksTimeoutId;
    const fetchData = async () => {
      //define fetch data function
      const key = 'AIzaSyASHvozwZgNePwB5bRx519MbgHV7VLMaZ4';
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${filterText}&startIndex=1&maxResults=21&key=${key}`
      );
      const booksData = response.data.items;
      console.log(booksData);
      setBooks(booksData); // used to render books
      // call backend function sending through booksdata [array containing each book with api details]

      //sends bookData to populate my database with books
      await axios
        .post('http://localhost:8001/api/books/addSearchBooks', booksData)
        .then((response) => {
          console.log('success, book added to sql database');
        })
        .catch((error) => {
          console.log("failure, couldn't add search books to database");
        });

      // create a book obj that matches my data
      // ? setBooks to match that data, adjust code beneath to match
      // find or create those books in my database
    };

    const delayedFetchData = () => {
      clearTimeout(booksTimeoutId);
      booksTimeoutId = setTimeout(() => {
        fetchData();
        setIsLoading(false);
      }, 500); //call fetch data function with 1000ms delay
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

  // functions to add book to correct database
  const handleViewInfo = (book) => {};

  const handleAddToShelf = async (book, shelf) => {
    let data = {
      user_id: currentUser.id,
      book_id: book.id,
    };

    const endpoints = {
      Read: 'read',
      'To Read': 'toread',
      Reading: 'reading',
    };

    const endpoint = endpoints[shelf];

    if (!endpoint) {
      throw new Error(`Invalid shelf "${shelf}"`);
    } else {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/${endpoint}/${currentUser.id}`
        ); //checks shelf
        const userShelfData = response.data.data;
        const targetBookId = book.id;
        console.log(userShelfData);
        if (userShelfData.some((obj) => obj.book_id === targetBookId)) {
          console.log("Book already exists in user's shelf");
        } else {
          await axios.post(
            `http://localhost:8001/api/${endpoint}/create`,
            data
          ); //adds book to particular shelf
        } //check shelf data if book has been added
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to add book to ${shelf} shelf`);
      }
    }
  };

  const handleAddToCustomShelf = (book) => {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                      {listIcons.map((item) =>
                        item.name === 'Info' ? (
                          <div key={item.name}>
                            <IconButton
                              key={item.name}
                              aria-label={item.name}
                              className={`${item.name}-button`}
                              title={`Click for more info`}
                              onClick={() => {
                                setSelectedBook(book);
                                handleClickOpen();
                              }}
                            >
                              {item.icon}
                            </IconButton>
                            <BookInfoDialog
                            key={book.id}
                              open={open}
                              handleClose={handleClose}
                              book={selectedBook}
                            />
                          </div>
                        ) : item.name === 'Custom List' ? (
                          <IconButton
                            key={item.name}
                            aria-label={item.name}
                            className={`${item.name}-button`}
                            title={`Add to custom list`}
                            onClick={() => handleAddToCustomShelf(book)}
                          >
                            {item.icon}
                          </IconButton>
                        ) : (
                          <IconButton
                            key={item.name}
                            aria-label={item.name}
                            className={`${item.name}-button`}
                            title={`Add to your "${item.name}" list`}
                            onClick={() => handleAddToShelf(book, item.name)}
                            color={
                              item.state &&
                              item.state.some((obj) => obj.book_id === book.id)
                                ? 'success'
                                : 'primary'
                            }
                          >
                            {item.icon}
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
