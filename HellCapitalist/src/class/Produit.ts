export class Produit {
    _id: number
    _nom: string
    _prix: number
    _quantite: number
    _imgURL: string

    constructor(id: number, nom: string, prix: number, quantite: number, imgURL: string){
        this._id = id;
        this._nom = nom;
        this._prix = prix;
        this._quantite = quantite;
        this._imgURL = imgURL;
    }
}