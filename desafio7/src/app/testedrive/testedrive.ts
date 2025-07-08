import { Component } from '@angular/core';

@Component({
  selector: 'app-testedrive',
  templateUrl: './testedrive.html',
  standalone: false,
  styleUrls: ['./testedrive.css']
})
export class Testedrive {
  // Objeto para armazenar os dados do formulário
  locacao = {
    nomeCompleto: '',
    emailConfirmacao: '',
    dataLocacao: '',
    horaLocacao: '',
    modeloCarro: null, // Inicialmente nulo para o select
    consentimentoLGPD: false,
    consentimentoDocumentacao: false
  };

  // Lista de modelos de carros disponíveis
  modelosCarros: string[] = [
    'Ford Bronco Sport',
    'Ford Territory ',
    'Ford Ranger ',
    'Ford Maverick',
    'Ford F-150',
    'Ford Mustang' // Adicionei o Mustang!
  ];

  // Variável para controlar a exibição da mensagem de confirmação
  formularioEnviado: boolean = false;

  // Função chamada ao enviar o formulário
  onSubmit() {
    // Aqui você pode adicionar a lógica para enviar os dados para um backend
    // Por exemplo, chamar um serviço HTTP usando o HttpClientModule que importamos.
    // Ex: this.http.post('/api/locacao', this.locacao).subscribe(response => { ... });

    console.log('Dados da Locação:', this.locacao);

    // Após o "envio" bem-sucedido (simulado aqui), defina formularioEnviado como true
    this.formularioEnviado = true;

    // Opcional: Você pode querer resetar o formulário após o envio
    setTimeout(() => { // Exemplo de reset após um pequeno atraso
      this.locacao = {
        nomeCompleto: '',
        emailConfirmacao: '',
        dataLocacao: '',
        horaLocacao: '',
        modeloCarro: null,
        consentimentoLGPD: false,
        consentimentoDocumentacao: false
      };
      this.formularioEnviado = false; // Esconde a mensagem de confirmação
    }, 3000); // Reseta após 3 segundos
  }
}
