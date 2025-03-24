import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/api/curso';

  constructor(private http: HttpClient) {}

  saveCurso(curso: Curso): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/save`, curso, {
      responseType: 'text' as 'json'
    });
  }

  getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/findById/${id}`);
  }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/findAll`);
  } 

  updateCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/update`, curso);
  }

  deleteCurso(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`, { responseType: 'text' as 'json' });
  }
}