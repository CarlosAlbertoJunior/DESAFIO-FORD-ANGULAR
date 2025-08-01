import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  standalone: false,
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css'
})
export class Cabecalho {
  constructor(private router: Router) { }

  onDashboard(): void {
    this.router.navigate(['/dashboard'])
  }
  onHome(): void {
    this.router.navigate(['/home']);
  }
  onLogin(): void {
    this.router.navigate(['/login']);
  }
  onTestedrive(): void {
    this.router.navigate(['/testedrive']);
  }
}
