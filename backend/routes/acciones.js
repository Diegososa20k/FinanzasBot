// routes/acciones.js
const express = require('express');
const router = express.Router();

// Endpoint para precios de acciones simulados
router.get('/precios', (req, res) => {
  const data = {
    AAPL: Math.floor(Math.random() * 20) + 170,
    NVDA: Math.floor(Math.random() * 20) + 380,
    GME: Math.floor(Math.random() * 10) + 30,
    AMC: Math.floor(Math.random() * 5) + 10
  };
  res.json(data);
});

module.exports = router;
