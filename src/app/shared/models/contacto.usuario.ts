export class ContactoUsuario {

    constructor(
        public nombre: string,
        public apellidos: string,
        public email: string,
        public asunto: string,
        public mensaje: string
    ) {}

    public getNombre() {
        return this.nombre;
    }

    public getApellidos() {
        return this.apellidos;
    }

    public getEmail() {
        return this.email;
    }

    public getAsunto() {
        return this.asunto;
    }

    public getMensaje() {
        return this.mensaje;
    }

    /*== setters */
    public setNombre(valor: string){
        this.nombre = valor; 
    }

    public setApellidos(valor: string){
        this.apellidos = valor; 
    }

    public setEmail(valor: string){
        this.email = valor; 
    }

    public setAsunto(valor: string){
        this.asunto = valor; 
    }

    public setMensaje(valor: string){
        this.mensaje = valor; 
    }
}