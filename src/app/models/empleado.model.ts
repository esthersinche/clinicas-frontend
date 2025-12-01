export interface Empleado {
  id_emp: number;
  nombres_emp: string;
  apellidoe_emp: string;
  telefono_emp: string;
  email_emp: string;
  rol_id: number;
}

export interface Usuario {
  id_emp: number;
  username: string;
  pass: string;
  rol_emp: string;
  id_cli: number;
  id_esp: number;
}

export interface Rol {
  id_rol: number;
  nombre_rol: string;
}

export interface RolFunciones {
  id_rol: number;
  funcion: string;
}
