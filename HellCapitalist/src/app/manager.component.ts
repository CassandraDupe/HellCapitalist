import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Palier } from '../class/World';
import { Product } from '../class/World';
import { WebService } from '../car/webservice.service';

@Component({
  selector: 'manager',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  @Output() onBuy: EventEmitter<Palier> = new EventEmitter<Palier>();

  api = '';
  man = new Palier;
  affCout = "";
  prods = [new Product];
  totMoney!: number;
  enoughtM = false;
  clickMan="";

  constructor (
    private service: WebService
  ) {}

  affSeuil = "";
  valeur = "";
  Illions = ["","","Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Trigintillion", "Quadragintillion", "Quinquagintillion", "Sexagintillion", "Septuagintillion", "Octogintillion", "Nonagintillion", "Centillion", "Ducentillion", "Trucentillion", "Quadringentillion", "Quingentillion", "Sescentillion", "Septingentillion", "Octingentillion", "Nongentillion"];

  @Input()
  set params(value: any) {
    this.api = value.api;
    this.man = value.manager;
    this.prods = value.products;
    this.totMoney = value.money!;
    this.clickMan="";
    if(this.totMoney>=this.man.seuil){
      this.enoughtM = true;
      this.clickMan="clickable";
    }
    this.affSeuil = ""+this.man.seuil;
    this.valeur = "";
    if(this.man.seuil > 1000000){
      this.affSeuil = this.affSeuil.split(".",2)[0];
      let truc = Math.floor(Math.log(this.man.seuil) / Math.log(1000));
      this.valeur = this.Illions[truc];
      console.log("############################");
      console.log(this.affSeuil);
      console.log("0 à "+(this.affSeuil.length-3*truc)+"."+(this.affSeuil.length-3*(truc))+" à "+(this.affSeuil.length-3*(truc-1)));
      this.affSeuil = this.affSeuil.substring(0,this.affSeuil.length-3*truc)+"."+this.affSeuil.substring(this.affSeuil.length-3*(truc),this.affSeuil.length-3*(truc-1));
      console.log("=> "+this.affSeuil);
    }
  }


  buy(){
    if(this.enoughtM){
      // ENLEVER LE COMMENTAIRE !!!
      /*this.service.engager(this.man).catch(reason =>
        console.log("erreur: " + reason)
        );*/
      this.onBuy.emit(this.man);
    }
  }
}