import React from 'react';
import { Container } from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import BookList from '../components/BookList';

const categories = [
  'Library',
  'Friends',
  'Shelves',
  'Reading',
  'To Read',
  'Read',
];

export default function Explore() {
  return (
    <>
      <ResponsiveAppBar />
      <Container>
        {/* if search bar empty render below */}
        <BookList />
        {/* else render search contents */}
      </Container>
    </>
  );
}
