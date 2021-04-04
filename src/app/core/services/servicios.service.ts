import { Injectable } from '@angular/core';
import { Servicio } from '@shared/models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  public servicios: Array<Servicio>;

    constructor() {
        this.servicios = [
            new Servicio('Espacio','1400 m2 repartidos en dos plantas con las mejores instalaciones de la zona.','fa fa-expand'),
            new Servicio('Luz Natural','Grandes ventanales de suelo a techo proporcionan abundante luz y vistas al exterior.','fa fa-lightbulb'),
            new Servicio('Entrenadores Personales','Los mejores monitores fitness están a tu disposición para personalizar al máximo tu entrenamiento.','fa fa-user-friends'),
            new Servicio('Amplios Horarios','Abrimos todos los días del año, en una amplia franja horaria, para que puedas entrenar siempre que quieras.','fa fa-clock'),
            new Servicio('Clases Colectivas','Contamos con varias actividades colectivas impartidas por monitores certificados por Les Mills.','fa fa-users'),
            new Servicio('Máquinas','Equipamiento high tech de las marcas más punteras en el sector fitness.','fa fa-wrench'),
            new Servicio('Masaje','Servicio gratuito de masaje. Tenemos expertos en diferentes estilos de masajes que te pueden hacer sentir como nuevo despues de una dura sesión de entrenamiento.','fa fa-bed'),
            new Servicio('Fisioterapeuta','Ponemos a tu dispoción un servicio de Fisioterapia gratuito para que puedas consultar a nuestros expertos siempre que lo necesitas.','fa fa-stethoscope'),
            new Servicio('Taquilla Individual','Todos nuestros usuarios tienen asignada una taquilla individual para guardar las cosas personales mientras entrenan.','fa fa-lock'),
            new Servicio('Cabinas Individuales de Ducha','Ya sabemos lo delicado que es el tema de las duchas. Por eso habilitamos cabinas individuales. Además seguimos todos los protocolos de sanidad y las duchas se limpian y desinfectan después de cada uso.','fa fa-shower'),
            new Servicio('Toallas','Si te has olvidado tu toalla, te ofrecemos una toalla para tu entrenamiento. Pregunta en el mostrador siempre que lo necesitas. ¡No te olvides de devolvernosla! ','fa fa-sticky-note'),
            // new Servicio('Bebidas isotonicas','Si te has olvidado tu toalla, te ofrecemos una toalla para tu entrenamiento. Pregunta en el mostrador siempre que lo necesitas. ¡No te olvides de devolvernosla! ','fa fa-sticky-note'),
            new Servicio('Parking Gratuito','Disponemos de un parking amplio para todos nuestros usuarios. Tranquilo, no tendrás que pensar: ¿Dónde dejo el coche?','fa fa-car'),
        ];
    }

    findAll(): Array<Servicio> {
        return this.servicios;
    }

    getOneRandomServicio(): Servicio {
        return this.servicios[this.getIndexRandom()];
    }

    getServicios(cant: number): Array<Servicio> {
        var seleccionadas = [];
        var indexes = [];
        for (let i = 0; i < cant; i++) {
            var index: number;
            do {
                index = this.getIndexRandom();
            } while (indexes.includes(index));

            indexes.push(index);
            var frase = this.servicios[index];
            seleccionadas.push(frase);
        }
        return seleccionadas;
    }

    getIndexRandom(): number{
        return Math.floor(Math.random() * (this.servicios.length-1));
    }
}
