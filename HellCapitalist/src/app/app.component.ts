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
  mult="x1";

  onClick() {
    if (this.i < 4){
      this.i = this.i + 1;
    } else {
      this.i = 0;
    }
    this.mult = this.mults.at(this.i)!;
  }

  connecte: boolean | null = false;

  connection() {
    this.connecte = null;
  }

  api = 'https://isiscapitalistgraphql.kk.kurasawa.fr/graphql';
  world: World = new World();

  constructor(private service: WebService) {
    /*service.getWorld().then(
      world => {
        this.world = world.data.getWorld;
      }
    );*/

    this.world = this.getWorldOffLine();
  }

  getWorldOffLine () {
    return {"name": "A Nice World 2",
    "logo": "icones/ecolo.jpg",
    "money": 100000,
    "score": 2,
    "totalangels": 0,
    "activeangels": 0,
    "angelbonus": 2,
    "lastupdate": "1706377728243",
    "products": [
      {
        "id": 1,
        "name": "Paper Bags",
        "logo": "icones/sacpapier.jpg",
        "cout": 4,
        "croissance": 1.07,
        "revenu": 1,
        "vitesse": 500,
        "quantite": 1,
        "timeleft": 0,
        "managerUnlocked": false,
        "palliers": [
          {
            "name": "Paper is beautiful !",
            "logo": "icones/sacpapier.jpg",
            "seuil": 20,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Don't forget your paper bag  !",
            "logo": "icones/sacpapier.jpg",
            "seuil": 75,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Go Paper ! ",
            "logo": "icones/sacpapier.jpg",
            "seuil": 300,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Paper Crazy !",
            "logo": "icones/sacpapier.jpg",
            "seuil": 500,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "gain",
            "unlocked": false
          }
        ]
      },
      {
        "id": 2,
        "name": "Recycle Bins",
        "logo": "icones/recyclage.jpg",
        "cout": 60,
        "croissance": 1.15,
        "revenu": 60,
        "vitesse": 3000,
        "quantite": 0,
        "timeleft": 0,
        "managerUnlocked": false,
        "palliers": [
          {
            "name": "Give me some good bins !",
            "logo": "icones/recyclage.jpg",
            "seuil": 20,
            "idcible": 2,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "My Trashcans are better than yours ! ",
            "logo": "icones/recyclage.jpg",
            "seuil": 75,
            "idcible": 2,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Recycle or die ! ",
            "logo": "icones/recyclage.jpg",
            "seuil": 300,
            "idcible": 2,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Bins are getting mad !",
            "logo": "icones/recyclage.jpg",
            "seuil": 500,
            "idcible": 2,
            "ratio": 2,
            "typeratio": "gain",
            "unlocked": false
          }
        ]
      },
      {
        "id": 3,
        "name": "Bicycles",
        "logo": "icones/velo.jpg",
        "cout": 720,
        "croissance": 1.14,
        "revenu": 540,
        "vitesse": 6000,
        "quantite": 0,
        "timeleft": 0,
        "managerUnlocked": false,
        "palliers": [
          {
            "name": "More Bicycles !",
            "logo": "icones/velo.jpg",
            "seuil": 20,
            "idcible": 3,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "More More Bicycles !",
            "logo": "icones/velo.jpg",
            "seuil": 75,
            "idcible": 3,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Bicycles will rule the world ! ",
            "logo": "icones/photo.jpg",
            "seuil": 300,
            "idcible": 3,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Bicycles, what else ?",
            "logo": "icones/velo.jpg",
            "seuil": 500,
            "idcible": 3,
            "ratio": 2,
            "typeratio": "gain",
            "unlocked": false
          }
        ]
      },
      {
        "id": 4,
        "name": "Electrical Cars",
        "logo": "icones/voitureelec.jpg",
        "cout": 8640,
        "croissance": 1.13,
        "revenu": 4320,
        "vitesse": 12000,
        "quantite": 0,
        "timeleft": 0,
        "managerUnlocked": false,
        "palliers": [
          {
            "name": "These cars are wizzzzzz !",
            "logo": "icones/voitureelec.jpg",
            "seuil": 20,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Dont't be afraid by my cars !",
            "logo": "icones/voitureelec.jpg",
            "seuil": 75,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Electricity forever ! ",
            "logo": "icones/voitureelec.jpg",
            "seuil": 300,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "I like to drive !",
            "logo": "icones/voitureelec.jpg",
            "seuil": 500,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "gain",
            "unlocked": false
          }
        ]
      },
      {
        "id": 5,
        "name": "Wind Turbines",
        "logo": "icones/eolienne.jpg",
        "cout": 103680,
        "croissance": 1.12,
        "revenu": 51840,
        "vitesse": 24000,
        "quantite": 0,
        "timeleft": 0,
        "managerUnlocked": false,
        "palliers": [
          {
            "name": "I feel like the wind !",
            "logo": "icones/eolienne.jpg",
            "seuil": 20,
            "idcible": 5,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Give me more wind !",
            "logo": "icones/velo.jpg",
            "seuil": 75,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "There is nothing like the wind ! ",
            "logo": "icones/photo.jpg",
            "seuil": 300,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Ride the wild wind !",
            "logo": "icones/velo.jpg",
            "seuil": 500,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          }
        ]
      },
      {
        "id": 6,
        "name": "Solar Energy",
        "logo": "icones/solar.jpg",
        "cout": 1244160,
        "croissance": 1.11,
        "revenu": 622080,
        "vitesse": 84000,
        "quantite": 0,
        "timeleft": 0,
        "managerUnlocked": false,
        "palliers": [
          {
            "name": "Let's the sun shining ! ",
            "logo": "icones/solar.jpg",
            "seuil": 20,
            "idcible": 6,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "I feel the power of the sun !",
            "logo": "icones/solar.jpg",
            "seuil": 75,
            "idcible": 6,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "It's hot ! ",
            "logo": "icones/photo.jpg",
            "seuil": 300,
            "idcible": 6,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Oh my god, we can't stop it !",
            "logo": "icones/velo.jpg",
            "seuil": 500,
            "idcible": 6,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          }
        ]
      }
    ],
    "allunlocks": [
      {
        "name": "All is better than one",
        "logo": "icones/all.jpg",
        "seuil": 30,
        "idcible": 0,
        "ratio": 2,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "To take and not to give",
        "logo": "icones/all.jpg",
        "seuil": 150,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Take it all !",
        "logo": "icones/all.jpg",
        "seuil": 375,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "To infinite and beyond !",
        "logo": "icones/all.jpg",
        "seuil": 500,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      }
    ],
    "upgrades": [
      {
        "name": "Do you like paper bag ?",
        "logo": "icones/sacpapier.jpg",
        "seuil": 1000,
        "idcible": 1,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "This is my bin",
        "logo": "icones/recyclage.jpg",
        "seuil": 15000,
        "idcible": 2,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "A nice bicycle",
        "logo": "icones/velo.jpg",
        "seuil": 15000,
        "idcible": 3,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "I want this car !",
        "logo": "icones/voitureelec.jpg",
        "seuil": 100000,
        "idcible": 4,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Don't laugh ! Just buy ! ",
        "logo": "icones/eolienne.jpg",
        "seuil": 200000,
        "idcible": 5,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "A big advance",
        "logo": "icones/solar.jpg",
        "seuil": 3000000,
        "idcible": 6,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "I want it all !",
        "logo": "icones/all.jpg",
        "seuil": 3500000,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Why do you look a my bag ?",
        "logo": "icones/sacpapier.jpg",
        "seuil": 4000000,
        "idcible": 1,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "The same bin as my mum.",
        "logo": "icones/recyclage.jpg",
        "seuil": 6000000,
        "idcible": 2,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "My bicycle goes fast.",
        "logo": "icones/velo.jpg",
        "seuil": 10000000,
        "idcible": 3,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "No more oil",
        "logo": "icones/voitureelec.jpg",
        "seuil": 20000000,
        "idcible": 4,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "It's blowing too fast!",
        "logo": "icones/eolienne.jpg",
        "seuil": 50000000,
        "idcible": 5,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Clouds go away !",
        "logo": "icones/solar.jpg",
        "seuil": 100000000,
        "idcible": 6,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Bingo !",
        "logo": "icones/all.jpg",
        "seuil": 500000000,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      }
    ],
    "angelupgrades": [
      {
        "name": "Angel Sacrifice",
        "logo": "icones/angel.png",
        "seuil": 10,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Angelic Mutiny",
        "logo": "icones/angel.png",
        "seuil": 100000,
        "idcible": -1,
        "ratio": 2,
        "typeratio": "ange",
        "unlocked": false
      },
      {
        "name": "Angelic Rebellion",
        "logo": "icones/angel.png",
        "seuil": 100000000,
        "idcible": -1,
        "ratio": 2,
        "typeratio": "ange",
        "unlocked": false
      },
      {
        "name": "Angelic Selection",
        "logo": "icones/angel.png",
        "seuil": 1000000000,
        "idcible": 0,
        "ratio": 5,
        "typeratio": "gain",
        "unlocked": false
      }
    ],
    "managers": [
      {
        "name": "Wangari Maathai",
        "logo": "icones/WangariMaathai.jpg",
        "seuil": 10,
        "idcible": 1,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Ellen MacArthur",
        "logo": "icones/ellenmacarthur.jpg",
        "seuil": 15000,
        "idcible": 2,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Pierre Rabhi",
        "logo": "icones/pierreRabhi.jpg",
        "seuil": 100000,
        "idcible": 3,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Nicolas Hulot",
        "logo": "icones/hulot.jpg",
        "seuil": 500000,
        "idcible": 4,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Jean-Yves Cousteau",
        "logo": "icones/cousteau.jpg",
        "seuil": 1200000,
        "idcible": 5,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Shiva Vandana",
        "logo": "icones/shivavandana.jpg",
        "seuil": 10000000,
        "idcible": 6,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
      }
    ]
  }
  }
}
