import { Usuario } from "@shared/models/usuario";
import { TipoSuscripcion } from "./TipoSuscripcion";

export class Suscripcion {

    id:number;

    
    constructor(
        id:number,
        fechaAlta:Date,
        fechaBaja:Date,
        tipoSuscrpcion:TipoSuscripcion,
        usuario:Usuario
    ){

    }
}