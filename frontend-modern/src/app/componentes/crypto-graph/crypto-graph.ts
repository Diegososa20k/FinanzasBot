import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// 🔹 Registrar los elementos que necesita el gráfico
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

@Component({
  selector: 'app-crypto-graph',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './crypto-graph.html',
  styleUrl: './crypto-graph.scss'
})
export class CryptoGraph {
  chartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [
      { data: [10, 20, 30, 40], label: 'Bitcoin' }
    ]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private http: HttpClient) {}
}
