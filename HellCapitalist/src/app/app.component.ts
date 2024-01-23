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

  display1 = 'none';
  display2 = 'none';
  display3 = 'none';

  openPage(opt:number) {
    if(opt == 1){
      this.display1 = 'block';
      this.display2 = 'none';
      this.display3 = 'none';
    }
    if(opt == 2){
      this.display1 = 'none';
      this.display2 = 'block';
      this.display3 = 'none';
    }
    if(opt == 3){
      this.display1 = 'none';
      this.display2 = 'none';
      this.display3 = 'block';
    }
  }

  closePage() {
    this.display1 = 'none';
    this.display2 = 'none';
    this.display3 = 'none';
  }

  i=0;
  mults=["x1","x10","x100","MAX","NEXT"];

  onClick() {
    if (this.i < 4){
      this.i = this.i + 1;
    } else {
      this.i = 0;
    }
  }

  produits;

  produitService = inject(ProduitService);

  constructor() {
    this.produits = this.produitService
       .getProduits()
  }
}
