import * as React from 'react';
import { useState, useEffect } from 'react';
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

export default function ReviewDialog(props) {
  const { open, handleClose, bookID, userID } = props;

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e, value) => {
    setRating(value);
  };

  const handleUpdateReview = async () => {
    let data = {
      user_id: userID,
      book_id: bookID,
      user_rating: rating,
      user_review: review,
    };
    console.log(data);
    try {
      await axios.put(
        `http://localhost:8001/api/read/${userID}/books/${bookID}`,
        data
      );
      alert('Review submitted successfully!');
      handleClose();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update review');
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Review</DialogTitle>
        <DialogContent>
          <DialogContentText mb={'1rem'}>
            Edit your review and rating. Press 'Submit' to publish
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            rows={4}
            id='name'
            label='Review'
            type='text'
            fullWidth
            variant='standard'
            onChange={handleReviewChange}
            placeholder={'placeholdertext'}
          />
          <Stack spacing={1}>
            <Rating
              name='half-rating'
              defaultValue={2.5}
              precision={0.5}
              onChange={handleRatingChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateReview}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
