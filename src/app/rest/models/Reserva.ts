import { Slot } from "./Slot";
import { Usuario } from "./Usuario";

export class Reserva {

    public id:number;

    constructor(
        id:number,
        recurrente:boolean,
        slot:Slot,
        usuario:Usuario
    ){

    }
}