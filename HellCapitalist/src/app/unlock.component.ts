import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Palier } from '../class/World';

@Component({
  selector: 'unlock',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './unlock.component.html',
  styleUrl: './unlock.component.css'
})
export class UnlockComponent {
  api = '';
  unl = new Palier;
  prodName = "";

  @Input()
  set params(value: any) {
    this.api = value.api;
    this.unl = value.unlock;
    this.prodName = value.prodName;
    if(this.prodName == undefined) {
      console.log(this.unl);
    }
  }
}