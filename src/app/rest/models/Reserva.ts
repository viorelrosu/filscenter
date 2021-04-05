import { Slot } from "./Slot";
import { Usuario } from "./Usuario";

export class Reserva {

    id:number;

    
    constructor(
        id:number,
        recurrente:boolean,
        slot:Slot,
        usuario:Usuario
    ){

    }
}