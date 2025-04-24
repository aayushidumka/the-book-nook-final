// import React from 'react';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

// const CheckoutModal = ({ isOpen, handleClose, handleCheckout, book, status }) => {
//   const renderMessage = () => {
//     if (status === 'confirm') {
//       return (
//         <>
//           <Typography variant="h6">{book.book_title}</Typography>
//           <Typography variant="subtitle1">{book.book_author}</Typography>
//           <Typography variant="subtitle2">Published: {new Date(book.publish_date).toLocaleDateString()}</Typography>
//           <Typography variant="body1">Are you sure you want to checkout this book?</Typography>
//         </>
//       );
//     } else if (status === 'postCheckout') {
//       return (
//         <>
//           <Typography variant="h6">Successfully checked out!</Typography>
//           <Typography variant="subtitle1">{book.book_title}</Typography>
//           <Typography variant="body1">Thank you for checking out the book. Enjoy reading!</Typography>
//         </>
//       );
//     } else {
//       return <Typography variant="body1">Something went wrong!</Typography>;
//     }
//   };

//   return (
//     <Dialog open={isOpen} onClose={handleClose}>
//       <DialogTitle>{status === 'confirm' ? 'Confirm Checkout' : 'Post Checkout'}</DialogTitle>
//       <DialogContent>
//         {renderMessage()}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="primary">
//           Cancel
//         </Button>
//         {status === 'confirm' && (
//           <Button onClick={() => handleCheckout(book)} color="primary">
//             Confirm Checkout
//           </Button>
//         )}
//         {status === 'postCheckout' && (
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         )}
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CheckoutModal;
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { lightBlue } from '@mui/material/colors';

const CheckoutModal = ({ isOpen, handleClose, handleCheckout, book, status }) => {
  const navigate = useNavigate();

  const getDueDate = () => {
    const today = new Date();
    const dueDate = new Date(today.setDate(today.getDate() + 14));
    return dueDate.toLocaleDateString();
  };

  const renderMessage = () => {
    if (status === 'confirm') {
      return (
        <>
          <Box display="flex" justifyContent="center" alignItems="flex-start" gap={2} mb={2}>
            <Box
              component="img"
              src={book.cover_image_url}
              alt={`${book.book_title} cover`}
              sx={{
                width: 80,
                height: 120,
                objectFit: 'cover',
                borderRadius: '4px',
                boxShadow: 1,
              }}
            />
            <Box>
              <Typography variant="h6">{book.book_title}</Typography>
              <Typography variant="subtitle1">{book.book_author}</Typography>
              <Typography variant="subtitle2">
                Published: {new Date(book.publish_date).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Typography variant="body1">
              <strong>Are you sure you want to check out this book?</strong>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Est. Due Date:</strong> {getDueDate()}
            </Typography>
          </Box>
        </>
      );
    } else if (status === 'postCheckout') {
      return (
        <>
        <Box display="flex" justifyContent="center" alignItems="flex-start" gap={2} mb={2}>
          <Box
            component="img"
            src={book.cover_image_url}
            alt={`${book.book_title} cover`}
            sx={{
              width: 80,
              height: 120,
              objectFit: 'cover',
              borderRadius: '4px',
              boxShadow: 1,
            }}
          />
          <Box>
            <Typography variant="h6">{book.book_title}</Typography>
            <Typography variant="subtitle1">{book.book_author}</Typography>
            <Typography variant="subtitle2">
              Published: {new Date(book.publish_date).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Typography variant="body1">
            <strong>SUCCESS!</strong>
          </Typography>
          <Typography variant="body1">
            <strong>Thank you for checking out this book. Enjoy reading!</strong>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Due Date:</strong> {getDueDate()}
          </Typography>
        </Box>
      </>

        // <>
        //   <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        //     <Box
        //       component="img"
        //       src={book.cover_image_url}
        //       alt={`${book.book_title} cover`}
        //       sx={{
        //         width: 80,
        //         height: 120,
        //         objectFit: 'cover',
        //         borderRadius: '4px',
        //         boxShadow: 1,
        //       }}
        //     />
        //     <Typography variant="h6">{book.book_title}</Typography>
        //     <Typography variant="subtitle1">{book.book_author}</Typography>
        //     <Typography variant="body1" align="center">
        //       <strong>Thank you for checking out this book. Enjoy reading!</strong>
        //     </Typography>
        //   </Box>
        // </>
      );
    } else {
      return <Typography variant="body1">Something went wrong!</Typography>;
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="checkout-dialog">
      <DialogTitle>{status === 'confirm' ? <strong>Confirm Checkout</strong> : <strong>Checkout Complete</strong>}</DialogTitle>
      <DialogContent>{renderMessage()}</DialogContent>
      <DialogActions>
        {status === 'confirm' && (
          <>
            <Button
                  onClick={handleClose}
                  sx={{
                    backgroundColor: '#EED2CC !important',
                    color: '#6C9A8B !important'}}>
              Cancel
            </Button>
            <Button onClick={() => handleCheckout(book)}>
              Confirm Checkout
            </Button>
          </>
        )}
        {status === 'postCheckout' && (
          <>
            <Button
                  onClick={handleClose}
                  sx={{
                    backgroundColor: '#EED2CC !important',
                    color: '#6C9A8B !important'}}>
              Keep Browsing
            </Button>
            <Button onClick={() => navigate('/mycheckouts')}>
              Go to Checkouts
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutModal;
