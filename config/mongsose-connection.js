
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jainkhushi953021:mACTNq66UCIVsjRw@cluster0.bpcmdv6.mongodb.net/SecureScribe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 30000,  
}).then(() => {
  console.log('Database connection successful');
}).catch((err) => {
  console.error('Database connection error:', err);
});

let db = mongoose.connection
module.exports = db;