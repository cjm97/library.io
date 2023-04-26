import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Grid, Box, Container } from '@mui/material';

let items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function SkeletonBook() {
  return (
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
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: 'flex',
                height: '15rem',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1 0 auto',
                    justifyContent: 'space-between',
                    ml: '1rem',
                  }}
                >
                  <Box sx={{ width: '10rem' }}>
                    <Skeleton variant='text' /> <Skeleton variant='text' />
                    <Skeleton variant='text' />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'space-between',
                    }}
                  >
                    <Skeleton variant='circular' width={20} height={20} />
                    <Skeleton variant='circular' width={20} height={20} />
                    <Skeleton variant='circular' width={20} height={20} />
                    <Skeleton variant='circular' width={20} height={20} />
                  </Box>
                </CardContent>
              </Box>
              <Skeleton variant='rounded' width={150} height={'100%'} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
