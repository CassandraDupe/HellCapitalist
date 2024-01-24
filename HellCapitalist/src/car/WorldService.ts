import { Injectable } from '@angular/core';
import { Produit } from '../class/Produit';
import { Manager } from '../class/Manager';

@Injectable({
  providedIn: 'root'
})
export class WorldService {
  produits = [
    new Produit(1, "Lava", 2, 56, "../assets/lava.png"),
    new Produit(2, "Dog Toys", 5, 25, "../assets/dog_toys.png"),
    new Produit(3, "Scream and Despair", 10, 12, "../assets/scream_and_despair.png"),
    new Produit(4, "Flesh and Bones", 20, 0, "../assets/flesh_and_bone.png"),
    new Produit(5, "Torture Machines", 50, 0, "../assets/torture_machine.png"),
    new Produit(6, "Maths Lessons", 100, 0, "../assets/maths_lessons.png")]

  managers = [
    new Manager(1, "Mr Lava", 2, "../assets/lava.png"),
    new Manager(2, "Mr Dog Toys", 5, "../assets/dog_toys.png")]

  getProduits() {
    return this.produits;
  }

  getManagers() {
    return this.managers;
  }
}