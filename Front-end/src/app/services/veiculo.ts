import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { Veiculo } from '../dashboard/models/veiculo.model'; // Assumindo que este caminho está correto

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  // URL da API corrigida para evitar barra dupla:
  private apiUrl = 'http://localhost:3001';
  private todosVeiculosSubject = new BehaviorSubject<Veiculo[]>([]);
  todosVeiculos$: Observable<Veiculo[]> = this.todosVeiculosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.carregarTodosVeiculos();
  }

  private carregarTodosVeiculos(): void {
    this.http.get<Veiculo[]>(`${this.apiUrl}/vehicle`) // Caminho corrigido
      .pipe(
        catchError(error => {
          console.error('Erro ao carregar veículos:', error);
          // Retorna um array vazio para garantir que o observable complete sem erro
          return of([]);
        })
      )
      .subscribe(veiculos => {
        this.todosVeiculosSubject.next(veiculos);
      });
  }

  buscarVeiculosPorModelo(termo: string): Observable<Veiculo[]> {
    if (!termo.trim()) {
      return of([]);
    }
    const lowerCaseTerm = termo.toLowerCase(); // Otimiza convertendo para minúsculas uma vez
    return this.todosVeiculos$.pipe(
      map(veiculos =>
        veiculos.filter(v =>
          // Garante que v.modelo seja tratado como string antes de toLowerCase()
          (v.modelo?.toString() || '').toLowerCase().includes(lowerCaseTerm)
        )
      ),
      debounceTime(300),
      distinctUntilChanged()
    );
  }

  getVeiculoByCodigo(codigo: string): Observable<Veiculo | undefined> {
    return this.todosVeiculos$.pipe(
      map(veiculos => veiculos.find(v => v.id === codigo))
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
    const lowerCaseTerm = termo.toLowerCase(); // Otimiza convertendo para minúsculas uma vez
    return this.todosVeiculos$.pipe(
      map(veiculos =>
        veiculos.filter(v =>
          // Correção crucial: Garante que v.id seja uma string antes de chamar toLowerCase()
          // Usar .toString() lida com tipos string e number de forma segura.
          // Adicionado `v.id?` e `|| ''` para robustez, caso id possa ser nulo/indefinido.
          (v.id?.toString() || '').toLowerCase().includes(lowerCaseTerm)
        )
      ),
      debounceTime(300),
      distinctUntilChanged()
    );
  }
}
export type { Veiculo };