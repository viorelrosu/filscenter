import { Localidad } from "./Localidad";
import { Usuario } from "./Usuario";

export class Direccion {
    
    id:number;
    bloque:string;
    calle:string;
    codigoPostal:number;
    escalera:number;
    numero:number;
    piso:number;
    puerta:string;
    localidad:Localidad;
    usuario:Usuario;
    
    constructor(
        id:number,
        bloque:string,
        calle:string,
        codigoPostal:number,
        escalera:number,
        numero:number,
        piso:number,
        puerta:string,
        localidad:Localidad,
        usuario:Usuario
    ){

    }
}