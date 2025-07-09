import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs'; // RxJS!
import { map, filter, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators'; // Operadores [cite: 109]
import { Veiculo } from '../dashboard/models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private apiUrl = 'http://localhost:3000'; // Endereço da sua API
  private todosVeiculosSubject = new BehaviorSubject<Veiculo[]>([]); // Para armazenar todos os veículos
  todosVeiculos$: Observable<Veiculo[]> = this.todosVeiculosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.carregarTodosVeiculos(); // Carrega os veículos ao iniciar o serviço
  }

  // Carrega todos os veículos (para a tabela e sugestões)
  private carregarTodosVeiculos(): void {
    this.http.get<Veiculo[]>(`${this.apiUrl}/vehicle`) // [cite: 75, 80]
      .pipe(
        catchError(error => {
          console.error('Erro ao carregar veículos:', error);
          return of([]); // Retorna um array vazio em caso de erro
        })
      )
      .subscribe(veiculos => {
        this.todosVeiculosSubject.next(veiculos);
      });
  }

  // Método para buscar veículos por nome do modelo (para sugestões de busca) [cite: 73]
  buscarVeiculosPorModelo(termo: string): Observable<Veiculo[]> {
    if (!termo.trim()) {
      return of([]);
    }
    return this.todosVeiculos$
      .pipe(
        map(veiculos =>
          veiculos.filter(v => v.modelo.toLowerCase().includes(termo.toLowerCase()))
        ),
        debounceTime(300), // Atraso para evitar muitas requisições [cite: 109]
        distinctUntilChanged() // Apenas se o termo de busca mudou [cite: 109]
      );
  }

  // Método para obter um veículo específico pelo ID/código [cite: 80]
  getVeiculoByCodigo(codigo: string): Observable<Veiculo | undefined> {
    return this.todosVeiculos$.pipe(
      map(veiculos => veiculos.find(v => v.id === codigo))
    );
  }

  // Métodos para obter os totais para os cartões (pode ser mockado ou vir da API)
  // Para fins do desafio, pode-se calcular com base nos dados carregados
  getTotais(): Observable<{ totalVendas: number, veiculosConectados: number, softwareAtualizado: number }> {
    return this.todosVeiculos$.pipe(
      map(veiculos => {
        // Exemplo de lógica para calcular os totais
        const totalVendas = veiculos.reduce((sum, v) => sum + (v.totalVendas || 0), 0);
        const veiculosConectados = veiculos.reduce((sum, v) => sum + (v.conectados || 0), 0);
        const softwareAtualizado = veiculos.reduce((sum, v) => sum + (v.softwareAtualizado || 0), 0);
        return { totalVendas, veiculosConectados, softwareAtualizado };
      })
    );
  }

  // Método para filtrar a tabela (busca por código)
  filtrarTabelaPorCodigo(termo: string): Observable<Veiculo[]> {
    if (!termo.trim()) {
      return this.todosVeiculos$; // Retorna todos se a busca estiver vazia
    }
    return this.todosVeiculos$.pipe(
      map(veiculos =>
        veiculos.filter(v => v.id.toLowerCase().includes(termo.toLowerCase()))
      ),
      debounceTime(300),
      distinctUntilChanged()
    );
  }
}
