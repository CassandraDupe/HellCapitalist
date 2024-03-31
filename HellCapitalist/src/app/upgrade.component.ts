import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Palier } from '../class/World';
import { Product } from '../class/World';

@Component({
  selector: 'upgrade',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './upgrade.component.html',
  styleUrl: './upgrade.component.css'
})
export class UpgradeComponent {
  @Output() onBuy: EventEmitter<Palier> = new EventEmitter<Palier>();

  api = '';
  upg = new Palier;
  affCout = "";
  prods = [new Product];
  totMoney!: number;
  enoughtM = false;
  clickUpg="";

  affSeuil = "";
  valeur = "";
  Illions = ["","","Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Trigintillion", "Quadragintillion", "Quinquagintillion", "Sexagintillion", "Septuagintillion", "Octogintillion", "Nonagintillion", "Centillion", "Ducentillion", "Trucentillion", "Quadringentillion", "Quingentillion", "Sescentillion", "Septingentillion", "Octingentillion", "Nongentillion"];

  @Input()
  set params(value: any) {
    this.api = value.api;
    this.upg = value.upgrade;
    this.prods = value.products;
    this.totMoney = value.money!;
    this.clickUpg="";
    if(this.totMoney>=this.upg.seuil){
      this.enoughtM = true;
      this.clickUpg="clickable";
    }
    this.affSeuil = ""+this.upg.seuil;
    this.valeur = "";
    if(this.upg.seuil > 1000000){
      this.affSeuil = this.affSeuil.split(".",2)[0];
      let truc = Math.floor(Math.log(this.upg.seuil) / Math.log(1000));
      this.valeur = this.Illions[truc];
      // console.log("############################");
      // console.log(this.affSeuil);
      // console.log("0 à "+(this.affSeuil.length-3*truc)+"."+(this.affSeuil.length-3*(truc))+" à "+(this.affSeuil.length-3*(truc-1)));
      this.affSeuil = this.affSeuil.substring(0,this.affSeuil.length-3*truc)+"."+this.affSeuil.substring(this.affSeuil.length-3*(truc),this.affSeuil.length-3*(truc-1));
      // console.log("=> "+this.affSeuil);
    }
    // console.log(this.upg);
  }


  buy(){
    if(this.enoughtM){
      this.onBuy.emit(this.upg);
    }
  }
}