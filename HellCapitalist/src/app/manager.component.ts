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
    @Input() man = new Pallier;
    
    api = 'https://isiscapitalistgraphql.kk.kurasawa.fr/';
  }