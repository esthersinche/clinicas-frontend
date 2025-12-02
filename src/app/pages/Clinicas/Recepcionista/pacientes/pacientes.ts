import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../../../services/paciente.service';
import { Paciente } from '../../../../models/paciente.model';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [RouterLink, Navbar, CommonModule, FormsModule],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css',
})
export class Pacientes implements OnInit {
  paciente: Paciente = {
    nombre: '',
    nacionalidad: '',
    dni: '',
    tel: '',
    email: '',
    fec_nac: '',
    sexo: 'M'
  };

  pacientes: Paciente[] = [];
  guardando: boolean = false;
  cargando: boolean = false;
  error: string = '';
  exito: string = '';

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.cargando = true;
    this.pacienteService.obtenerPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar pacientes:', err);
        this.cargando = false;
      }
    });
  }

  guardarPaciente(): void {
    if (!this.validarFormulario()) {
      return;
    }

    this.guardando = true;
    this.error = '';
    this.exito = '';

    this.pacienteService.crearPaciente(this.paciente).subscribe({
      next: (response) => {
        this.exito = 'Paciente registrado exitosamente';
        this.guardando = false;
        this.limpiarFormulario();
        setTimeout(() => {
          this.router.navigate(['/recep/DashboardRep']);
        }, 2000);
      },
      error: (err) => {
        this.error = 'Error al guardar el paciente. Verifica que el backend esté activo.';
        console.error('Error:', err);
        this.guardando = false;
      }
    });
  }

  validarFormulario(): boolean {
    if (!this.paciente.nombre || !this.paciente.dni || !this.paciente.email) {
      this.error = 'Por favor completa los campos obligatorios (Nombre, DNI, Email)';
      return false;
    }
    if (this.paciente.dni.length < 8) {
      this.error = 'El DNI debe tener al menos 8 dígitos';
      return false;
    }
    return true;
  }

  limpiarFormulario(): void {
    this.paciente = {
      nombre: '',
      nacionalidad: '',
      dni: '',
      tel: '',
      email: '',
      fec_nac: '',
      sexo: 'M'
    };
  }
}
