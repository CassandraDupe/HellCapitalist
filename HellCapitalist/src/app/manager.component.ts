import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pallier } from '../class/World';
import { Product } from '../class/World';

@Component({
  selector: 'manager',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  @Output() onBuy: EventEmitter<Pallier> = new EventEmitter<Pallier>();

  api = '';
  man = new Pallier;
  affCout = "";
  prods = [new Product];
  totMoney!: number;
  enoughtM = false;
  clickMan="";


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
  }

  buy(){
    if(this.enoughtM){
      this.onBuy.emit(this.man);
    }
  }
}