const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const chatRoute = require('./routes/chat.route');
const messageRoute = require('./routes/message.route');
const path = require('path');

//app setup
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

//user and authentication
app.use('/api/user', userRouter);

//chat
app.use('/api/chat', chatRoute);

//message
app.use('/api/message', messageRoute);

//------------------Deployment--------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'));
  });
} else {
  //home route
  app.get('/', (req, res) => {
    res.send('home route');
  });
}
//------------------Deployment--------------

//Error handeling
app.use(notFound);
app.use(errorHandler);

//server listening
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
  try {
    connectDB();
    console.log(`server running on port ${PORT}`);
  } catch (err) {
    console.log(err.message);
  }
});

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('connected to socket.io');

  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('room: ', room);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log('chat users not defined');

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;

      socket.in(user._id).emit('message recieved', newMessageRecieved);
    });
  });

  socket.off('setup', () => {
    console.log('io disconnected!');
    socket.leave(userRouter._id);
  });
});
