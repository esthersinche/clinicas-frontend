import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resena } from '../models/resena.model';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private apiUrl = 'http://localhost:8080/api/resenas';

  constructor(private http: HttpClient) { }

  obtenerResenas(): Observable<Resena[]> {
    return this.http.get<Resena[]>(this.apiUrl);
  }

  obtenerResenasPorClinica(clinicaId: number): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/clinica/${clinicaId}`);
  }

  obtenerResenasAprobadas(): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/aprobadas`);
  }

  crearResena(resena: Resena): Observable<Resena> {
    return this.http.post<Resena>(this.apiUrl, resena);
  }

  aprobarResena(id: number): Observable<Resena> {
    return this.http.put<Resena>(`${this.apiUrl}/${id}/aprobar`, {});
  }

  rechazarResena(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/rechazar`, {});
  }

  eliminarResena(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
