import { AfterViewInit, Component, EventEmitter, Input, PLATFORM_ID, Inject, Output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product, Palier } from '../class/World';
import { MyProgressBarComponent } from './progressbar.component';
import { Orientation } from './progressbar.component';
import { isPlatformBrowser } from '@angular/common';
import { WebService } from '../car/webservice.service';

@Component({
  selector: 'produit',
  standalone: true,
  imports: [RouterOutlet, MyProgressBarComponent],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements AfterViewInit {
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBuy: EventEmitter<any> = new EventEmitter<any>();

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
      this.achat = Math.floor(Math.log(1-((this.totMoney*(1-this.product.croissance))/this.product.cout)) / Math.log(this.product.croissance)); // calcMaxCanBuy
    }
    this.cout = Math.floor(this.product.cout*((1-Math.pow(this.product.croissance,this.achat))/(1-this.product.croissance)));
    this.affCout = ""+this.cout;
    this.valeur = "";
    if(this.cout>=1000000){
      let truc = Math.floor(Math.log(this.cout) / Math.log(1000));
      this.valeur = this.Illions[truc];
      this.affCout = this.affCout.substring(0,this.affCout.length-3*truc)+"."+this.affCout.substring(this.affCout.length-3*(truc),this.affCout.length-3*(truc-1));
      // Oui je sais, à un moment (quand on arrivera au dernier illion de la liste) ça marchera plus
    }
  }

  @Input()
  set params(value: any) {
    this.api = value.api!;
    this.product = value.prod!;
    this.multiplicateur = value.mult!;
    this.totMoney = value.money!;
    // console.log(this.product.paliers);
    this.seu = this.product.paliers.find(elem => elem.unlocked == false)?.seuil;   
    this.affichCout();
    this.enoughtM = (this.totMoney>=this.cout && this.cout!=0);
    this.coulAchat = "tabGris";
    if(this.enoughtM){
      this.coulAchat = "tabOrange clickable";
    }
    this.enoughtQ = this.product.quantite>0;
    this.stateIMG = "";
    if(this.enoughtQ){
      this.stateIMG = "clickable";
    }
    if (!this.product.managerUnlocked){
      if (this.product.timeleft != 0){
        this.initialValue = this.product.vitesse-this.product.timeleft;
        this.run = true;
      }
    }
  }

  orientation = Orientation.horizontal;

  lastUpdate = Date.now();

  startFabrication() {
    if(this.enoughtQ && !this.run && !this.product.managerUnlocked){
      // ENLEVER LE COMMENTAIRE !!!
      this.service.lancerProduction(this.product).catch(reason =>
        console.log("erreur: " + reason)
        );
      this.product.timeleft = this.product.vitesse;
      this.lastUpdate = Date.now();
      this.run = true;
      this.initialValue = 0;
    }
  }

  isBrowser = signal(false);

  constructor (
    @Inject(PLATFORM_ID) private platformId: object,
    private service: WebService
  ) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngAfterViewInit(){
    if (this.isBrowser()){
      setInterval(() => { this.calcScore() }, 100);
    }
  }


  initialValue = 0;
  run = false;

  calcScore (){
    if(this.run || this.product.managerUnlocked){
      let nProduit = 0;
      // Calcul du temps écoulé depuis la dernière mise à jour
      let elapsetime = Date.now() - this.lastUpdate;
      this.lastUpdate = Date.now();
      elapsetime += this.product.vitesse - this.product.timeleft;
      /*console.log('############################')
      console.log('timeleft : '+this.product.timeleft);
      console.log('vitesse - timeleft : '+(this.product.vitesse - this.product.timeleft));
      console.log('elapse : '+elapsetime)*/
      if (this.product.managerUnlocked){
        this.product.timeleft = this.product.vitesse - elapsetime%this.product.vitesse;
        nProduit = Math.trunc(elapsetime / this.product.vitesse);
      } else {
        if (this.product.timeleft != 0){
          if (this.product.timeleft <= 0){
            nProduit = 1;
            this.product.timeleft = 0;
            this.run = false;
            this.initialValue = 0;
          } else {
            this.product.timeleft = this.product.vitesse - elapsetime;
          }
        }
      }
      if (nProduit>0){
        this.refresh.emit({prod: this.product, n: nProduit});
      }
    }
  }

  buy(){
    if(this.enoughtM){
      this.onBuy.emit({"nbBuy" : this.achat, "prod" : this.product, "cout" : this.cout});
    }
  }
}