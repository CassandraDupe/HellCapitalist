export class Produit {
    _id: number
    _nom: string
    _prix: number

    constructor(id: number, nom: string, prix: number){
        this._id = id;
        this._nom = nom;
        this._prix = prix;
    }

    getNom(): string {
        return this._nom
    }
}