import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Box, Container, Typography } from '@mui/material';
import SkeletonBook from '../components/SkeletonBook';

export default function Friends() {
  return (
    <div>
      <ResponsiveAppBar />
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          mt={'10rem'}
        >
          <Typography variant='h2'>Coming soon...</Typography>
        </Box>
      </Container>
    </div>
  );
}
