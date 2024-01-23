import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Produit } from '../class/Produit'

@Component({
  selector: 'produit',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent {
    @Input() prod = new Produit(0, "", 0, 0, "");

    valeur = "billion"
  }