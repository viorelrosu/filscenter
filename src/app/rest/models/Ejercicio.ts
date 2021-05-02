import { TipoEjercicio } from './TipoEjercicio';

export class Ejercicio {

  id:number;
  nombre: string;
  tipoEjercicio: TipoEjercicio;
  
  constructor(
      id: number,
      nombre: string,
      tipoEjercicio: TipoEjercicio
      ) {}
}
