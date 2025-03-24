import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:8080/api/aluno';

  constructor(private http: HttpClient) { }

  // Salvar um novo aluno
  saveAluno(aluno: Aluno): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/save`, aluno, {
      responseType: 'text' as 'json' 
    });
  }

  // Buscar aluno por id
  getAlunoById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/findById/${id}`);
  }

  // Buscar todos os alunos
  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/findAll`);
  }

  // Atualizar aluno
  updateAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/update`, aluno);
  }

  // Deletar aluno
  deleteAluno(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`, { responseType: 'text' as 'json' });
  }
}
