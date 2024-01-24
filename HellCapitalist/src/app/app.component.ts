import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProduitComponent } from './produit.component';
import { ManagerComponent } from './manager.component';
import { WebService } from '../car/webservice.service';
import { World, Product, Pallier } from '../class/World';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ProduitComponent, ManagerComponent]
})
export class AppComponent {
  title = "HellCapitalist"
  
  display = 0;

  openPage(opt:number) {
    this.display = opt;
  }

  closePage() {
    this.display = 0;
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

  /*produits;
  managers;

  worldService = inject(WorldService);

  constructor() {
    this.produits = this.worldService.getProduits()
    this.managers = this.worldService.getManagers()
  }*/

  world: World = new World();

  constructor(private service: WebService) {
    service.getWorld().then(
      world => {
        this.world = world.data.getWorld;
      }
    );
  }
}
