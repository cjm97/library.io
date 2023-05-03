import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';

export default function Community() {
  const [readBooks, setReadBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    //fetches all the read books
    const fetchData = async () => {
      const readResponse = await axios.get(`http://localhost:8001/api/read`); //returns all read readBooks of all users
      const userResponse = await axios.get(`http://localhost:8001/api/users`);
      const bookResponse = await axios.get(`http://localhost:8001/api/books`);
      const readData = readResponse.data.data;
      const userData = userResponse.data.data;
      const bookData = bookResponse.data.data;
      setUsers(userData);
      setReadBooks(readData);
      setBooks(bookData);
      // console.log(readBooks);
      console.log(userData);
      // console.log(books);
    };

    fetchData();
  }, []);

  //function that takes user_id and returns their first name
  const getUserName = (userID, users) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userID) {
        return users[i].firstName;
      }
    }
    return null;
  };
  //function that takes book_id and returns book name
  const getBookName = (bookID, books) => {
    for (let i = 0; i < books.length; i++) {
      if (books[i].id === bookID) {
        return books[i].book_name;
      }
    }
    return null;
  };
  return (
    <div>
      <ResponsiveAppBar />
      <Container>
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
          {readBooks &&
            readBooks.map((book) =>
              book.user_rating ? (
                <Grid item key={book.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      display: 'flex',
                      height: '15rem',
                      justifyContent: 'space-betwen',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography
                          component='div'
                          className='book__card--title'
                        >
                          {getUserName(book.user_id, users)}
                        </Typography>
                        <Typography
                          variant='subtitle2'
                          color='text.secondary'
                          component='div'
                        >
                          Gave "{getBookName(book.book_id, books)}" a rating of:
                        </Typography>
                        <Rating
                          name='read-only'
                          value={book.user_rating}
                          readOnly
                          size='small'
                        />
                        <Typography variant="caption" color="text.secondary" component="div">
                          '{book.user_review}'
                        </Typography>
                      </CardContent>
                    </Box>
                    <CardMedia
                      component='img'
                      sx={{ width: 150 }}
                      image={`https://books.google.com/books/publisher/content/images/frontcover/${book.book_id}?fife=w400-h600&source=gbs_api
                    `}
                      alt={getBookName(book.book_id, books)}
                    />
                  </Card>
                </Grid>
              ) : null
            )}
            </Grid>
        </Box>
      </Container>
    </div>
  );
}

{
  /* <Box m={0} key={book.id}>
                  <Typography variant='body1'>
                    {getUserName(book.user_id, users)}
                  </Typography>
                  <Typography variant='body2'>
                    Gave "{getBookName(book.book_id, books)}" a rating of:
                  </Typography>
                  <Rating
                    name='read-only'
                    value={book.user_rating}
                    readOnly
                    size='small'
                  />
                </Box> */
}
