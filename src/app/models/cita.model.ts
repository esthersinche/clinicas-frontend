export interface Cita {
  id?: {
    id: string;
  };
  motivo: string;
  estado: 'Pendiente' | 'Asistio' | 'Desercion';
  canal: 'Presencial' | 'Virtual';
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
  dni_pac: string;
  motivo_cita: string;
  espe_cita: string;
  estado_cita: 'Pendiente' | 'Asistio' | 'Desercion';
  canal_cita: 'Presencial' | 'Virtual';
  inicio_cita: string;
  fin_cita: string;
  id_pac: string;
  id_doc: string;
  pac_info_req: {
    nom_com_pac: string;
    dni_pac: string;
  };
  doc_info_req: {
    nom_com_doc: string;
    espe_doc: string;
    consult_doc: string;
  };
}

export interface CrearCitaResponse {
  cita_id: string;
  message_cita: string;
}

export interface ModificarCitaRequest {
  inicio: string;
  fin: string;
}
