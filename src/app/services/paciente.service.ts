import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:8080/api/v1/pacientes';

  constructor(private http: HttpClient) { }

  // Listar todos los pacientes
  obtenerPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  // Buscar paciente por DNI
  buscarPacientePorDni(dni: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/dni/${dni}`);
  }

  // Crear nuevo paciente
  crearPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }
}
