import React, { useContext, useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { UserContext } from '../contexts/userContext';
import { Container, Grid, Box, Typography, IconButton } from '@mui/material';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ReviewDialog from './ReviewDialog';
import ShelfInfoDialog from './ShelfInfoDialog';

export default function Shelf({ shelf }) {
  const { user } = useContext(UserContext);
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  const [books, setBooks] = useState([]);
  const [reviewBook, setReviewBook] = useState([]);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userBooksResponse = await axios.get(
        `http://localhost:8001/api/${shelf}/${currentUser.id}`
      );
      const userBookList = userBooksResponse.data.data;
      const bookList = [];
      for (let i = 0; i < userBookList.length; i++) {
        const bookResponse = await axios.get(
          `http://localhost:8001/api/books/${userBookList[i].book_id}`
        );
        const booksData = bookResponse.data.data[0];
        bookList.push(booksData);
      }
      setBooks(bookList);
    };
    fetchData();
  }, []);

  const handleRemoveBook = async (book) => {
    const deleteUserBook = await axios.delete(
      `http://localhost:8001/api/${shelf}/${currentUser.id}/books/${book.id}`
    );
    setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewInfo = (book) => {
    setSelectedBook(book);
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={'2rem'}>
          <Typography variant='h5'>
            {shelf === 'toread'
              ? 'To Read'
              : shelf.slice(0, 1).toUpperCase() + shelf.slice(1)}{' '}
            Shelf
          </Typography>
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
                        <Typography
                          component='div'
                          className='book__card--title'
                        >
                          {book.book_name}
                        </Typography>
                        <Typography
                          variant='subtitle2'
                          color='text.secondary'
                          component='div'
                        >
                          {book.book_author}
                        </Typography>
                        <Typography
                          variant='caption'
                          color='text.secondary'
                          component='div'
                        >
                          {book.book_subtitle}
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
                        <IconButton
                          aria-label='info-button'
                          title='Book Info'
                          onClick={() => {
                            handleViewInfo(book);
                          }}
                        >
                          <InfoIcon />
                        </IconButton>
                        <ShelfInfoDialog
                          key={selectedBook?.id}
                          open={openInfo}
                          handleCloseInfo={handleCloseInfo}
                          book={selectedBook}
                        />
                        <IconButton
                          aria-label='delete-button'
                          title='Delete Book from Shelf'
                          onClick={() => handleRemoveBook(book)}
                        >
                          <CancelIcon />
                        </IconButton>
                        {shelf === 'read' && (
                          <>
                            <IconButton
                              aria-label='review-button'
                              title='Leave a review for this book'
                              onClick={() => {
                                setSelectedBookId(book.id);
                                handleClickOpen();
                              }}
                            >
                              <ReviewsIcon />
                            </IconButton>
                            <ReviewDialog
                              open={open}
                              handleClose={handleClose}
                              bookID={selectedBookId}
                              userID={currentUser.id}
                            />
                          </>
                        )}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          pl: 1,
                          pb: 1,
                        }}
                      ></Box>
                    </Box>
                    <CardMedia
                      component='img'
                      sx={{ width: 150 }}
                      image={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w400-h600&source=gbs_api
                    `}
                      alt={`${book.book_name} thumbnail`}
                    />
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant='h5'>{`No books in your ${shelf} shelf!`}</Typography>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
