import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
  Container,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Grid,
} from '@mui/material';

import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

let shelves = ['Reading', 'To Read', 'Read'];
let descriptions = [
  'Books you\'re currently reading',
  'Books you want to read',
  'Books you\'ve finished',
];
let icons = [
  <AutoStoriesRoundedIcon />,
  <BookRoundedIcon />,
  <LibraryBooksRoundedIcon />,
];

export default function Shelves() {
  return (
    <>
      <ResponsiveAppBar />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Grid item container mt={'15%'} spacing={2}>
          {shelves.map((shelf, index) => (
            <Grid key={shelf} item sx={{ width: '80%' }} xs={12} sm={6} md={3}>
              <Card>
                <CardActionArea
                  href={`/${shelf}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                  }}
                >
                  <CardContent sx={{ alignSelf: 'center' }}>
                    <Typography
                      variant='h1'
                      className='shelf__icon'
                      sx={{ transform: 'scale(3)' }}
                      mb={6}
                    >
                      {icons[index]}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {shelf}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {descriptions[index]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          <Grid item sx={{ width: '80%' }} xs={12} sm={6} md={3}>
              <Card>
                <CardActionArea
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                  }}
                >
                  <CardContent sx={{ alignSelf: 'center' }}>
                    <Typography
                      variant='h1'
                      className='shelf__icon'
                      sx={{ transform: 'scale(3)' }}
                      mb={6}
                    >
                      <AddCircleRoundedIcon />
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      Add Shelf
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Add your own custom shelf
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
        </Grid>
      </Container>
    </>
  );
}
