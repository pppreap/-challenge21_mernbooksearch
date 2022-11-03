const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:coding9@cluster0.cryb1id.mongodb.net/?retryWrites=true&w=majority' || 'mongodb://localhost:27017/mern-book', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  // useFindAndModify: false,
// }).catch ((err) => {
//   console.log(err);
});

module.exports = mongoose.connection;


