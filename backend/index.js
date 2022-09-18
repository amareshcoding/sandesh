const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.send('home route');
});
app.get('/api/chat', async (req, res) => {
  try {
    res.send('/api/chat route');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/chat/:id', async (req, res) => {
  try {
    res.send('/api/chat//id route');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  try {
    console.log(`server running on port ${PORT}`);
  } catch (err) {
    console.log(err.message);
  }
});
