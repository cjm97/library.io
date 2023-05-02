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

export default function BookInfoDialog(props) {
  const { open, handleClose, book, bookID, userID } = props;

  return (
    <div>
      {book && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{book.volumeInfo.title}</DialogTitle>
          <DialogContent>
            <Typography variant='body1'>
              {book.volumeInfo.description}
            </Typography>
            <Typography variant='body2' mt={'1rem'}>
              {book.volumeInfo.pageCount} pages.
            </Typography>
            <Typography variant='body2'>
              {book.volumeInfo.averageRating}/5 Average rating.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
