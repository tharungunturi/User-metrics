const express = require('express');
const router = express.Router();
const { loginCounter, activeUsersGauge } = require('../metrics');

router.post('/login', (req, res) => {
  loginCounter.inc();
  activeUsersGauge.inc();

  // your real auth logic here
  res.status(200).json({ message: "Login successful" });
});

module.exports = router;
