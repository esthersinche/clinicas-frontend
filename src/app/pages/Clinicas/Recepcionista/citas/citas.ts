import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../../../services/cita.service';
import { PacienteService } from '../../../../services/paciente.service';
import { DoctorService, Doctor } from '../../../../services/doctor.service';
import { Paciente } from '../../../../models/paciente.model';
import { CrearCitaRequest } from '../../../../models/cita.model';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [RouterLink, Navbar, CommonModule, FormsModule],
  templateUrl: './citas.html',
  styleUrl: './citas.css',
})
export class Citas implements OnInit {
  // Listas
  pacientes: Paciente[] = [];
  doctores: Doctor[] = [];
  
  // Búsqueda
  dniBusqueda: string = '';
  pacienteEncontrado: Paciente | null = null;
  nombreDoctorBusqueda: string = '';
  
  // Paciente seleccionado
  pacienteSeleccionado: Paciente | null = null;
  
  // Doctor seleccionado
  doctorSeleccionado: Doctor | null = null;
  
  // Datos de la cita
  nuevaCita = {
    motivo: '',
    especialidad: '',
    canal: 'Presencial', // 'Presencial' o 'Virtual' (case-sensitive)
    estado: 'Pendiente', // 'Pendiente', 'Asistio', 'Desercion'
    fecha: '',
    horaInicio: '',
    horaFin: ''
  };
  
  // Estados
  cargandoPacientes: boolean = false;
  cargandoDoctores: boolean = false;
  buscandoPaciente: boolean = false;
  guardandoCita: boolean = false;
  error: string = '';
  exito: string = '';

  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
    this.cargarDoctores();
  }

  cargarPacientes(): void {
    this.cargandoPacientes = true;
    this.pacienteService.obtenerPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
        this.cargandoPacientes = false;
      },
      error: (err) => {
        console.error('Error al cargar pacientes:', err);
        this.cargandoPacientes = false;
      }
    });
  }

  cargarDoctores(): void {
    this.cargandoDoctores = true;
    this.doctorService.obtenerDoctores().subscribe({
      next: (data) => {
        this.doctores = data;
        this.cargandoDoctores = false;
      },
      error: (err) => {
        console.error('Error al cargar doctores:', err);
        this.cargandoDoctores = false;
      }
    });
  }

  buscarPacientePorDni(): void {
    if (!this.dniBusqueda || this.dniBusqueda.length < 8) {
      this.error = 'Ingresa un DNI válido (8 dígitos)';
      return;
    }

    this.buscandoPaciente = true;
    this.error = '';
    this.pacienteEncontrado = null;

    this.pacienteService.buscarPacientePorDni(this.dniBusqueda).subscribe({
      next: (paciente) => {
        this.pacienteEncontrado = paciente;
        this.buscandoPaciente = false;
      },
      error: (err) => {
        this.error = 'Paciente no encontrado';
        this.buscandoPaciente = false;
      }
    });
  }

  seleccionarPaciente(paciente: Paciente): void {
    this.pacienteSeleccionado = paciente;
    this.pacienteEncontrado = null;
    this.dniBusqueda = '';
  }

  seleccionarDoctor(doctor: Doctor): void {
    this.doctorSeleccionado = doctor;
  }

  get doctoresFiltrados(): Doctor[] {
    if (!this.nombreDoctorBusqueda) {
      return this.doctores;
    }
    return this.doctores.filter(d => 
      d.nombre.toLowerCase().includes(this.nombreDoctorBusqueda.toLowerCase())
    );
  }

  validarFormulario(): boolean {
    this.error = '';

    if (!this.pacienteSeleccionado) {
      this.error = 'Debes seleccionar un paciente';
      return false;
    }

    if (!this.nuevaCita.motivo || !this.nuevaCita.especialidad || !this.nuevaCita.fecha || 
        !this.nuevaCita.horaInicio || !this.nuevaCita.horaFin) {
      this.error = 'Completa todos los campos de la cita';
      return false;
    }

    if (!this.doctorSeleccionado) {
      this.error = 'Debes seleccionar un doctor';
      return false;
    }

    return true;
  }

  guardarCita(): void {
    if (!this.validarFormulario()) {
      return;
    }

    this.guardandoCita = true;
    this.error = '';
    this.exito = '';

    // Construir las fechas en formato ISO
    const inicioCita = `${this.nuevaCita.fecha}T${this.nuevaCita.horaInicio}:00`;
    const finCita = `${this.nuevaCita.fecha}T${this.nuevaCita.horaFin}:00`;

    // Obtener la primera especialidad del doctor seleccionado
    const especialidadDoctor = this.doctorSeleccionado!.especialidades && this.doctorSeleccionado!.especialidades.length > 0 
      ? this.doctorSeleccionado!.especialidades[0] 
      : this.nuevaCita.especialidad;

    const request: CrearCitaRequest = {
      dni_pac: this.pacienteSeleccionado!.dni,
      motivo_cita: this.nuevaCita.motivo,
      espe_cita: especialidadDoctor,
      estado_cita: 'Pendiente',
      canal_cita: this.nuevaCita.canal as 'Presencial' | 'Virtual',
      inicio_cita: inicioCita,
      fin_cita: finCita,
      id_pac: this.pacienteSeleccionado!.id || '',
      id_doc: this.doctorSeleccionado!.id || '',
      pac_info_req: {
        nom_com_pac: this.pacienteSeleccionado!.nombre,
        dni_pac: this.pacienteSeleccionado!.dni
      },
      doc_info_req: {
        nom_com_doc: `${this.doctorSeleccionado!.nombre} ${this.doctorSeleccionado!.apellido}`,
        espe_doc: especialidadDoctor,
        consult_doc: this.doctorSeleccionado!.consultorio
      }
    };

    this.citaService.crearCita(request).subscribe({
      next: (response) => {
        this.exito = `Cita creada exitosamente: ${response.message_cita}`;
        this.guardandoCita = false;
        setTimeout(() => {
          this.router.navigate(['/recep/DashboardRep']);
        }, 2000);
      },
      error: (err) => {
        // Manejar diferentes tipos de errores
        if (err.status === 400) {
          this.error = err.error?.error || 'Datos inválidos. Verifica los campos.';
        } else if (err.status === 404) {
          this.error = err.error?.error || 'Paciente o doctor no encontrado.';
        } else if (err.status === 409) {
          this.error = err.error?.error || 'El doctor no está disponible en ese horario.';
        } else {
          this.error = 'Error al crear la cita. Verifica que el backend esté activo.';
        }
        console.error('Error:', err);
        this.guardandoCita = false;
      }
    });
  }

  limpiarSeleccionPaciente(): void {
    this.pacienteSeleccionado = null;
  }

  limpiarSeleccionDoctor(): void {
    this.doctorSeleccionado = null;
  }
}
