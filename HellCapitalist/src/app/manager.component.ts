import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Manager } from '../class/Manager';

@Component({
  selector: 'manager',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
    @Input() man = new Manager(0, "", 0, "");
  }