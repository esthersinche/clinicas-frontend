import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarPublicComponent } from '../../shared/navbar-public/navbar-public';

interface Resena {
  id_resena: number;
  id_cli: number;
  nombre_usuario: string;
  calificacion: number;
  comentario: string;
  fecha: Date;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
}

interface Estadisticas {
  total: number;
  promedio: number;
  distribucion: { [key: number]: number };
}

@Component({
  selector: 'app-resenas',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarPublicComponent],
  templateUrl: './resenas.html',
  styleUrls: ['./resenas.css']
})
export class ResenasComponent implements OnInit {
  resenas: Resena[] = [];
  resenasFiltradas: Resena[] = [];
  estadisticas: Estadisticas = {
    total: 0,
    promedio: 0,
    distribucion: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  };
  
  filtroCalificacion: number = 0;
  ordenamiento: 'reciente' | 'antigua' | 'mejor' | 'peor' = 'reciente';
  
  mostrarFormulario: boolean = false;
  enviandoResena: boolean = false;
  
  nuevaResena = {
    nombre_usuario: '',
    calificacion: 5,
    comentario: ''
  };

  ngOnInit(): void {
    this.cargarResenasEjemplo();
  }

  cargarResenasEjemplo(): void {
    // Datos de ejemplo para demostración sin backend
    this.resenas = [
      {
        id_resena: 1,
        id_cli: 1,
        nombre_usuario: 'María González',
        calificacion: 5,
        comentario: 'Excelente atención y profesionalismo. El personal es muy amable y las instalaciones están impecables.',
        fecha: new Date('2024-11-15'),
        estado: 'aprobada'
      },
      {
        id_resena: 2,
        id_cli: 1,
        nombre_usuario: 'Carlos Ruiz',
        calificacion: 5,
        comentario: 'Me sentí muy bien atendido. Los doctores son muy capacitados y explican todo claramente.',
        fecha: new Date('2024-11-10'),
        estado: 'aprobada'
      },
      {
        id_resena: 3,
        id_cli: 1,
        nombre_usuario: 'Ana Torres',
        calificacion: 4,
        comentario: 'Muy buena clínica, solo mejoraría los tiempos de espera.',
        fecha: new Date('2024-11-05'),
        estado: 'aprobada'
      },
      {
        id_resena: 4,
        id_cli: 1,
        nombre_usuario: 'Jorge Méndez',
        calificacion: 5,
        comentario: 'Totalmente recomendado. La mejor clínica de la zona.',
        fecha: new Date('2024-10-28'),
        estado: 'aprobada'
      },
      {
        id_resena: 5,
        id_cli: 1,
        nombre_usuario: 'Patricia Salazar',
        calificacion: 4,
        comentario: 'Buen servicio en general. Los precios son justos.',
        fecha: new Date('2024-10-20'),
        estado: 'aprobada'
      },
      {
        id_resena: 6,
        id_cli: 1,
        nombre_usuario: 'Roberto Flores',
        calificacion: 5,
        comentario: 'Desde la recepción hasta la consulta, todo perfecto. Definitivamente volveré.',
        fecha: new Date('2024-10-15'),
        estado: 'aprobada'
      },
      {
        id_resena: 7,
        id_cli: 1,
        nombre_usuario: 'Lucía Ramírez',
        calificacion: 3,
        comentario: 'La atención es buena pero los horarios de atención son limitados.',
        fecha: new Date('2024-10-08'),
        estado: 'aprobada'
      },
      {
        id_resena: 8,
        id_cli: 1,
        nombre_usuario: 'Fernando Castro',
        calificacion: 5,
        comentario: 'Increíble experiencia. Personal altamente calificado y tecnología de punta.',
        fecha: new Date('2024-09-30'),
        estado: 'aprobada'
      }
    ];

    this.resenasFiltradas = [...this.resenas];
    this.calcularEstadisticas();
  }

  calcularEstadisticas(): void {
    this.estadisticas.total = this.resenas.length;
    
    if (this.estadisticas.total === 0) {
      this.estadisticas.promedio = 0;
      return;
    }

    const suma = this.resenas.reduce((acc, r) => acc + r.calificacion, 0);
    this.estadisticas.promedio = suma / this.estadisticas.total;

    this.estadisticas.distribucion = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    this.resenas.forEach(r => {
      this.estadisticas.distribucion[r.calificacion]++;
    });
  }

  aplicarFiltros(): void {
    let resultado = [...this.resenas];

    if (this.filtroCalificacion > 0) {
      resultado = resultado.filter(r => r.calificacion === this.filtroCalificacion);
    }

    switch (this.ordenamiento) {
      case 'reciente':
        resultado.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        break;
      case 'antigua':
        resultado.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        break;
      case 'mejor':
        resultado.sort((a, b) => b.calificacion - a.calificacion);
        break;
      case 'peor':
        resultado.sort((a, b) => a.calificacion - b.calificacion);
        break;
    }

    this.resenasFiltradas = resultado;
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.resetearFormulario();
    }
  }

  resetearFormulario(): void {
    this.nuevaResena = {
      nombre_usuario: '',
      calificacion: 5,
      comentario: ''
    };
  }

  seleccionarCalificacion(calificacion: number): void {
    this.nuevaResena.calificacion = calificacion;
  }

  enviarResena(): void {
    if (!this.validarFormulario()) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.enviandoResena = true;

    // Simulación de envío (sin backend)
    setTimeout(() => {
      const nuevaResena: Resena = {
        id_resena: this.resenas.length + 1,
        id_cli: 1,
        nombre_usuario: this.nuevaResena.nombre_usuario,
        calificacion: this.nuevaResena.calificacion,
        comentario: this.nuevaResena.comentario,
        fecha: new Date(),
        estado: 'aprobada'
      };

      this.resenas.unshift(nuevaResena);
      this.calcularEstadisticas();
      this.aplicarFiltros();

      alert('¡Gracias por tu reseña!');
      this.toggleFormulario();
      this.enviandoResena = false;
    }, 1000);
  }

  validarFormulario(): boolean {
    return this.nuevaResena.nombre_usuario.trim() !== '' &&
           this.nuevaResena.comentario.trim() !== '' &&
           this.nuevaResena.calificacion >= 1 &&
           this.nuevaResena.calificacion <= 5;
  }

  obtenerEstrellas(calificacion: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < calificacion);
  }

  obtenerPorcentaje(calificacion: number): number {
    if (this.estadisticas.total === 0) return 0;
    return (this.estadisticas.distribucion[calificacion] / this.estadisticas.total) * 100;
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
