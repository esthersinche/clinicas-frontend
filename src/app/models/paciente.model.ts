export interface Paciente {
  id?: string;
  nombre: string;
  nacionalidad: string;
  dni: string;
  tel: string;
  email: string;
  fec_nac: string;
  sexo: 'M' | 'F';
}
