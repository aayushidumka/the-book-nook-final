const express = require('express');
const router = express.Router();

const { Books, Checkouts, Readers } = require('../models');

// ** Books Table ** //

// GET /user/library — get all ACTIVE books ✅
router.get('/library', async (req, res) => {
    try {
      const books = await Books.findAll({
        where: { book_status: true }
      });
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// GET /user/library/:book_id — get book by ID ✅
router.get('/library/:book_id', async (req, res) => {
    const { book_id } = req.params; // Extract the book_id from the request params
    try {
        const book = await Books.findOne({
            where: {
                book_id: book_id,
            },
        });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book); // Return the book data
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ** Checkouts Table ** //

// GET /checkouts/:reader_id — get all books by reader_id ✅
router.get('/checkouts/:reader_id', async (req, res) => {
    const { reader_id } = req.params; // Extract the reader_id from the request params
    try {
        const checkouts = await Checkouts.findAll({
            where: {
                reader_id: reader_id,
            },
            include: [{
                model: Books,
                attributes: ['book_id', 'book_title', 'book_author', 'cover_image_url'], // Include book details
            }],
        });

        if (!checkouts || checkouts.length === 0) {
            return res.status(404).json({ error: 'No checkouts found for this reader' });
        }

        res.json(checkouts); // Return all the checkouts for this reader
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /checkouts/:reader_id/:book_id — get specific checkout by reader_id and book_id ✅
router.get('/checkouts/:reader_id/:book_id', async (req, res) => {
    const { reader_id, book_id } = req.params;
  
    try {
      const checkout = await Checkouts.findOne({
        where: {
          reader_id: reader_id,
          book_id: book_id
        }
      });
  
      if (!checkout) {
        return res.status(404).json({ error: 'Checkout not found for this reader and book' });
      }
  
      res.json(checkout);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}); // needed to edit status of individual

// POST /checkouts — add a new checkout ✅
router.post('/checkouts', async (req, res) => {
    const { reader_id, book_id } = req.body;
  
    try {
      // Check if reader exists
      const reader = await Readers.findByPk(reader_id);
      if (!reader) {
        return res.status(404).json({ error: 'Reader not found.' });
      };

      // Check if book exists
      const book = await Books.findByPk(book_id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found.' });
      };
      
      // Check if checkout already exists
      const existingCheckout = await Checkouts.findOne({
        where: { reader_id, book_id }
      });
  
      if (existingCheckout) {
        return res.status(400).json({
          error: 'A checkout for this book and reader already exists. You will need to update it instead.'
        });
      };
  
      // Create new checkout
      const newCheckout = await Checkouts.create({
        reader_id,
        book_id
      });
  
      res.status(201).json(newCheckout);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// PUT /checkouts/:reader_id/:book_id — update the status (renew any inactive checkouts OR return active checkouts) ✅
router.put('/checkouts/:reader_id/:book_id', async (req, res) => {
    const { reader_id, book_id } = req.params;
    const { checkout_status } = req.body;  // boolean true=active/false=inactive
  
    try {
      const checkout = await Checkouts.findOne({
        where: { reader_id, book_id }
      });
  
      if (!checkout) {
        return res.status(404).json({ error: 'Checkout not found.' });
      }
  
      if (typeof checkout_status !== 'boolean') {
        return res.status(400).json({ error: 'checkout_status must be a boolean' });
      }
  
      // Update status
      checkout.checkout_status = checkout_status;
  
      // Update latest_return_day based on new status
      if (checkout_status === true) {
        // Renew checkout: 2 weeks from today
        checkout.latest_return_day = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
      } else {
        // Return book: set to today
        checkout.latest_return_day = new Date();
      }
  
      await checkout.save();
  
      res.json({ message: 'Checkout updated successfully', checkout });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// export the router
module.exports = router;

