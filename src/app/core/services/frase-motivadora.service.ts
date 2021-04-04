import { Injectable } from '@angular/core';
import { FraseMotivadora } from '@shared/models/frase.motivadora';

@Injectable()
export class FraseMotivadoraService {
    public frases: Array<FraseMotivadora>;

    constructor() {
        this.frases = [
            new FraseMotivadora('Cada día es una nueva oportunidad para cambiar tu vida'),
            new FraseMotivadora('Ningún mar en calma hizo experto a un marinero'),
            new FraseMotivadora('El momento que da más miedo es siempre justo antes de empezar'),
            new FraseMotivadora('El éxito en la vida no se mide por lo que logras sino por los obstáculos que superas'),
            new FraseMotivadora('Mañana es una excusa maravillosa, ¿No crees?'),
            new FraseMotivadora('Intenta ser un Arco iris en el día nublado de alguien'),
            new FraseMotivadora('Esperar ser otra persona es una pérdida de tiempo'),
            new FraseMotivadora('¿Existe el mañana por alguna razón?'),
            new FraseMotivadora('Cuando me dices que no puedo, lo único que escucho es “Bla, bla, bla…”'),
            new FraseMotivadora('¿Dé qué estas intentando huir?'),
            new FraseMotivadora('Cualquier cosa que te plante la vida florecela con gracia'),
            new FraseMotivadora('Deséalo, espéralo, suéñalo, pero por todos los medios… ¡Hazlo!'),
            new FraseMotivadora('Eres suficiente tal y como eres'),
            new FraseMotivadora('Debes hacer las cosas que crees que no puedes hacer'),
            new FraseMotivadora('Tu mejor profesor es tu mayor error'),
            new FraseMotivadora('Las cosas buenas llegan a los que saben esperar'),
            new FraseMotivadora('No busques el momento perfecto, solo busca el momento y hazlo perfecto'),
            new FraseMotivadora('Si te sientes perdido en el mundo es porque todavía no has salido a buscarte'),
            new FraseMotivadora('No importa lo que pase, siempre tendrás una historia que contar'),
            new FraseMotivadora('Encuentra lo que te hace feliz y ve hacia ello'),
            new FraseMotivadora('Queda terminantemente prohibido levantarse sin ilusiones'),
            new FraseMotivadora('Levántate, suspira, sonríe, y sigue adelante'),
            new FraseMotivadora('Las dificultades no existen para hacerte renunciar sino para hacerte más fuerte'),
        ];
    }

    findAll(): Array<FraseMotivadora> {
        return this.frases;
    }

    getOneFrase(): FraseMotivadora {
        return this.frases[this.getIndexRandom()];
    }

    getFrases(cant: number): Array<FraseMotivadora> {
        var seleccionadas = [];
        var indexes = [];
        for (let i = 0; i < cant; i++) {
            var index: number;
            do {
                index = this.getIndexRandom();
            } while (indexes.includes(index));

            indexes.push(index);
            var frase = this.frases[index];
            seleccionadas.push(frase);
        }
        return seleccionadas;
    }

    getIndexRandom(): number{
        return Math.floor(Math.random() * (this.frases.length-1));
    }
}