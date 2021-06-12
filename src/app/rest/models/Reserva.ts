import { Slot } from "./Slot";
import { Usuario } from "./Usuario";

export class Reserva {

    public id:number;
    public recurrente:boolean;
    public slot: Slot;
    public usuario:Usuario;
    public fechaInicio:Date;

    constructor(
        id:number,
        recurrente:boolean,
        slot:Slot,
        usuario:Usuario,
        fechaInicio:Date,
    ){

    }
}