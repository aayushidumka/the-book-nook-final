const express = require('express');
const router = express.Router();

const Readers = require('../models/readersModel');

// GET /readers/username/:username — get reader by username ✅
// router.get('/readers/:username', async (req, res) => {
//     const { username } = req.params;
  
//     try {
//       const reader = await Readers.findOne({
//         where: { username: username }
//       });
  
//       if (!reader) {
//         return res.status(404).json({ error: 'Reader not found' });
//       }
  
//       res.json(reader); // or res.json({ reader_id: reader.reader_id }) if you just want ID
//     } catch (err) {
//       console.error('Error fetching reader:', err);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });
router.get('/readers/:username', async (req, res) => {
  try {
    const reader = await Readers.findOne({ where: { username: req.params.username } });

    if (!reader) {
      return res.status(200).json(null);  // or { exists: false }
    }

    res.status(200).json(reader);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// POST /readers — add a new reader
router.post('/readers', async (req, res) => {
  const { username } = req.body;

  try {
    if (!username) {
      return res.status(400).json({ error: 'Username is required.' });
    }

    const newReader = await Readers.create({
      username
    });

    res.status(201).json(newReader);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
