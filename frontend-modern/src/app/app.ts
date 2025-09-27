import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccionesGraphComponent } from './componentes/acciones-graph/acciones-graph';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccionesGraphComponent], // 🔹 Aquí lo importas
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
