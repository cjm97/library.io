import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { Typography } from '@mui/material';

export default function ShelfInfoDialog(props) {
  const { open, handleCloseInfo, book } = props;

  return (
    <div>
      {book && (
        <Dialog open={open} onClose={handleCloseInfo}>
          <DialogTitle>{book.book_name}</DialogTitle>
          <DialogContent>
            <Typography variant='body1'>
              {book.book_description}
            </Typography>
            <Typography variant='body2' mt={'1rem'}>
              {book.book_pages} pages.
            </Typography>
            <Typography variant='body2'>
              {book.book_category}
            </Typography>
            <Typography variant='body2'>{book.book_author}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseInfo}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
