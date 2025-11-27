export interface Cita {
  id_cita: number;
  motivo_cita: string;
  estado_cita: string;
  canal_cita: string;
  inicio_cita: Date;
  fin_cita: Date;
  pac_id: number;
  doc_id: number;
  nomb_com_pac: string;
  dni_pac: string;
  nombre_doc: string;
  espe_doc: string;
  consult_doc: string;
  nom_espe: string;
}
