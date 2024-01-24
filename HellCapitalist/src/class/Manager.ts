export class Manager {
    _id: number
    _nom: string
    _prix: number
    _imgURL: string

    constructor(id: number, nom: string, prix: number, imgURL: string){
        this._id = id;
        this._nom = nom;
        this._prix = prix;
        this._imgURL = imgURL;
    }
}