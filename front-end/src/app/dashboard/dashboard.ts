// dashboard.ts - Não há alterações necessárias aqui com as mudanças no serviço
// O código que você já tinha para o dashboard.ts está correto para consumir o serviço ajustado.
import { Component, OnInit, OnDestroy } from '@angular/core';
import { VeiculoService } from '../services/veiculo';
import { Veiculo } from '../dashboard/models/veiculo.model';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit, OnDestroy {

  modeloSelecionado: Veiculo | undefined;
  todosModelosUnicos: Veiculo[] = [];

  totalVendas: number = 0;
  veiculosConectados: number = 0;
  softwareAtualizado: number = 0;

  codigoBusca: string = '';
  private codigoBuscaSubject = new Subject<string>();
  veiculosTabela: Veiculo[] = [];
  veiculosExibidos: Veiculo[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private veiculoService: VeiculoService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.codigoBuscaSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
      ).subscribe(termo => {
        if (termo) {
          // Esta chamada agora acionará o POST para /vehicleData no serviço
          this.veiculoService.filtrarTabelaPorCodigo(termo).subscribe((veiculosFiltrados: Veiculo[]) => {
            this.veiculosExibidos = veiculosFiltrados;
          });
        } else {
          this.veiculosExibidos = [];
        }
      })
    );

    this.subscriptions.push(
      this.veiculoService.todosVeiculos$.subscribe((veiculos: Veiculo[]) => {
        this.veiculosTabela = veiculos;
        this.todosModelosUnicos = this.getUniqueModels(veiculos);
        this.atualizarTotaisGlobais();
      })
    );

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

  private getUniqueModels(veiculos: Veiculo[]): Veiculo[] {
    const uniqueModelsMap = new Map<string, Veiculo>();
    veiculos.forEach(veiculo => {
      // Usar 'modelo' para a chave, pois é o que está no dropdown
      if (veiculo.modelo && !uniqueModelsMap.has(veiculo.modelo)) {
        uniqueModelsMap.set(veiculo.modelo, veiculo);
      }
    });
    return Array.from(uniqueModelsMap.values());
  }

  onModeloChange(): void {
    this.codigoBusca = '';
    this.veiculosExibidos = [];

    if (this.modeloSelecionado) {
      this.atualizarCardsDeDadosPorModelo(this.modeloSelecionado);
    } else {
      this.atualizarTotaisGlobais();
    }
  }

  atualizarCardsDeDadosPorModelo(modelo: Veiculo): void {
    this.totalVendas = modelo.totalVendas || 0;
    this.veiculosConectados = modelo.conectados || 0;
    this.softwareAtualizado = modelo.softwareAtualizado || 0;
  }

  atualizarTotaisGlobais(): void {
    this.veiculoService.getTotais().subscribe((totais: { totalVendas: number; veiculosConectados: number; softwareAtualizado: number; }) => {
      this.totalVendas = totais.totalVendas;
      this.veiculosConectados = totais.veiculosConectados;
      this.softwareAtualizado = totais.softwareAtualizado;
    });
  }

  filtrarTabela(): void {
    this.codigoBuscaSubject.next(this.codigoBusca);
  }
}
