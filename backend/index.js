const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRouter = require('./routes/user.route');
const { notFound, errorHandler } = require('./middleware/error.middleware');
const chatRoute = require('./routes/chat.route');

//app setup
const app = express();
app.use(express.json());
dotenv.config();

//home route
app.get('/', (req, res) => {
  res.send('home route');
});

//user and authentication
app.use('/api/user', userRouter);

//chat
app.use('/api/chat', chatRoute);

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
