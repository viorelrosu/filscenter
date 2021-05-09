import { Direccion } from './Direccion';
import { Rol } from './Rol';
import { Suscripcion } from './Suscripcion';
import { Taquilla } from './Taquilla';

export class Usuario {

  id:number;
  apellidos: string;
  biografia: string;
  cuentaBancaria: string;
  dni: string;
  email: string;
  fechaNacimiento: Date;
  nombre: string;
  nombreUsuario: string;
  numeroTarjeta: number;
  password: string;
  telefono: string;
  direccion: Direccion;
  rol: Rol;
  suscripcion: Suscripcion;
  taquilla: Taquilla;
  imagen: string;
  
  constructor(
    id: number,
    apellidos: string,
    biografia: string,
    cuentaBancaria: string,
    dni: string,
    email: string,
    fechaNacimiento: Date,
    nombre: string,
    nombreUsuario: string,
    numeroTarjeta: number,
    password: string,
    telefono: string,
    direccion: Direccion,
    rol: Rol,
    suscripcion: Suscripcion,
    taquilla: Taquilla,
    imagen:string
  ) {}
}
