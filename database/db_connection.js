const mongoose = require('mongoose');

const { mongoURI } = require('./config');

// create DB connection
const dbConnection = () => mongoose.connect(
  'mongodb://rasha:r123456@ds111455.mlab.com:11455/rashadb',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  },
);

module.exports = dbConnection;
