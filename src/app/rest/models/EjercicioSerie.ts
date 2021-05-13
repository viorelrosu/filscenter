import { Ejercicio } from "./Ejercicio";
import { TablaEjercicio } from "./TablaEjercicio";

export class EjercicioSerie{

    id:number;
    porSemana:number;
    repeticiones:number;
    series:number;
    ejercicio:Ejercicio;
    tablaEjercicio:TablaEjercicio;
    
    constructor(
        id:number,
        porSemana:number,
        repeticiones:number,
        series:number,
        ejercicio:Ejercicio,
        tablaEjercicio:TablaEjercicio
    ){

    }
}