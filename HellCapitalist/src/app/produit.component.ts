import { Component, Input, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../class/World';

@Component({
  selector: 'produit',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent {
  product!: Product;
  seu: number | undefined; // Prochain seuil (undefined si il n'y a pas de prochain seuil)
  valeur!: string | undefined;
  multiplicateur!: string;
  totMoney!: number;
  achat = -1;

  @Input()
  set params(value: any) {
    this.product = value.prod!;
    this.seu = this.product.palliers.find(elem => elem.unlocked == false)?.seuil;
    this.valeur = "billion";
    this.multiplicateur = value.mult!;
    this.totMoney = value.money!;
    if(this.multiplicateur.startsWith('x')){
      this.achat = +this.multiplicateur.substring(1);
    }
    if(this.multiplicateur == "NEXT"){
      if(typeof(this.seu) != undefined){
        this.achat = this.seu! - this.product.quantite;
      }
      else{
        this.achat = Math.floor(this.totMoney/this.product.cout); // A CHANGER !!! NE PREND PAS EN COMPTE LA CROISSANCE
      }
    }
    if(this.multiplicateur == "MAX"){
      this.achat = Math.floor(this.totMoney/this.product.cout); // A CHANGER !!! NE PREND PAS EN COMPTE LA CROISSANCE 
    }
  }
}