import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acciones-graph',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './acciones-graph.html',
  styleUrls: ['./acciones-graph.scss']
})
export class AccionesGraphComponent {
  precios: Record<string, number> = {};
  historico: Record<string, { fecha: string; cierre: number }[]> = {};
  accionSeleccionada: string = 'AAPL';
  diasSeleccionados: number = 7;

  predicciones: { [key: string]: number } | null = null;

obtenerPredicciones() {
  this.http.get<any>(
    `http://localhost:3000/api/acciones/prediccion?symbol=${this.accionSeleccionada}&dias=${this.diasSeleccionados}`
  ).subscribe({
    next: data => {
      this.predicciones = data.predicciones;
    },
    error: err => console.error('Error al obtener predicciones', err)
  });
}


  // Indicadores
  sma: number | null = null;
  ema: number | null = null;
  rsi: number | null = null;
  // Indicadores nuevos
  smaCorto: number | null = null;
  smaLargo: number | null = null;
  cruce: string = '';

  cambioPorcentual: number | null = null;
  tendencia: string = '';

  constructor(private http: HttpClient) {
    this.actualizarPrecios();
  }

  actualizarPrecios() {
    this.http.get<any>('http://localhost:3000/api/acciones/precios')
      .subscribe({
        next: data => this.precios = data,
        error: err => console.error('Error al obtener precios', err)
      });
  }

  getAcciones() {
    return Object.keys(this.precios);
  }

  obtenerHistorico() {
    this.http.get<any>(
      `http://localhost:3000/api/acciones/historico?symbol=${this.accionSeleccionada}&dias=${this.diasSeleccionados}`
    ).subscribe({
      next: data => {
        this.historico[this.accionSeleccionada] = data;
        this.calcularIndicadores();
      },
      error: err => console.error('Error al obtener histórico', err)
    });
  }

  calcularIndicadores() {
    const datos = this.historico[this.accionSeleccionada];
    if (!datos || datos.length === 0) return;

    const preciosCierre = datos.map(item => item.cierre);

    // SMA
    this.sma = preciosCierre.reduce((a, b) => a + b, 0) / preciosCierre.length;

    // EMA (Exponencial) con factor alpha = 2 / (N + 1)
    const N = preciosCierre.length;
    let emaPrev = preciosCierre[0];
    const alpha = 2 / (N + 1);
    for (let i = 1; i < preciosCierre.length; i++) {
      emaPrev = alpha * preciosCierre[i] + (1 - alpha) * emaPrev;
    }
    this.ema = emaPrev;

    // Cambio porcentual
    const primer = preciosCierre[0];
    const ultimo = preciosCierre[preciosCierre.length - 1];
    this.cambioPorcentual = ((ultimo - primer) / primer) * 100;

    // Tendencia
    if (this.cambioPorcentual > 1) this.tendencia = 'Sube';
    else if (this.cambioPorcentual < -1) this.tendencia = 'Baja';
    else this.tendencia = 'Estable';

    // RSI simplificado
    let ganancias = 0;
    let perdidas = 0;
    for (let i = 1; i < preciosCierre.length; i++) {
      const diff = preciosCierre[i] - preciosCierre[i - 1];
      if (diff > 0) ganancias += diff;
      else perdidas -= diff; // diff negativo
    }
    const avgGanancia = ganancias / preciosCierre.length;
    const avgPerdida = perdidas / preciosCierre.length;
    const RS = avgPerdida === 0 ? 100 : avgGanancia / avgPerdida;
    this.rsi = 100 - 100 / (1 + RS);

    // RSI estado
    let estadoRSI = '';
    if (this.rsi >= 70) {
      estadoRSI = 'Sobrecompra (posible corrección)';
    } else if (this.rsi <= 30) {
      estadoRSI = 'Sobreventa (posible rebote)';
    } else {
      estadoRSI = 'Neutral';
    }
    this.tendencia += ` | RSI: ${estadoRSI}`;



    function calcularSMA(data: number[], period: number): number {
      if (data.length < period) return NaN;
      const subset = data.slice(data.length - period);
      return subset.reduce((a, b) => a + b, 0) / subset.length;
    }

    // dentro de calcularIndicadores()
    const smaCorto = calcularSMA(preciosCierre, 7);
    const smaLargo = calcularSMA(preciosCierre, 30);

    let cruce = '';
    if (smaCorto > smaLargo) cruce = 'Alcista (Golden Cross)';
    else if (smaCorto < smaLargo) cruce = 'Bajista (Death Cross)';
    else cruce = 'Neutral';

  }


}
