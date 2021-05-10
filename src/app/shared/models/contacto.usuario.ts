export class ContactoUsuario {

    constructor(
        public nombre: string,
        public apellidos: string,
        public from: string,
        public subject: string,
        public text: string
    ) {}

    public getNombre() {
        return this.nombre;
    }

    public getApellidos() {
        return this.apellidos;
    }

    public getFrom() {
        return this.from;
    }

    public getSubject() {
        return this.subject;
    }

    public getText() {
        return this.text;
    }

    /*== setters */
    public setNombre(valor: string){
        this.nombre = valor; 
    }

    public setApellidos(valor: string){
        this.apellidos = valor; 
    }

    public setFrom(valor: string){
        this.from = valor; 
    }

    public setSubject(valor: string){
        this.subject = valor; 
    }

    public setText(valor: string){
        this.text = valor; 
    }
}