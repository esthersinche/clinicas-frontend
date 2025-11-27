import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, Navbar, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardRecep {
  // --------------------------
  // 1. LISTA DE CITAS (SIMULADA)
  // --------------------------
  citas = [
    {
      paciente: "Juan Pérez",
      doctor: "Dr. Ricardo Gómez",
      especialidad: "Cardiología",
      canal: "Presencial",
      inicio: "2025-01-28 08:30",
      fin: "2025-01-28 09:00",
      estado: "Pendiente"
    },
    {
      paciente: "Ana Torres",
      doctor: "Dra. Ana Salinas",
      especialidad: "Pediatría",
      canal: "Virtual",
      inicio: "2025-01-28 10:00",
      fin: "2025-01-28 10:30",
      estado: "Pendiente"
    }
  ];

  // --------------------------
  // 2. Variables de filtro
  // --------------------------
  filtroDoctor: string = "";
  filtroEsp: string = "";
  filtroPaciente: string = "";

  // --------------------------
  // 3. Función para filtrar
  // --------------------------
  aplicarFiltros() {
    console.log("Doctor:", this.filtroDoctor);
    console.log("Especialidad:", this.filtroEsp);
    console.log("Paciente:", this.filtroPaciente);

    // Aquí solo mostramos un mensaje para presentación
    alert("Filtros aplicados.");
  }

  // --------------------------
  // 4. Funciones de acciones
  // --------------------------
  cancelarCita() {
    alert("La cita ha sido cancelada.");
  }

  guardarReprogramacion() {
    alert("La cita ha sido reprogramada.");
  }
}
