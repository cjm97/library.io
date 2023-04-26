import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography } from '@mui/material';
import SkeletonBook from '../components/SkeletonBook';

export default function Friends() {
  return (
    <div>
      <ResponsiveAppBar />
      <SkeletonBook />
    </div>
  );
}
