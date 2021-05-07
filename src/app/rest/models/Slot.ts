import { Actividad } from "./Actividad";
import { Sala } from "./Sala";
import { Usuario } from "./Usuario";

export class Slot {

    id:number;
    horaInicio:number;
    diaSemana:string;
    monitor:Usuario;
    actividad:Actividad;

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