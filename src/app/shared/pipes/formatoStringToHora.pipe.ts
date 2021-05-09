import {Pipe,PipeTransform} from '@angular/core';

@Pipe({name: 'formatoStringToHora'})
export class FormatoStringToHoraPipe implements PipeTransform{
    //coge el parametro pasado y lo pone en formato hora (requiere 4 dígitos)
    //dato    | calculadora: otroDato
   //param1         param2
    transform(value:number){
        var cadena = value.toString();
        var resultado;
        if(cadena.charAt(0) != '0') {
            resultado = '0'+cadena.charAt(0)+":"+cadena.charAt(1)+cadena.charAt(2);
        } else {
            resultado = cadena.charAt(0)+cadena.charAt(1)+":"+cadena.charAt(2)+cadena.charAt(3);
        }

        return resultado;
    }
}