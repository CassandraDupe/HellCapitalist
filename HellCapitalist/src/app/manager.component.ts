import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pallier } from '../class/World';

@Component({
  selector: 'manager',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  api = 'https://isiscapitalistgraphql.kk.kurasawa.fr/';
  man = new Pallier;
  affCout = "";

  @Input()
  set manager(value: Pallier) {
    this.man = value;
    this.affCout = ""+this.man.seuil;
    let lenCout = this.affCout.length;
    let affCouts = this.affCout.split('').reverse().join();//.match(/.{1,3}/g || []);
    console.log
    this.affCout = affCouts;
  }
}