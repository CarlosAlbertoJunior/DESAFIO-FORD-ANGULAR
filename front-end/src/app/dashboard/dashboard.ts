import { Component, OnInit, OnDestroy } from '@angular/core';
import { VeiculoService } from '../services/veiculo';
import { Veiculo } from '../dashboard/models/veiculo.model';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone:false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit, OnDestroy {

  modeloSelecionado: Veiculo | undefined;
  todosModelosUnicos: Veiculo[] = []; // Nova propriedade para popular o dropdown

  // Variáveis para os cartões de dados
  totalVendas: number = 0;
  veiculosConectados: number = 0;
  softwareAtualizado: number = 0;

  // Variáveis para a tabela
  codigoBusca: string = '';
  private codigoBuscaSubject = new Subject<string>();
  veiculosTabela: Veiculo[] = []; // Dados completos da tabela
  veiculosExibidos: Veiculo[] = []; // Dados filtrados/exibidos na tabela

  private subscriptions: Subscription[] = [];

  constructor(private veiculoService: VeiculoService) { }

  ngOnInit(): void {
    // Não é mais necessário inicializar a busca de modelos com debounce se for dropdown

    // Inicializar a busca da tabela com debounce (mantido)
    this.subscriptions.push(
      this.codigoBuscaSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
      ).subscribe(termo => {
        this.veiculoService.filtrarTabelaPorCodigo(termo).subscribe((veiculosFiltrados: Veiculo[]) => {
          this.veiculosExibidos = veiculosFiltrados;
        });
      })
    );

    // Carregar todos os veículos para a tabela e para popular o dropdown
    this.subscriptions.push(
      this.veiculoService.todosVeiculos$.subscribe((veiculos: Veiculo[]) => {
        this.veiculosTabela = veiculos;
        this.veiculosExibidos = veiculos; // Exibe todos inicialmente

        // Popular a lista de modelos únicos para o dropdown
        this.todosModelosUnicos = this.getUniqueModels(veiculos);

        this.atualizarTotaisGlobais(); // Atualiza os totais iniciais
      })
    );

    // Carregar totais iniciais para os cards (mantido)
    this.subscriptions.push(
      this.veiculoService.getTotais().subscribe((totais: { totalVendas: number; veiculosConectados: number; softwareAtualizado: number; }) => {
        this.totalVendas = totais.totalVendas;
        this.veiculosConectados = totais.veiculosConectados;
        this.softwareAtualizado = totais.softwareAtualizado;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // NOVO: Método para obter modelos únicos
  private getUniqueModels(veiculos: Veiculo[]): Veiculo[] {
    const uniqueModelsMap = new Map<string, Veiculo>();
    veiculos.forEach(veiculo => {
      if (!uniqueModelsMap.has(veiculo.modelo)) {
        uniqueModelsMap.set(veiculo.modelo, veiculo);
      }
    });
    return Array.from(uniqueModelsMap.values());
  }

  // NOVO: Método chamado quando um modelo é selecionado no dropdown
  onModeloChange(): void {
    if (this.modeloSelecionado) {
      this.atualizarCardsDeDadosPorModelo(this.modeloSelecionado);
      // Filtra a tabela para mostrar apenas veículos do modelo selecionado
      this.veiculosExibidos = this.veiculosTabela.filter(v => v.modelo === this.modeloSelecionado?.modelo);
    } else {
      // Se "Selecione um modelo" for escolhido, volta aos totais globais e todos os veículos na tabela
      this.atualizarTotaisGlobais();
      this.veiculosExibidos = this.veiculosTabela;
    }
  }

  atualizarCardsDeDadosPorModelo(modelo: Veiculo): void {

      this.totalVendas = modelo.totalVendas || 0;
      this.veiculosConectados = modelo.conectados || 0;
      this.softwareAtualizado = modelo.softwareAtualizado || 0;
  }

  // Atualiza os totais globais (quando nenhum modelo específico é selecionado ou no início)
  atualizarTotaisGlobais(): void {
    this.veiculoService.getTotais().subscribe((totais: { totalVendas: number; veiculosConectados: number; softwareAtualizado: number; }) => {
      this.totalVendas = totais.totalVendas;
      this.veiculosConectados = totais.veiculosConectados;
      this.softwareAtualizado = totais.softwareAtualizado;
    });
  }

  // Métodos para a Tabela (mantido)
  filtrarTabela(): void {
    this.codigoBuscaSubject.next(this.codigoBusca);
  }
}
