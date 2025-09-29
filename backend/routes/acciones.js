// routes/acciones.js
const express = require('express');
const router = express.Router();
const yf = require('yahoo-finance2').default;
const { SimpleLinearRegression } = require('ml-regression');


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

// Acción: obtener precios históricos
router.get('/historico', async (req, res) => {
  try {
    const { symbol, dias } = req.query;

    if (!symbol || !dias) {
      return res.status(400).json({ error: 'Faltan parámetros symbol o dias' });
    }

    // Obtener fecha de hace X días
    const fechaFinal = new Date();
    const fechaInicial = new Date();
    fechaInicial.setDate(fechaFinal.getDate() - Number(dias));

    // Traer historial diario
    const queryOptions = { period1: fechaInicial, period2: fechaFinal, interval: '1d' };
    const historico = await yf.historical(symbol, queryOptions);

    // Devolver solo fecha y cierre
    const preciosHistoricos = historico.map(item => ({
      fecha: item.date.toISOString().slice(0, 10), // YYYY-MM-DD
      cierre: item.close
    }));

    res.json(preciosHistoricos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
});


router.get('/prediccion', async (req, res) => {
  try {
    const { symbol, dias } = req.query;

    if (!symbol || !dias) {
      return res.status(400).json({ error: 'Faltan parámetros symbol o dias' });
    }

    const fechaFinal = new Date();
    const fechaInicial = new Date();
    fechaInicial.setDate(fechaFinal.getDate() - Number(dias));

    const queryOptions = { period1: fechaInicial, period2: fechaFinal, interval: '1d' };
    const historico = await yf.historical(symbol, queryOptions);

    const precios = historico.map((h, i) => ({ x: i, y: h.close }));
    if (precios.length < 2) {
      return res.status(400).json({ error: 'No hay suficientes datos para predecir' });
    }

    // Entrenar regresión lineal
    const X = precios.map(p => p.x);
    const Y = precios.map(p => p.y);
    const regression = new SimpleLinearRegression(X, Y);

    // Predicciones a futuro
    const ultimoIndex = X[X.length - 1];
    const predicciones = {
      '1d': regression.predict(ultimoIndex + 1),
      '7d': regression.predict(ultimoIndex + 7),
      '15d': regression.predict(ultimoIndex + 15),
      '30d': regression.predict(ultimoIndex + 30)
    };

    res.json({
      symbol,
      predicciones,
      coef: regression.slope,
      intercept: regression.intercept
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar predicciones' });
  }
});

module.exports = router;
