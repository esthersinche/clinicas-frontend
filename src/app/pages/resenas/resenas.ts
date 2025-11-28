import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResenaService } from '../../services/resena.service';
import { Resena } from '../../models/resena.model';
import { NavbarPublicComponent } from '../../shared/navbar-public/navbar-public';

@Component({
  selector: 'app-resenas',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarPublicComponent],
  templateUrl: './resenas.html',
  styleUrls: ['./resenas.css']
})
export class ResenasComponent implements OnInit {
  resenas: Resena[] = [];
  resenasAprobadas: Resena[] = [];
  mostrarFormulario: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  // Filtros
  filtroCalificacion: number = 0;
  ordenamiento: string = 'recientes'; // 'recientes', 'antiguos', 'mejor', 'peor'

  // Nueva reseña
  nuevaResena: Resena = {
    id_resena: 0,
    id_cli: 1, // Por defecto, puedes cambiar según la clínica actual
    nombre_usuario: '',
    calificacion: 5,
    comentario: '',
    fecha: new Date(),
    estado: 'pendiente'
  };

  // Estadísticas
  estadisticas = {
    promedio: 0,
    total: 0,
    cinco_estrellas: 0,
    cuatro_estrellas: 0,
    tres_estrellas: 0,
    dos_estrellas: 0,
    una_estrella: 0
  };

  constructor(private resenaService: ResenaService) {}

  ngOnInit(): void {
    this.cargarResenas();
  }

  cargarResenas(): void {
    this.loading = true;
    this.resenaService.obtenerResenasAprobadas().subscribe({
      next: (data) => {
        this.resenasAprobadas = data;
        this.resenas = [...data];
        this.calcularEstadisticas();
        this.aplicarFiltros();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar reseñas:', error);
        this.errorMessage = 'Error al cargar las reseñas';
        this.loading = false;
      }
    });
  }

  calcularEstadisticas(): void {
    if (this.resenasAprobadas.length === 0) {
      return;
    }

    const total = this.resenasAprobadas.length;
    let sumaCalificaciones = 0;
    let estrellas = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    this.resenasAprobadas.forEach(resena => {
      sumaCalificaciones += resena.calificacion;
      estrellas[resena.calificacion as keyof typeof estrellas]++;
    });

    this.estadisticas = {
      promedio: Number((sumaCalificaciones / total).toFixed(1)),
      total: total,
      cinco_estrellas: estrellas[5],
      cuatro_estrellas: estrellas[4],
      tres_estrellas: estrellas[3],
      dos_estrellas: estrellas[2],
      una_estrella: estrellas[1]
    };
  }

  aplicarFiltros(): void {
    let resenasFiltradas = [...this.resenasAprobadas];

    // Filtrar por calificación
    if (this.filtroCalificacion > 0) {
      resenasFiltradas = resenasFiltradas.filter(r => r.calificacion === this.filtroCalificacion);
    }

    // Ordenar
    switch (this.ordenamiento) {
      case 'recientes':
        resenasFiltradas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        break;
      case 'antiguos':
        resenasFiltradas.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        break;
      case 'mejor':
        resenasFiltradas.sort((a, b) => b.calificacion - a.calificacion);
        break;
      case 'peor':
        resenasFiltradas.sort((a, b) => a.calificacion - b.calificacion);
        break;
    }

    this.resenas = resenasFiltradas;
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (this.mostrarFormulario) {
      this.resetearFormulario();
    }
  }

  resetearFormulario(): void {
    this.nuevaResena = {
      id_resena: 0,
      id_cli: 1,
      nombre_usuario: '',
      calificacion: 5,
      comentario: '',
      fecha: new Date(),
      estado: 'pendiente'
    };
    this.errorMessage = '';
    this.successMessage = '';
  }

  seleccionarCalificacion(calificacion: number): void {
    this.nuevaResena.calificacion = calificacion;
  }

  enviarResena(): void {
    if (!this.validarFormulario()) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.resenaService.crearResena(this.nuevaResena).subscribe({
      next: () => {
        this.successMessage = '¡Gracias por tu reseña! Será revisada antes de publicarse.';
        this.loading = false;
        setTimeout(() => {
          this.mostrarFormulario = false;
          this.resetearFormulario();
        }, 2000);
      },
      error: (error) => {
        console.error('Error al enviar reseña:', error);
        this.errorMessage = 'Error al enviar la reseña. Por favor intente nuevamente.';
        this.loading = false;
      }
    });
  }

  validarFormulario(): boolean {
    this.errorMessage = '';

    if (!this.nuevaResena.nombre_usuario.trim()) {
      this.errorMessage = 'Por favor ingrese su nombre';
      return false;
    }

    if (!this.nuevaResena.comentario.trim()) {
      this.errorMessage = 'Por favor ingrese un comentario';
      return false;
    }

    if (this.nuevaResena.comentario.length < 10) {
      this.errorMessage = 'El comentario debe tener al menos 10 caracteres';
      return false;
    }

    return true;
  }

  obtenerEstrellas(calificacion: number): string[] {
    return Array(5).fill('⭐').map((_, i) => i < calificacion ? '⭐' : '☆');
  }

  obtenerPorcentaje(cantidad: number): number {
    if (this.estadisticas.total === 0) return 0;
    return Math.round((cantidad / this.estadisticas.total) * 100);
  }

  formatearFecha(fecha: Date): string {
    const fechaObj = new Date(fecha);
    const opciones: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return fechaObj.toLocaleDateString('es-ES', opciones);
  }
}
