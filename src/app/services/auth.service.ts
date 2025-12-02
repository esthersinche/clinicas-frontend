import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  username: string;
  rol: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  empleadoId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  // Login
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password });
  }

  // Registrar usuario
  registrar(request: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, request);
  }

  // Guardar token en localStorage
  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener token
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verificar si está autenticado
  estaAutenticado(): boolean {
    return this.obtenerToken() !== null;
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('rol');
  }
}
