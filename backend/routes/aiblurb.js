const express = require('express');
const router = express.Router();
const OpenAI = require('openai'); // <- no curly braces
require('dotenv').config();

// initialize OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY, // make sure this is set in your .env
});

router.post('/', async (req, res) => {
  const { bookTitle, bookAuthor } = req.body;
  const prompt = `Give me a 3-5 sentence long blurb for "${bookTitle}" by ${bookAuthor} that has no spoilers about the book but will persuade any random person to read it. It should give a quick overview of what the book is about in a catchy and engaging way.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
    });

    res.json({ blurb: response.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch AI blurb' });
  }
});

module.exports = router;
