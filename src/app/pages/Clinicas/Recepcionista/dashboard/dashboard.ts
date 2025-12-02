import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../../../services/cita.service';
import { Cita } from '../../../../models/cita.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, Navbar, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardRecep implements OnInit {
  citas: Cita[] = [];
  citasFiltradas: Cita[] = [];
  cargando: boolean = false;
  error: string = '';

  // Variables de filtro
  filtroDoctor: string = "";
  filtroEsp: string = "";
  filtroPaciente: string = "";

  // Para obtener citas necesitamos un ID de doctor temporal
  // En producción esto vendría del usuario logueado
  idDoctorActual: string = "1"; // Temporal

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.cargando = true;
    this.error = '';

    // Por ahora cargamos citas de un doctor específico
    // porque no existe endpoint para listar todas
    this.citaService.obtenerCitasPorDoctor(this.idDoctorActual).subscribe({
      next: (data) => {
        this.citas = data;
        this.citasFiltradas = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar citas. Verifica que el backend esté activo.';
        console.error('Error:', err);
        this.cargando = false;
        // Mantener datos de ejemplo si falla
        this.citas = [];
        this.citasFiltradas = [];
      }
    });
  }

  aplicarFiltros(): void {
    this.citasFiltradas = this.citas.filter(cita => {
      const cumpleDoctor = !this.filtroDoctor || cita.doctor.nombre.toLowerCase().includes(this.filtroDoctor.toLowerCase());
      const cumpleEsp = !this.filtroEsp || cita.especialidad.toLowerCase().includes(this.filtroEsp.toLowerCase());
      const cumplePaciente = !this.filtroPaciente || cita.paciente.nombre.toLowerCase().includes(this.filtroPaciente.toLowerCase());
      
      return cumpleDoctor && cumpleEsp && cumplePaciente;
    });
  }

  cancelarCita(citaId: string): void {
    if (confirm('¿Estás seguro de cancelar esta cita?')) {
      this.citaService.cancelarCita(citaId).subscribe({
        next: () => {
          alert('Cita cancelada exitosamente');
          this.cargarCitas();
        },
        error: (err) => {
          alert('Error al cancelar la cita');
          console.error('Error:', err);
        }
      });
    }
  }

  guardarReprogramacion(): void {
    // Función temporal simplificada
    // TODO: Implementar con datos reales del modal cuando esté conectado
    alert('Función de reprogramación en desarrollo. Requiere conectar el modal con los datos de la cita.');
  }
}
