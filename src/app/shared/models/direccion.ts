import { Localidad } from './localidad';
export class Direccion {

    private calle: string;
    private numero: number;
    private bloque: string;
    private escalera: string;
    private piso: string;
    private puerta: string;
    private localidad: Localidad;

    constructor() {

    }

    public getCalle(){
        return this.calle;
    }

    public getNumero(){
        return this.numero;
    }

    public getBloque(){
        return this.bloque;
    }

    public getEscalera(){
        return this.escalera;
    }

    public getPiso(){
        return this.piso;
    }

    public getPuerta(){
        return this.puerta;
    }

    public getLocalidad(){
        return this.localidad;
    }

    /*== setters */
    public setCalle(valor:string){
        this.calle = valor;
    }

    public setNumero(valor:number){
        this.numero = valor;
    }

    public setBloque(valor:string){
        this.bloque = valor;
    }

    public setEscalera(valor:string){
        this.escalera = valor;
    }

    public setPiso(valor:string){
        this.piso = valor;
    }

    public setPuerta(valor:string){
        this.puerta = valor;
    }

    public setLocalidad(localidad: Localidad){
        this.localidad = localidad;
    }
}