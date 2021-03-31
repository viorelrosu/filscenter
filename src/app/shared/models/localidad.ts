import { Provincia } from './provincia';
export class Localidad {
    private nombre: string;
    private provincia: Provincia;

    constructor() {

    }

    public getNombre(){
        return this.nombre;
    }

    public getProvincia(){
        return this.provincia;
    }

    /*== setters */
    public setNombre(valor:string){
        this.nombre;
    }

    public setProvincia(provincia: Provincia){
        this.provincia = provincia;
    }
}