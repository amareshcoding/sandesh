const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { register, login } = require('./controllers/auth.controller');
const userRouter = require('./routes/user.route');
const { notFound, errorHandler } = require('./middleware/error.middleware');

//app setup
const app = express();
app.use(express.json());
dotenv.config();

//Authentication
app.post('/register', register);
app.post('/login', login);

//user
app.use('/api/users', userRouter);

//
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

//Error handeling
app.use(notFound);
app.use(errorHandler);


//server listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  try {
    connectDB();
    console.log(`server running on port ${PORT}`);
  } catch (err) {
    console.log(err.message);
  }
});
