import { TipoSuscripcion } from "./TipoSuscripcion";
import { Usuario } from "./Usuario";



export class Suscripcion {

    id:number;
    fechaAlta:Date;
    fechaBaja:Date;
    tipoSuscrpcion:TipoSuscripcion;
    usuario:Usuario;

    
    constructor(
        id:number,
        fechaAlta:Date,
        fechaBaja:Date,
        tipoSuscrpcion:TipoSuscripcion,
        usuario:Usuario
    ){}
}