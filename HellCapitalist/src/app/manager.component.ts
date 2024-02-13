import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pallier } from '../class/World';
import { reverse } from 'node:dns';

@Component({
  selector: 'manager',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  api = '';
  man = new Pallier;
  affCout = "";

  @Input()
  set params(value: any) {
    this.api = value.api;
    this.man = value.manager;
  }
}