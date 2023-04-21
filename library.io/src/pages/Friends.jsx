import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography } from '@mui/material';

export default function Friends() {
  return (
    <div>
      <ResponsiveAppBar />
      <Typography variant='h1'>You have no friends</Typography>
    </div>
  );
}
