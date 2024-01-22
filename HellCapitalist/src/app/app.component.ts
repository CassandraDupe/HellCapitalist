import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProduitComponent } from './produit.component';
import { ProduitService } from '../car/ProduitService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProduitComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hell Capitalist';
  produits;

  produitService = inject(ProduitService);

  constructor() {
    this.produits = this.produitService
       .getProduits()
  }
}
