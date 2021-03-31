import { Direccion } from './direccion';
import { Rol } from './rol';
import { Suscripcion } from './suscripcion';

export class Usuario {
    private _nombre: string;
    private _apellidos: string;
    private _dni: string;
    private _email: string;
    private _password: string;
    private _telefono: number;
    private _fechaNacimiento: Date;
    private _cuentaBancaria: number;
    private _biografia: string;
    private _imagen: string;
    private _direccion: Direccion;
    private _rol: Rol;
    private _suscripcion: Suscripcion;

    constructor(){

    }

    get nombre(){
        return this._nombre;
    }

    get apellidos(){
        return this._apellidos;
    }

    get dni(){
        return this._dni;
    }

    get email(){
        return this._email;
    }

    get password(){
        return this._password;
    }

    get getTelefono(){
        return this._telefono;
    }

    get getFechaNacimiento(){
        return this._fechaNacimiento;
    }

    get getCuentaBancaria(){
        return this._cuentaBancaria;
    }

    get getBiografia(){
        return this._biografia;
    }

    get getImagen(){
        return this._imagen;
    }

    get getDireccion(){
        return this._direccion;
    }

    get getRol(){
        return this._rol.getNombre();
    }

    get getSuscripcion(){
        return this._suscripcion;
    }

    /*== setters */
    set nombre(valor: string){
        this._nombre = valor;
    }

    set apellidos(valor: string){
        this._apellidos = valor;
    }

    set dni(valor: string){
        this._dni = valor;
    }

    set email(valor: string){
        this._email = valor;
    }

    set password(valor: string){
        this._password = valor;
    }

    set telefono(valor: number){
        this._telefono = valor;
    }

    set fechaNacimiento(valor: Date){
        this._fechaNacimiento = valor;
    }

    set cuentaBancaria(valor: number){
        this._cuentaBancaria = valor;
    }

    set biografia(valor: string){
        this._biografia = valor;
    }

    set imagen(valor: string){
        this._imagen = valor;
    }

    set direccion(direccion: Direccion){
        this._direccion = direccion;
    }

    set rol(rol: Rol){
        this._rol = rol;
    }

    set suscripcion(suscripcion: Suscripcion){
        this._suscripcion = suscripcion;
    }
}