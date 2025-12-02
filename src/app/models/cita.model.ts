export interface Cita {
  id?: {
    id: string;
  };
  motivo: string;
  estado: 'PROGRAMADA' | 'CANCELADA' | 'COMPLETADA';
  canal: 'PRESENCIAL' | 'VIRTUAL';
  inicio: string;
  fin: string;
  paciente: {
    nombre: string;
    dni: string;
  };
  doctor: {
    nombre: string;
    especialidad: string;
    consultorio: string;
  };
  clinica: string;
  especialidad: string;
}

export interface CrearCitaRequest {
  doc_info_cita: {
    idDoctor: string;
    nombreDoctor: string;
    especialidad: string;
  };
  pac_info_cita: {
    idPaciente: string;
    nombrePaciente: string;
  };
  inicio: string;
  fin: string;
}

export interface ModificarCitaRequest {
  inicio: string;
  fin: string;
}
