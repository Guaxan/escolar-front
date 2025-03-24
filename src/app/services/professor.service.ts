import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private apiUrl = 'http://localhost:8080/api/professor';

  constructor(private http: HttpClient) { }

  saveProfessor(professor: Professor): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/save`, professor, {
      responseType: 'text' as 'json' 
    });
  } 

  getProfessorById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/findById/${id}`);
  }

  getProfessores(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.apiUrl}/findAll`);
  }

  updateProfessor(professor: Professor): Observable<Professor> {
    return this.http.put<Professor>(`${this.apiUrl}/update`, professor);
  }

  deleteProfessor(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`, { responseType: 'text' as 'json' });
  }

}
