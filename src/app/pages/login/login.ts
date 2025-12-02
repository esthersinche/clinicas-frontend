import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  cargando: boolean = false;
  error: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onLogin(): void {
    if (!this.username || !this.password) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    this.cargando = true;
    this.error = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Guardar token y datos de usuario
        this.authService.guardarToken(response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('rol', response.rol);

        // Redirigir según el rol
        const rutas: any = {
          'RECEPCIONISTA': '/recep/DashboardRep',
          'ADMINISTRADOR': '/admin/menu',
          'DOCTOR': '/doctor/DashboardDoc'
        };

        const ruta = rutas[response.rol] || '/nosotros';
        this.router.navigate([ruta]);
      },
      error: (err) => {
        this.error = 'Usuario o contraseña incorrectos';
        console.error('Error de login:', err);
        this.cargando = false;
      },
      complete: () => {
        this.cargando = false;
      }
    });
  }
}
