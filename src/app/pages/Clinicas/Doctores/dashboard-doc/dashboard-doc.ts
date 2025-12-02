import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../../services/cita.service';
import { Cita } from '../../../../models/cita.model';

@Component({
  selector: 'app-dashboard-doc',
  standalone: true,
  imports: [RouterLink, Navbar, CommonModule],
  templateUrl: './dashboard-doc.html',
  styleUrl: './dashboard-doc.css',
})
export class DashboardDoc implements OnInit {
  citas: Cita[] = [];
  cargando: boolean = false;
  error: string = '';

  // ID del doctor logueado (temporal, en producción vendría del localStorage/auth)
  idDoctor: string = "1"; // Temporal

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarMisCitas();
  }

  cargarMisCitas(): void {
    this.cargando = true;
    this.error = '';

    this.citaService.obtenerCitasPorDoctor(this.idDoctor).subscribe({
      next: (data) => {
        this.citas = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar tus citas. Verifica que el backend esté activo.';
        console.error('Error:', err);
        this.cargando = false;
      }
    });
  }

  obtenerCitasHoy(): Cita[] {
    const hoy = new Date().toISOString().split('T')[0];
    return this.citas.filter(c => c.inicio.startsWith(hoy));
  }

  obtenerCitasProgramadas(): Cita[] {
    return this.citas.filter(c => c.estado === 'Pendiente');
  }
}
