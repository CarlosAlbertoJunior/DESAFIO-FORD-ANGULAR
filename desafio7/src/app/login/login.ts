import { Component, signal } from '@angular/core';
import { Router } from '@angular/router'; // Para navegação
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login', // Seletor que você usaria no seu app.component.html
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'] // Ou usar styles: [`...`] para CSS inline
})
export class Login {
  username = '';
  password = '';
  loginError: boolean = false;
   hide = true;

  constructor(private auth: AuthService, private router: Router) { }



  onLogin(): void {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/home'])
    }
    else {
      this.loginError = true;
    }

  }
}
