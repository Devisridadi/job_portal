const express = require('express');
const router = express.Router();
const Application = require('../models/Applications');

// POST /api/apply
router.post('/apply', async (req, res) => {
  const { jobId, employeeEmail } = req.body;

  try {
    // Prevent duplicate applications
    const alreadyApplied = await Application.findOne({ jobId, employeeEmail });
    if (alreadyApplied) {
      return res.status(400).json({ message: "You already applied to this job" });
    }

    const newApplication = new Application({ jobId, employeeEmail });
    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
