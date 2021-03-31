export class SuscripcionTipo {
    private nombre: string;
    private duracion: string;
    private tarifa: number;

    constructor() {

    }

    public getNombre(){
        return this.nombre;
    }

    public getDuracion(){
        return this.duracion;
    }

    public getTarifa(){
        return this.tarifa;
    }

    /*== setters */
    public setNombre(valor:string){
        this.nombre = valor;
    }

    public setDuracion(valor:string){
        this.duracion = valor;
    }

    public setTarifa(valor:number){
        this.tarifa = valor;
    }
}