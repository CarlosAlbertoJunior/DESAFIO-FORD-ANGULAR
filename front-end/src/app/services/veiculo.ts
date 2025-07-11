import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Veiculo } from '../dashboard/models/veiculo.model'; // Importa a interface Veiculo

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private apiUrl = 'http://localhost:3001'; // Removido barra final para evitar // na URL
  private todosVeiculosSubject = new BehaviorSubject<Veiculo[]>([]);
  todosVeiculos$: Observable<Veiculo[]> = this.todosVeiculosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.carregarTodosVeiculos();
  }

  private carregarTodosVeiculos(): void {
    this.http.get<any>(`${this.apiUrl}/vehicles`) // Requisição para o endpoint /vehicles
      .pipe(
        map((response: any) => {
          // Mapeia a resposta da API para o formato Veiculo esperado pelo Angular
          // A API retorna um objeto { vehicles: [...] }, então acessamos response.vehicles
          return response.vehicles.map((apiVeiculo: any) => ({
            codigo: apiVeiculo.id, // Mapeia 'id' da API para 'codigo' do Angular
            modelo: apiVeiculo.vehicle, // Mapeia 'vehicle' da API para 'modelo' do Angular
            totalVendas: apiVeiculo.volumetotal, // Mapeia 'volumetotal' da API para 'totalVendas' do Angular
            conectados: apiVeiculo.connected, // Mapeia 'connected' da API para 'conectados' do Angular
            softwareAtualizado: apiVeiculo.softwareUpdates, // Mapeia 'softwareUpdates' da API para 'softwareAtualizado' do Angular
            imagem: apiVeiculo.img, // Mapeia 'img' da API para 'imagem' do Angular
            ano: apiVeiculo.ano, // Mapeado da propriedade 'ano' da API
            cor: apiVeiculo.cor, // Mapeado da propriedade 'cor' da API
            preco: apiVeiculo.preco // Mapeado da propriedade 'preco' da API
          }) as Veiculo); // Garante que o tipo seja Veiculo[]
        }),
        catchError(error => {
          console.error('Erro ao carregar veículos:', error);
          return of([]); // Retorna um array vazio em caso de erro
        })
      )
      .subscribe(veiculos => {
        // Adicione este console.log para depuração
        console.log('Dados recebidos e processados no VeiculoService:', veiculos);
        this.todosVeiculosSubject.next(veiculos); // Emite os veículos mapeados
      });
  }

  buscarVeiculosPorModelo(termo: string): Observable<Veiculo[]> {
    if (!termo.trim()) {
      return of([]);
    }
    return this.todosVeiculos$
      .pipe(
        map(veiculos =>
          veiculos.filter(v => v.modelo.toLowerCase().includes(termo.toLowerCase()))
        ),
        debounceTime(300),
        distinctUntilChanged()
      );
  }

  getVeiculoByCodigo(codigo: string): Observable<Veiculo | undefined> {
    return this.todosVeiculos$.pipe(
      map(veiculos => veiculos.find(v => String(v.codigo) === codigo)) // Usa 'codigo' agora
    );
  }

  getTotais(): Observable<{ totalVendas: number, veiculosConectados: number, softwareAtualizado: number }> {
    return this.todosVeiculos$.pipe(
      map(veiculos => {
        // Agora usa as propriedades mapeadas para Veiculo
        const totalVendas = veiculos.reduce((sum, v) => sum + (v.totalVendas || 0), 0);
        const veiculosConectados = veiculos.reduce((sum, v) => sum + (v.conectados || 0), 0);
        const softwareAtualizado = veiculos.reduce((sum, v) => sum + (v.softwareAtualizado || 0), 0);
        return { totalVendas, veiculosConectados, softwareAtualizado };
      })
    );
  }

  filtrarTabelaPorCodigo(termo: string): Observable<Veiculo[]> {
    if (!termo.trim()) {
      return this.todosVeiculos$;
    }
    return this.todosVeiculos$.pipe(
      map(veiculos =>
        veiculos.filter(v => String(v.codigo).toLowerCase().includes(termo.toLowerCase())) // Usa 'codigo' agora
      ),
      debounceTime(300),
      distinctUntilChanged()
    );
  }
}
