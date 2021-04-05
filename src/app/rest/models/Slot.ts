import { Actividad } from "./Actividad";
import { Sala } from "./sala";
import { Usuario } from "./Usuario";

export class Slot {

    id:number;

    constructor(
        id: number,
        aforoActual:number,
        diaSemana:string,
        horaInicio:number,
        sala:Sala,
        actividad:Actividad,
        monitor:Usuario
    ){

    }
}