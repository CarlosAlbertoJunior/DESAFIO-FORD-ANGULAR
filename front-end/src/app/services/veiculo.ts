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
            codigo: apiVeiculo.id,
            modelo: apiVeiculo.vehicle,
            totalVendas: apiVeiculo.volumetotal,
            conectados: apiVeiculo.connected,
            softwareAtualizado: apiVeiculo.softwareUpdates,
            imagem: apiVeiculo.img,
            ano: apiVeiculo.ano,
            cor: apiVeiculo.cor,
            preco: apiVeiculo.preco,
            vin: apiVeiculo.vin,
            odometro: apiVeiculo.odometro,
            nivelCombustivel: apiVeiculo.nivelCombustivel,
            status: apiVeiculo.status,
            lat: apiVeiculo.lat,
            long: apiVeiculo.long
          }) as Veiculo); // Garante que o tipo seja Veiculo[]
        }),
        catchError(error => {
          console.error('Erro ao carregar veículos:', error);
          return of([]); // Retorna um array vazio em caso de erro
        })
      )
      .subscribe(veiculos => {
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
      map(veiculos => veiculos.find(v => String(v.codigo) === codigo))
    );
  }

  getTotais(): Observable<{ totalVendas: number, veiculosConectados: number, softwareAtualizado: number }> {
    return this.todosVeiculos$.pipe(
      map(veiculos => {
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
        veiculos.filter(v => v.vin.toLowerCase().includes(termo.toLowerCase()))
      ),
      debounceTime(300),
      distinctUntilChanged()
    );
  }
}
