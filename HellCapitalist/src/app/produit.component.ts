import { AfterViewInit, Component, EventEmitter, Input, PLATFORM_ID, Inject, Output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../class/World';
import { MyProgressBarComponent } from './progressbar.component';
import { Orientation } from './progressbar.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'produit',
  standalone: true,
  imports: [RouterOutlet, MyProgressBarComponent],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements AfterViewInit {
  @Output() refresh: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() onBuy: EventEmitter<number> = new EventEmitter<number>();

  product!: Product;
  seu: number | undefined; // Prochain seuil (undefined si il n'y a pas de prochain seuil)
  valeur!: string | undefined;
  multiplicateur!: string;
  totMoney!: number;
  enoughtM = false; // assez d'argent (Money) pour en acheter
  enoughtQ = false; // assez de produit (Quantity) pour en produire
  achat = -1;
  cout = -1;
  affCout!: string | undefined;
  progressbarvalue = 0;
  coulAchat = "tabGris";
  stateIMG = "";

  api = '';

  Illions = ["","","Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Trigintillion", "Quadragintillion", "Quinquagintillion", "Sexagintillion", "Septuagintillion", "Octogintillion", "Nonagintillion", "Centillion", "Ducentillion", "Trucentillion", "Quadringentillion", "Quingentillion", "Sescentillion", "Septingentillion", "Octingentillion", "Nongentillion"]

  affichCout(){
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
    this.cout = Math.floor(
    this.product.cout*((1-Math.pow(this.product.croissance,this.achat))/(1-this.product.croissance)));
    this.affCout = ""+this.cout;
    this.valeur = "";
    if(this.cout>=1000000){
      let truc = Math.floor(Math.log(this.cout) / Math.log(1000));
      this.valeur = this.Illions[truc];
      this.affCout = this.affCout.substring(0,this.affCout.length-3*truc)+"."+this.affCout.substring(this.affCout.length-3*(truc),this.affCout.length-3*(truc-1));
    }
  }

  @Input()
  set params(value: any) {
    this.api = value.api!;
    this.product = value.prod!;
    this.seu = this.product.palliers.find(elem => elem.unlocked == false)?.seuil;
    this.multiplicateur = value.mult!;
    this.totMoney = value.money!;
    this.affichCout();
    this.enoughtM = (this.totMoney>=this.cout && this.cout!=0);
    this.coulAchat = "tabGris";
    if(this.enoughtM){
      this.coulAchat = "tabOrange clickable";
    }
    this.enoughtQ = this.product.quantite>0;
    this.stateIMG = "";
    if(this.enoughtQ){
      this.stateIMG = "clickable"
    }
  }

  orientation = Orientation.horizontal;

  bar_run = false;
  lastUpdate = Date.now();

  startFabrication() {
    if(this.enoughtQ){
      this.product.timeleft = this.product.vitesse;
      this.lastUpdate = Date.now();
      this.bar_run = true;
    }
  }

  isBrowser = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngAfterViewInit(){
    if (this.isBrowser()){
      setInterval(() => { this.calcScore() }, 100);
    }
  }

  calcScore(){
    if(this.product.timeleft !== 0){
      this.product.timeleft = this.product.timeleft - (Date.now() - this.lastUpdate);
      this.lastUpdate = Date.now();
      if(this.product.timeleft <= 0){
        this.product.timeleft = 0;
        this.refresh.emit(this.product);
      }
      if(this.product.timeleft > 0){
        this.progressbarvalue = ((this.product.vitesse - this.product.timeleft) / this.product.vitesse) * 100;
      }
    }
  }

  buy(){
    if(this.enoughtM){
      this.onBuy.emit(this.cout);
      this.product.quantite = this.product.quantite + this.achat;
      this.product.cout = this.product.cout * Math.pow(this.product.croissance,this.achat+1);
      this.affichCout();
      this.seu = this.product.palliers.find(elem => elem.unlocked == false)?.seuil;
    }
  }
}