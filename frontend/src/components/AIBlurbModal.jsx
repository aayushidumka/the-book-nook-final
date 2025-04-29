import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, Button } from '@mui/material';

const AIBlurbModal = ({ isOpen, handleClose, aiBlurb }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>AI Blurb</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            {aiBlurb || 'Loading...'}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
            onClick={handleClose}
            sx={{
              backgroundColor: '#EED2CC !important',
              color: '#6C9A8B !important'}}>
        Cancel
      </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AIBlurbModal;
