export class FraseMotivadora {
    
    constructor(
        private _frase: string
    ) {

    }

    get frase() {
        return this._frase;
    }

    set frase(frase) {
        this._frase = frase;
    }


}