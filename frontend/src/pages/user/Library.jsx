import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../../components/BookCard'; // Import the BookCard component
import { Grid, Typography, Box } from '@mui/material';

function Library() {
  const [books, setBooks] = useState([]); // State to hold the books data

  // Fetching books from the backend when the component is mounted
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/user/library`)
      .then(response => {
        console.log("Books response:", response.data);
        setBooks(response.data); // Store the fetched data in the state
      })
      .catch(error => {
        console.error('Error fetching books:', error); // Log any errors
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts
  // sx={{ padding: '2rem' }}
  return (
    <>
    <h2>Browse Available Books</h2>
    <Box >
      {/* Map over books to create BookCards */}
      <Grid container spacing={3} justifyContent="center">
        {books.map(book => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard book={book} /> {/* Passing each book as a prop to BookCard */}
          </Grid>
        ))}
      </Grid>
    </Box>

    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </>
    
  );
}

export default Library;
