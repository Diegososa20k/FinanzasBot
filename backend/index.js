const express = require('express');
const cors = require('cors');
const accionesRouter = require('./routes/acciones');

const app = express();
app.use(cors()); // 🔹 Esto permite que Angular acceda al backend

app.use('/api/acciones', accionesRouter);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
