import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CryptoGraph } from './componentes/crypto-graph/crypto-graph';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CryptoGraph],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected readonly title = signal('frontend');
}
