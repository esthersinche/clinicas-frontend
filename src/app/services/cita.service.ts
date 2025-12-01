import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private apiUrl = 'http://localhost:8080/api/v1/Cita';

  constructor(private http: HttpClient) { }

  crearCita(cita: Cita): Observable<any> {
    return this.http.post(this.apiUrl, cita);
  }


  /*
  obtenerCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  obtenerCitaPorId(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}/${id}`);
  }

  actualizarCita(id: number, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/${id}`, cita);
  }

  cancelarCita(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/cancelar`, {});
  }

  obtenerCitasPorDoctor(doctorId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }

  obtenerCitasPorPaciente(pacienteId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/paciente/${pacienteId}`);
  }

  obtenerCitasPorEspecialidad(especialidadId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/especialidad/${especialidadId}`);
  }
  */
}
