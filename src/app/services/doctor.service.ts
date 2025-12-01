import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, Especialidad } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8080/api/doctores';

  constructor(private http: HttpClient) { }

  obtenerDoctores(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  obtenerDoctorPorId(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  crearDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiUrl, doctor);
  }

  actualizarDoctor(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor);
  }

  eliminarDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerDoctoresPorClinica(clinicaId: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/clinica/${clinicaId}`);
  }

  obtenerDoctoresPorEspecialidad(especialidadId: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/especialidad/${especialidadId}`);
  }
}
