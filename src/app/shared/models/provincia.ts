export class Provincia {
    private nombre: string;

    constructor() {

    }

    public getNombre(){
        return this.nombre;
    }

    /*== setters */
    public setNombre(nombre: string){
        this.nombre = nombre;
    }
}