export interface Doctor {
  id_doc: number;
  id_empleado_doc: number;
  nom_com_nombre: string;
  nom_com_apellido: string;
  cmp_doc: string;
  consultorio_doc: string;
  clin_id: number;
  especialidades?: Especialidad[];
}

export interface Especialidad {
  id_esp: number;
  nombre_esp: string;
  descripcion_esp: string;
}

export interface DoctorEspecialidad {
  id_doc: number;
  id_esp: number;
}
