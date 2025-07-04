
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  constructor(private authService: AuthService, private router: Router) { }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}