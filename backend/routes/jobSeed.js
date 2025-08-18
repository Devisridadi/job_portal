const express = require('express');
const router = express.Router();
const Job = require('../models/job');

router.post('/seed-jobs', async (req, res) => {
  try {
    const jobs = [
      { title: "Software Engineer", company: "TechCorp", location: "Bangalore", description: "Develop web apps" },
      { title: "Data Analyst", company: "DataWorks", location: "Hyderabad", description: "Analyze datasets" },
      { title: "Product Manager", company: "InnovateX", location: "Mumbai", description: "Manage product lifecycle" },
    ];

    await Job.insertMany(jobs);
    res.status(201).json({ message: "Sample jobs inserted" });
  } catch (error) {
    res.status(500).json({ message: "Error inserting jobs", error });
  }
});

module.exports = router;
