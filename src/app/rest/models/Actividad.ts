import { TipoActividad } from "./TipoActividad";

export class Actividad {
  id: number;
  descripcion: string;
  dificultad: number;
  nombre: string;
  color: string;
  tipoActividad: TipoActividad;

  constructor(
    id: number,
    descripcion: string,
    dificultad: number,
    nombre: string,
    color: string,
    tipoActividad: TipoActividad
  ) {}
}
