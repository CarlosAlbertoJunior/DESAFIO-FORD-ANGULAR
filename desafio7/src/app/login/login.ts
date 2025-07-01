import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service'; // Importa o serviço de autenticação. Ajuste o caminho se necessário!
import { Router } from '@angular/router'; // Para navegação
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login', // Seletor que você usaria no seu app.component.html
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'] // Ou usar styles: [`...`] para CSS inline
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { } // Injeta o serviço e o router

  onLogin() {
    this.auth.login(this.username, this.password).subscribe(() => {
      this.router.navigate(['home'])
    },
      (error) => {
        alert('Usuario ou senha inválido, Tente novamente!')
      }
    )
  }
}