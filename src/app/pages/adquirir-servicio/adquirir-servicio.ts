import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClinicaService } from '../../services/clinica.service';
import { AuthService } from '../../services/auth.service';
import { Clinica } from '../../models/clinica.model';
import { Usuario } from '../../models/empleado.model';
import { NavbarPublicComponent } from '../../shared/navbar-public/navbar-public';

@Component({
  selector: 'app-adquirir-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarPublicComponent],
  templateUrl: './adquirir-servicio.html',
  styleUrls: ['./adquirir-servicio.css']
})
export class AdquirirServicioComponent implements OnInit {
  paso: number = 1;
  
  // Datos del administrador
  admin = {
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    username: '',
    password: '',
    confirmarPassword: ''
  };

  // Datos de la clínica
  clinica: Clinica = {
    id_cli: 0,
    nom_clie: '',
    dir_av: '',
    dir_calle: '',
    dir_numero: '',
    distrito: '',
    provincia: '',
    departamento: ''
  };

  // Método de pago
  metodoPago = {
    tipo: 'tarjeta', // 'tarjeta', 'yape', 'plin', 'efectivo'
    numeroTarjeta: '',
    nombreTitular: '',
    fechaExpiracion: '',
    cvv: '',
    numeroYape: '',
    numeroPlin: ''
  };

  mostrarPassword: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private clinicaService: ClinicaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.paso > 1 && this.paso < 4) {
      $event.returnValue = true;
    }
  }

  siguientePaso(): void {
    if (this.validarPasoActual()) {
      this.paso++;
    }
  }

  pasoAnterior(): void {
    this.paso--;
  }

  validarPasoActual(): boolean {
    this.errorMessage = '';
    
    switch (this.paso) {
      case 1:
        if (!this.admin.nombres || !this.admin.apellidos || !this.admin.email || !this.admin.telefono) {
          this.errorMessage = 'Por favor complete todos los campos del administrador';
          return false;
        }
        if (!this.validarEmail(this.admin.email)) {
          this.errorMessage = 'Email inválido';
          return false;
        }
        return true;
        
      case 2:
        if (!this.admin.username || !this.admin.password || !this.admin.confirmarPassword) {
          this.errorMessage = 'Por favor complete todos los campos de credenciales';
          return false;
        }
        if (this.admin.password !== this.admin.confirmarPassword) {
          this.errorMessage = 'Las contraseñas no coinciden';
          return false;
        }
        if (this.admin.password.length < 6) {
          this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
          return false;
        }
        return true;
        
      case 3:
        if (!this.clinica.nom_clie || !this.clinica.dir_av || !this.clinica.dir_calle || 
            !this.clinica.distrito || !this.clinica.provincia || !this.clinica.departamento) {
          this.errorMessage = 'Por favor complete todos los campos de la clínica';
          return false;
        }
        return true;
        
      case 4:
        return this.validarMetodoPago();
        
      default:
        return true;
    }
  }

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validarMetodoPago(): boolean {
    this.errorMessage = '';
    
    switch (this.metodoPago.tipo) {
      case 'tarjeta':
        if (!this.metodoPago.numeroTarjeta || !this.metodoPago.nombreTitular || 
            !this.metodoPago.fechaExpiracion || !this.metodoPago.cvv) {
          this.errorMessage = 'Por favor complete todos los campos de la tarjeta';
          return false;
        }
        if (this.metodoPago.numeroTarjeta.length !== 16) {
          this.errorMessage = 'Número de tarjeta inválido';
          return false;
        }
        return true;
        
      case 'yape':
        if (!this.metodoPago.numeroYape) {
          this.errorMessage = 'Por favor ingrese el número de Yape';
          return false;
        }
        return true;
        
      case 'plin':
        if (!this.metodoPago.numeroPlin) {
          this.errorMessage = 'Por favor ingrese el número de Plin';
          return false;
        }
        return true;
        
      case 'efectivo':
        return true;
        
      default:
        return false;
    }
  }

  async finalizarRegistro(): Promise<void> {
    if (!this.validarPasoActual()) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      // 1. Crear la clínica
      const clinicaCreada = await this.clinicaService.crearClinica(this.clinica).toPromise();
      
      if (clinicaCreada) {
        // 2. Crear el usuario administrador
        const nuevoUsuario: Usuario = {
          id_emp: 0,
          username: this.admin.username,
          pass: this.admin.password,
          rol_emp: 'ADMINISTRADOR',
          id_cli: clinicaCreada.id_cli,
          id_esp: 0
        };

        const usuarioCreado = await this.authService.registrarUsuario(nuevoUsuario).toPromise();
        
        if (usuarioCreado) {
          // 3. Redirigir al panel de administrador
          alert('¡Registro exitoso! Bienvenido al sistema.');
          this.router.navigate(['/admin/menu']);
        }
      }
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Error al procesar el registro. Por favor intente nuevamente.';
      console.error('Error en registro:', error);
    } finally {
      this.loading = false;
    }
  }

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  formatearNumeroTarjeta(): void {
    let numero = this.metodoPago.numeroTarjeta.replace(/\s/g, '');
    this.metodoPago.numeroTarjeta = numero.replace(/(\d{4})/g, '$1 ').trim();
  }
}
