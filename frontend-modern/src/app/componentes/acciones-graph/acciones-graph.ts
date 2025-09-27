import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-acciones-graph',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './acciones-graph.html',
  styleUrl: './acciones-graph.scss'
})
export class AccionesGraphComponent {
  precios: Record<string, number> = {}; // 🔹 objeto con precios
  acciones: string[] = []; // 🔹 lista de símbolos

  constructor(private http: HttpClient) {
    this.cargarDatos();
  }

  cargarDatos() {
    this.http.get<Record<string, number>>('http://localhost:3000/api/acciones/precios')
      .subscribe({
        next: (data) => {
          this.precios = data;
          this.acciones = Object.keys(data);
        },
        error: (err) => {
          console.error('Error cargando precios:', err);
        }
      });
  }
}
