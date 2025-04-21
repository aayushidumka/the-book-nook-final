import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const CheckoutModal = ({ isOpen, handleClose, handleCheckout, book, status }) => {
  const renderMessage = () => {
    if (status === 'confirm') {
      return (
        <>
          <Typography variant="h6">{book.book_title}</Typography>
          <Typography variant="subtitle1">{book.book_author}</Typography>
          <Typography variant="subtitle2">Published: {new Date(book.publish_date).toLocaleDateString()}</Typography>
          <Typography variant="body1">Are you sure you want to checkout this book?</Typography>
        </>
      );
    } else if (status === 'postCheckout') {
      return (
        <>
          <Typography variant="h6">Successfully checked out!</Typography>
          <Typography variant="subtitle1">{book.book_title}</Typography>
          <Typography variant="body1">Thank you for checking out the book. Enjoy reading!</Typography>
        </>
      );
    } else {
      return <Typography variant="body1">Something went wrong!</Typography>;
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{status === 'confirm' ? 'Confirm Checkout' : 'Post Checkout'}</DialogTitle>
      <DialogContent>
        {renderMessage()}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        {status === 'confirm' && (
          <Button onClick={() => handleCheckout(book)} color="primary">
            Confirm Checkout
          </Button>
        )}
        {status === 'postCheckout' && (
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutModal;
