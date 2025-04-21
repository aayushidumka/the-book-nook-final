// src/components/BookCard.jsx
import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import CheckoutModal from './CheckoutModal'; // Import the new modal component
import { useAuthContext } from '@asgardeo/auth-react';
import axios from 'axios';

const BookCard = ({ book }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(''); // To manage the modal state (confirm or postCheckout)

  //asgardeo
  const {state} = useAuthContext();
  const username = state?.user?.username;

  // create checkout logic
  const handleCheckout = async (book) => {
    console.log(`Checking out book: ${book.book_title}`);
    
    try {
        // 1️⃣ Get the reader ID based on the username
        const readerRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/readers/${encodeURIComponent(state.username)}`
        );
        const readerId = readerRes.data.reader_id;
    
        if (!readerId) {
          console.error('No reader ID found for this username.');
          return;
        }
    
        // 2️⃣ Check if a checkout already exists for this reader and book
        try {
          const checkoutCheck = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/checkouts/${readerId}/${book.book_id}`
          );
    
          // If the checkout exists, we will perform a PUT request (update existing checkout)
          if (checkoutCheck.status === 200) {
            console.log('Checkout exists, updating...');
            
            // Perform PUT request to update checkout
            await axios.put(`${import.meta.env.VITE_API_URL}/user/checkouts/${readerId}/${book.book_id}`, {
                checkout_status: true
            });
            console.log('Checkout updated successfully!');
          }
        } catch (error) {
          // Handle 404 error gracefully (checkout does not exist)
          if (error.response && error.response.status === 404) {
            console.log('No existing checkout, creating new checkout...');
            
            // Proceed with creating a new checkout (POST request)
            await axios.post(
              `${import.meta.env.VITE_API_URL}/user/checkouts`,
              {
                reader_id: `${readerId}`,
                book_id: `${book.book_id}`,
              }
            );
            console.log('Checkout created successfully!');
          } else {
            // Handle other errors (like network issues, etc.)
            console.error('Error checking checkout:', error);
          }
        }
    
        // After a successful checkout, show the post-checkout modal
        setStatus('postCheckout');
        setIsOpen(true); // Open the modal again with the post-checkout status
      } catch (error) {
        console.error('Error with checkout process:', error);
        // Handle the error gracefully if needed (e.g., show an error modal)
        setStatus('error');
        setIsOpen(true);
      }
    };
  

  const handleOpen = () => {
    setStatus('confirm');
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Card className="book-card" sx={{ width: 300 }}>
      <CardContent>
        <Typography variant="h6">{book.book_title}</Typography>
        <Typography variant="subtitle1">{book.book_author}</Typography>
        <Typography variant="subtitle2">Published: {new Date(book.publish_date).toLocaleDateString()}</Typography>
      </CardContent>

      <Box display="flex" justifyContent="space-between" className="card-buttons" padding="0.5rem">
        <Button className="button" size="small" onClick={handleOpen}>
          Checkout
        </Button>
      </Box>

      {/* Pass props to the CheckoutModal component */}
      <CheckoutModal
        isOpen={isOpen}
        handleClose={handleClose}
        handleCheckout={handleCheckout}
        book={book}
        status={status} // Pass the status (confirm or postCheckout)
      />
    </Card>
  );
};

export default BookCard;
