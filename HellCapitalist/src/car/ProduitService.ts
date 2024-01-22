import { Injectable } from '@angular/core';
import { Produit } from '../class/Produit'

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  produits = [
    new Produit(1, "Lava", 2),
    new Produit(2, "Dog Toys", 5),
    new Produit(3, "Scream and Despair", 10),
    new Produit(4, "Flesh and Bones", 20),
    new Produit(5, "Torture Machines", 50),
    new Produit(6, "Maths Lessons", 100)]

  getProduits() {
    return this.produits;
  }
}