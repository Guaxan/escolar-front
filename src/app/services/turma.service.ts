import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from '../models/turma';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
 private apiUrl = 'http://localhost:8080/api/turma';

  constructor( private http: HttpClient) { }

  // Salvar uma nova turma
  saveTurma(turma: Turma): Observable<Turma> {
    return this.http.post<Turma>(`${this.apiUrl}/save`, turma);
  }

  // Buscar turma por id
  getTurmaById(id: number): Observable<Turma> {
    return this.http.get<Turma>(`${this.apiUrl}/findById/${id}`);
  }

  // Buscar todas as turmas
  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.apiUrl}/findAll`);
  }

  // Atualizar turma 
  updateTurma(turma: Turma): Observable<Turma> {
    return this.http.put<Turma>(`${this.apiUrl}/update`, turma);
  }

  // Deletar turma
  deleteTurma(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`, { responseType: 'text' as 'json' });
  }

}
