import { SuscripcionTipo } from "./suscripcion.tipo";

export class Suscripcion {
    private fechaAlta: Date;
    private tipo: SuscripcionTipo;

    constructor(){

    }

    public getFechaAlta(){
        return this.fechaAlta;
    }

    public getTipo(){
        return this.tipo;
    }

    /*== setters */
    public setFechaAlta(fecha: Date){
        this.fechaAlta = fecha;
    }

    public setTipo(tipo: SuscripcionTipo){
        this.tipo = tipo;
    }
}