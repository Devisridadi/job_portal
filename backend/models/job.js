
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  postedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
