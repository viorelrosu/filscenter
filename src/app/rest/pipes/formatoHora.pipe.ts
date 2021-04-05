import {Pipe,PipeTransform} from '@angular/core';

@Pipe({name: 'formatoHora'})
export class FormatoHoraPipe implements PipeTransform{
    //coge el parametro pasado y lo pone en formato hora (requiere 4 dígitos)
    //dato    | calculadora: otroDato
   //param1         param2
    transform(value:any){
        var cadena = value.toString();
        var resultado = cadena.charAt(0)+cadena.charAt(1)+":"+cadena.charAt(2)+cadena.charAt(3)
        return resultado;
    }
}