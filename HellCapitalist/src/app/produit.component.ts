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
  cout = -1;
  affCout!: string | undefined;

  api = '';

  Illions = ["","","Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Trigintillion", "Quadragintillion", "Quinquagintillion", "Sexagintillion", "Septuagintillion", "Octogintillion", "Nonagintillion", "Centillion", "Ducentillion", "Trucentillion", "Quadringentillion", "Quingentillion", "Sescentillion", "Septingentillion", "Octingentillion", "Nongentillion"]

  @Input()
  set params(value: any) {
    this.api = value.api!;
    this.product = value.prod!;
    this.seu = this.product.palliers.find(elem => elem.unlocked == false)?.seuil;
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
        this.achat = Math.floor(Math.log(1-((this.totMoney*(1-this.product.croissance))/this.product.cout)) / Math.log(this.product.croissance));
      }
    }
    if(this.multiplicateur == "MAX"){
      this.achat = Math.floor(Math.log(1-((this.totMoney*(1-this.product.croissance))/this.product.cout)) / Math.log(this.product.croissance));
    }
    this.cout = Math.floor(this.product.cout*((1-Math.pow(this.product.croissance,this.achat))/(1-this.product.croissance)));
    this.affCout = ""+this.cout;
    this.valeur = "";
    if(this.cout>=1000000){
      let truc = Math.floor(Math.log(this.cout) / Math.log(1000));
      this.valeur = this.Illions[truc];
      this.affCout = this.affCout.substring(0,this.affCout.length-3*truc)+"."+this.affCout.substring(this.affCout.length-3*(truc),this.affCout.length-3*(truc-1));
    }
  }
}