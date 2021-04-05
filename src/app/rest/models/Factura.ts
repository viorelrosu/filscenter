import { Usuario } from "./Usuario";

export class Factura {

    id:number;

    
    constructor(
        id:number,
        fecha:Date,
        numero:number,
        pagado:boolean,
        usuario:Usuario
    ){

    }
}