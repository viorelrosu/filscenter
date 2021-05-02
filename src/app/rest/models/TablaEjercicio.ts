import { EjercicioSerie } from "./EjercicioSerie";
import { Usuario } from "./Usuario";

export class TablaEjercicio {

    id:number;
    activa:boolean;
    fechaFin:Date;
    fechaInicio:Date;
    monitor:Usuario;
    suscriptor:Usuario;
    ejerciciosSerie:EjercicioSerie[];
    
    constructor(
        id:number,
        activa:boolean,
        fechaFin:Date,
        fechaInicio:Date,
        monitor:Usuario,
        suscriptor:Usuario,
        ejerciciosSerie:EjercicioSerie[]
    ){

    }
}