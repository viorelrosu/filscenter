export class Servicio {
    constructor(
        private _title: string,
        private _descr: string,
        private _icon: string
    ) {

    }

    get title() {
        return this._title;
    }

    get descr() {
        return this._descr;
    }

    get icon() {
        return this._icon;
    }

    set title(title) {
        this._title = title;
    }

    set descr(descr) {
        this._descr = descr;
    }

    set icon(icon) {
        this._icon = icon;
    }

}