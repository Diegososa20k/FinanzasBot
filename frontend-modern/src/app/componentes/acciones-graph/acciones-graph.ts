import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-acciones-graph',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './acciones-graph.html',
  styleUrls: ['./acciones-graph.scss']
})
export class AccionesGraphComponent {
  precios: Record<string, number> = {};

  constructor(private http: HttpClient) {
    this.actualizarPrecios();
  }

  actualizarPrecios() {
    this.http.get<any>('http://localhost:3000/api/acciones/precios')
      .subscribe({
        next: data => {
          this.precios = data;
        },
        error: err => console.error('Error al obtener precios', err)
      });
  }

  getAcciones() {
    return Object.keys(this.precios);
  }
}
