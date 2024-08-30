var mongoose = require('mongoose');
const {dbUrl} = require('../config/index.js')
require('./model/index.js')

mongoose.connect(dbUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected!");
});
db.once('close', () => {
  console.log("we're closed!");
})

module.exports = db