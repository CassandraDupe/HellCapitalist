import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../class/World';

@Component({
  selector: 'produit',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent {
    @Input() prod = new Product;

    valeur = "billion"
  }