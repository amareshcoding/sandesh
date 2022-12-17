const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const chatRoute = require('./routes/chat.route');
const messageRoute = require('./routes/message.route');

//app setup
const app = express();
app.use(cors());
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

//message
app.use('/api/message', messageRoute);

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
