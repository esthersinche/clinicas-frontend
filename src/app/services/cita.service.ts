import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita, CrearCitaRequest, CrearCitaResponse, ModificarCitaRequest } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:8080/api/v1/cita';

  constructor(private http: HttpClient) { }

  // Crear nueva cita
  crearCita(request: CrearCitaRequest): Observable<CrearCitaResponse> {
    return this.http.post<CrearCitaResponse>(this.apiUrl, request);
  }

  // Obtener cita por ID
  obtenerCitaPorId(id: string): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}/${id}`);
  }

  // Obtener citas por doctor
  obtenerCitasPorDoctor(idDoctor: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/doctor/${idDoctor}`);
  }

  // Modificar horario de cita
  modificarHorarioCita(id: string, request: ModificarCitaRequest): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/${id}`, request);
  }

  // Cancelar cita
  cancelarCita(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
