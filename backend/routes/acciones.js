// routes/acciones.js
const express = require('express');
const router = express.Router();
const yf = require('yahoo-finance2').default;

// Acción: obtener precios actuales
router.get('/precios', async (req, res) => {
  try {
    const symbols = ['AAPL', 'NVDA', 'GME', 'AMC'];
    const precios = {};

    for (const symbol of symbols) {
      const quote = await yf.quote(symbol);
      precios[symbol] = quote.regularMarketPrice; // precio actual
    }

    res.json(precios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener precios' });
  }
});

module.exports = router;
