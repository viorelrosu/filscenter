import { Provincia } from "./Provincia";

export class Localidad{

    id:number;
    nombre:string;
    provincia:Provincia;
    
    constructor(
        id:number,
        nombre:string,
        provincia:Provincia
    ){

    }
}