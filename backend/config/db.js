const mongoose = require('mongoose');

module.exports = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongoDb connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(`Error : ${err.message}`);
    process.exit();
  }
};
