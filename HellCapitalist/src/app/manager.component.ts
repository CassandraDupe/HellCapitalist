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
      this.service.engager(this.man).catch(reason =>
        console.log("erreur: " + reason)
        );
      this.onBuy.emit(this.man);
    }
  }
}