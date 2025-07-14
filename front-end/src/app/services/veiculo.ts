// veiculo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Veiculo } from '../dashboard/models/veiculo.model'; // Importa a interface Veiculo

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private apiUrl = 'http://localhost:3001';
  private todosVeiculosSubject = new BehaviorSubject<Veiculo[]>([]);
  todosVeiculos$: Observable<Veiculo[]> = this.todosVeiculosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.carregarTodosVeiculos(); // Carrega os dados agregados para os cards e dropdown
  }

  private carregarTodosVeiculos(): void {
    this.http.get<any>(`${this.apiUrl}/vehicles`)
      .pipe(
        map((response: any) => {
          return response.vehicles.map((apiVeiculo: any) => ({
            codigo: apiVeiculo.id,
            modelo: apiVeiculo.vehicle,
            totalVendas: apiVeiculo.volumetotal,
            conectados: apiVeiculo.connected,
            softwareAtualizado: apiVeiculo.softwareUpdates,
            imagem: apiVeiculo.img,
            // Estes campos vêm do /vehicles, mas não são detalhados por VIN aqui
            ano: undefined, // Defina como undefined ou um valor padrão se não vier do /vehicles
            cor: undefined,
            preco: undefined,
            vin: undefined, // VIN não está disponível por modelo aqui, apenas em /vehicleData
            odometro: undefined,
            nivelCombustivel: undefined,
            status: undefined,
            lat: undefined,
            long: undefined
          }) as Veiculo);
        }),
        catchError(error => {
          console.error('Erro ao carregar veículos para cards/dropdown:', error);
          return of([]);
        })
      )
      .subscribe(veiculos => {
        console.log('Dados agregados recebidos e processados no VeiculoService:', veiculos);
        this.todosVeiculosSubject.next(veiculos);
      });
  }

  buscarVeiculosPorModelo(termo: string): Observable<Veiculo[]> {
    if (!termo.trim()) {
      return of([]);
    }
    return this.todosVeiculos$
      .pipe(
        map(veiculos =>
          veiculos.filter(v => v.modelo?.toLowerCase().includes(termo.toLowerCase()))
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

  // --- AJUSTE CRÍTICO AQUI: NOVO MÉTODO para buscar VIN específico ---
  // Este método agora chama o endpoint /vehicleData do backend
  filtrarTabelaPorCodigo(vin: string): Observable<Veiculo[]> {
    if (!vin.trim()) {
      return of([]); // Retorna um array vazio se o VIN estiver vazio
    }
    return this.http.post<any>(`${this.apiUrl}/vehicleData`, { vin: vin }).pipe(
      map(response => {
        // A API /vehicleData retorna um objeto único, precisamos transformá-lo em um array.
        // E preencher os campos que vêm do /vehicleData.
        // Note que campos como 'modelo', 'totalVendas', etc., não vêm dessa API,
        // então você pode precisar preenchê-los com dados padrão ou buscá-los de outra forma
        // se eles forem necessários para a interface Veiculo completa.
        const veiculoDetalhado: Veiculo = {
          vin: vin, // O VIN que foi buscado
          odometro: response.odometro,
          nivelCombustivel: response.nivelCombustivel,
          status: response.status,
          lat: response.lat,
          long: response.long,
          // Propriedades que não vêm de /vehicleData, mas são esperadas pela interface Veiculo:
          codigo: response.id, // Assumindo que o ID do veículo vem na resposta
          modelo: 'Modelo Indisponível', // Placeholder ou buscar em outro lugar
          totalVendas: 0, // Placeholder
          conectados: 0, // Placeholder
          softwareAtualizado: 0, // Placeholder
          imagem: '' // Placeholder
        };
        return [veiculoDetalhado]; // Retorna um array contendo o único veículo encontrado
      }),
      catchError(error => {
        console.error(`Erro ao buscar dados do VIN ${vin}:`, error);
        // Se o VIN não for encontrado ou houver erro, retorna um array vazio.
        return of([]);
      })
    );
  }
}
