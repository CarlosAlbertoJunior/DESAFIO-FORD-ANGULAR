import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service'; // Importa o serviço de autenticação. Ajuste o caminho se necessário!
import { Router } from '@angular/router'; // Para navegação

@Component({
  selector: 'app-login', // Seletor que você usaria no seu app.component.html
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'] // Ou usar styles: [`...`] para CSS inline
})
export class LoginComponent {
  username = '';
  password = '';
  rememberMe = false;
  errorMessage: string | null = null; // Para exibir mensagens de erro

  constructor() { } // Injeta o serviço e o router


}