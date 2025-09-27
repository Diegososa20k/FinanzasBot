// index.js
const express = require('express');
const app = express();
const accionesRouter = require('./routes/acciones');
const cors = require('cors'); // 🔹 importa cors

// 🔹 Permitir todas las conexiones desde cualquier origen
app.use(cors());

app.use('/api/acciones', accionesRouter);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
