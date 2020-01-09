let { MONGO_URI: mongoURI } = 'mongodb://rasha:r123456@ds111455.mlab.com:11455/rashadb';

// if (process.env.NODE_ENV === 'test') {
//   // change MONGOURI to testDBurl
//   mongoURI = process.env.MONGOURI_TEST;
// }

module.exports = { mongoURI };
