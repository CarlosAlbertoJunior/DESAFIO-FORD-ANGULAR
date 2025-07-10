import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Veiculo } from '../dashboard/models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private apiUrl = 'http://localhost:3001/'; // Endereço da sua API
  private todosVeiculosSubject = new BehaviorSubject<Veiculo[]>([]); // Para armazenar todos os veículos
  todosVeiculos$: Observable<Veiculo[]> = this.todosVeiculosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.carregarTodosVeiculos();
  }

  private carregarTodosVeiculos(): void {
    this.http.get<Veiculo[]>(`${this.apiUrl}/vehicle`)
      .pipe(
        catchError(error => {
          console.error('Erro ao carregar veículos:', error);
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
    return this.todosVeiculos$.pipe(
      map(veiculos =>
        veiculos.filter(v => v.id.toLowerCase().includes(termo.toLowerCase()))
      ),
      debounceTime(300),
      distinctUntilChanged()
    );
  }
}
export type { Veiculo };

