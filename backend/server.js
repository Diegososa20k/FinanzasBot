const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint de prueba
app.get('/api/test', (req, res) => {
  res.json({ mensaje: 'Servidor funcionando' });
});

// Endpoint para traer precios de crypto (ejemplo: Bitcoin y Ethereum)
app.get('/api/crypto', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al traer precios' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
