const express = require('express');
const router = express.Router();
const { Books, Readers, Checkouts } = require('../models');


// *** Books Table *** //

// GET /books — get all books ✅
router.get('/books', async (req, res) => {
    try {
        const books = await Books.findAll();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /books/:book_id — get book by ID ✅
router.get('/books/:book_id', async (req, res) => {
    const { book_id } = req.params;
    try {
        const book = await Books.findOne({
            where: { book_id: book_id },
        });

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /books — add new book ✅
router.post('/books', async (req, res) => {
    const { book_title, book_author, publish_date, cover_image_url } = req.body;

    try {
        const newBook = await Books.create({
            book_title,
            book_author,
            publish_date,
            cover_image_url,
        });

        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /books/:book_id — update book details ✅
router.put('/books/:book_id', async (req, res) => {
    const { book_id } = req.params;
    const { book_title, book_author, publish_date, cover_image_url, book_status } = req.body;

    try {
        const book = await Books.findOne({
            where: { book_id: book_id },
        });

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        book.book_title = book_title || book.book_title;
        book.book_author = book_author || book.book_author;
        book.publish_date = publish_date || book.publish_date;
        book.cover_image_url = cover_image_url || book.cover_image_url;
        if (book_status !== undefined) book.book_status = book_status; 
        // book_status as false would never register using above structure
        
        await book.save();

        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// *** Checkouts Table *** //

// GET /checkouts — get all checkouts ✅
router.get('/checkouts', async (req, res) => {
    try {
      const checkouts = await Checkouts.findAll({
        include: [
          {
            model: Books,
            attributes: ['book_title', 'book_author'],
          },
          {
            model: Readers,
            attributes: ['username'],
          },
        ],
      });
      res.json(checkouts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  


module.exports = router;