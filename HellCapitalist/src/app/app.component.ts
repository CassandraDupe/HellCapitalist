import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProduitComponent } from './produit.component';
import { ManagerComponent } from './manager.component';
import { UnlockComponent } from './unlock.component';
import { UpgradeComponent } from './upgrade.component';
import { WebService } from '../car/webservice.service';
import { World, Product, Palier } from '../class/World';
import { bigvalue } from '../class/bigvalue.pipe';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ProduitComponent, ManagerComponent, UnlockComponent, UpgradeComponent, bigvalue, FormsModule]
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

  connecte = true;

  connection() {
    if(this.connecte){
      this.connecte = false;
    } else {
      localStorage.setItem("username", this.username);
      this.service.user = this.username;
      // ENLEVER LE COMMENTAIRE !!!
      /*this.service.getWorld().then(
        world => {
          this.world = world.data.getWorld;
          this.affichMoney();
        }
      );*/

      this.connecte = true;
    }
  }

  affichMoney(){
    this.affMoney = ""+this.world.money;
    this.valeur = "";
    if(this.world.money>=1000000){
      this.affMoney = this.affMoney.split(".",2)[0];
      let truc = Math.floor(Math.log(this.world.money) / Math.log(1000));
      this.valeur = this.Illions[truc];
      // console.log("############################");
      // console.log(this.affMoney);
      // console.log("0 à "+(this.affMoney.length-3*truc)+"."+(this.affMoney.length-3*(truc))+" à "+(this.affMoney.length-3*(truc-1)));
      this.affMoney = this.affMoney.substring(0,this.affMoney.length-3*truc)+"."+this.affMoney.substring(this.affMoney.length-3*(truc),this.affMoney.length-3*(truc-1));
      // console.log("=> "+this.affMoney);
    }
  }

  onProductionDone(event: any){
    this.world.money = this.world.money + (event.prod.revenu * event.prod.quantite * event.n);
    
    this.affichMoney();
  }

  onBuyProd(event: any){
    let updatedProduct = {...this.world.products[event.prod.id-1]};

    updatedProduct.quantite += event.nbBuy;
    updatedProduct.cout = updatedProduct.cout * Math.pow(updatedProduct.croissance,event.nbBuy);
    
    updatedProduct.paliers.forEach(pal => {
      if(!pal.unlocked && (updatedProduct.quantite >= pal.seuil)){
        pal.unlocked = true;
        if(pal.typeratio == "gain"){
          updatedProduct.revenu = updatedProduct.revenu * pal.ratio;
        }
        if(pal.typeratio == "vitesse"){
          updatedProduct.vitesse = updatedProduct.vitesse / pal.ratio;
        }
      }
    });

    // console.log(updatedProduct);

    this.world.products[event.prod.id-1] = updatedProduct;

    // Maintenant on vérifie pour les allUnlocks
    let nbTotProd = 0;
    this.world.products.forEach(prod => {
      nbTotProd += prod.quantite;
    });

    this.world.allunlocks.forEach(pal => {
      if(!pal.unlocked && (nbTotProd >= pal.seuil)){
        pal.unlocked = true;
        if(pal.typeratio == "gain"){
          this.world.products.forEach(prod => {
            // Pas besoin de remplacer le produit complet, ça marche comme ça (en faisant moins de calculs)
            /*updatedProduct = {...prod};
            updatedProduct.revenu = updatedProduct.revenu * pal.ratio;
            this.world.products[updatedProduct.id-1] = updatedProduct;*/
            prod.revenu = prod.revenu * pal.ratio;
          });
        }
        if(pal.typeratio == "vitesse"){
          this.world.products.forEach(prod => {
            /*updatedProduct = {...prod};
            updatedProduct.vitesse = updatedProduct.vitesse / pal.ratio;
            this.world.products[updatedProduct.id-1] = updatedProduct;*/
            prod.vitesse = prod.vitesse / pal.ratio;
          });
        }
      }
    });

    this.world.money = this.world.money - (event.cout);
    this.affichMoney();

    // ENLEVER LE COMMENTAIRE !!!
    /*this.service.acheterQt(event.prod, event.nbBuy).catch(reason =>
      console.log("erreur: " + reason)
    );*/
  }

  // badgeManagers = 0; // Ne marche pas

  onBuyMan(man: Palier){
    this.world.money = this.world.money - man.seuil;

    this.world.managers[man.idcible-1].unlocked = true;

    let updatedProduct = {...this.world.products[man.idcible-1]};
    updatedProduct.managerUnlocked = true;
    this.world.products[man.idcible-1] = updatedProduct;
    
    this.affichMoney();

    // ENLEVER LE COMMENTAIRE !!!
    /*this.service.engager(man).catch(reason =>
      console.log("erreur: " + reason)
    );*/
  }

  onBuyUpg(upg: Palier){
    this.world.money = this.world.money - upg.seuil;

    this.world.upgrades.forEach(worldUpg => {
      if(!worldUpg.unlocked && (worldUpg.name == upg.name) && (worldUpg.idcible == upg.idcible)){ // On doit faire plein de vérification car les upgrades n'ont pas d'ID unique :(
        worldUpg.unlocked = true;
      }
    });

    if (upg.idcible != 0){
      if (upg.typeratio == "gain"){
        this.world.products[upg.idcible-1].revenu *= upg.ratio;
      }
      if (upg.typeratio == "vitesse"){
        this.world.products[upg.idcible-1].revenu /= upg.ratio;
      }
    }
    else {
      this.world.products.forEach(prod => {
        if (upg.typeratio == "gain"){
          prod.revenu *= upg.ratio;
        }
        if (upg.typeratio == "vitesse"){
          prod.revenu /= upg.ratio;
        }
      });
    }
    
    this.affichMoney();

    // ENLEVER LE COMMENTAIRE !!!
    /*this.service.upgrader(upg).catch(reason =>
      console.log("erreur: " + reason)
    );*/
  }

  api = '';
  world: World = new World();

  affMoney: string | undefined;
  valeur: string | undefined;
  Illions = ["","","Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Trigintillion", "Quadragintillion", "Quinquagintillion", "Sexagintillion", "Septuagintillion", "Octogintillion", "Nonagintillion", "Centillion", "Ducentillion", "Trucentillion", "Quadringentillion", "Quingentillion", "Sescentillion", "Septingentillion", "Octingentillion", "Nongentillion"];

  username = localStorage.getItem("username") || "";

  constructor(private service: WebService) {
    if(this.username == null || this.username == ""){
      this.username = "Satan"+Math.floor(Math.random() * 10000);
      localStorage.setItem("username", this.username);
    }
    this.service.user = this.username;
    // ENLEVER LE COMMENTAIRE !!!
    /*this.api = service.api;
    service.getWorld().then(
      world => {
        this.world = world.data.getWorld;
        // console.log(this.world.money);
        this.affichMoney();
      }
    );*/

    this.world = this.getWorldOffLine();
    this.affichMoney();
  }

  getWorldOffLine () {
    return {"name": "A Nice World 2",
    "logo": "../assets/satan.png",
    "money": 1000000,
    "score": 2,
    "totalangels": 0,
    "activeangels": 0,
    "angelbonus": 2,
    "lastupdate": "1706377728243",
    "products": [
      {
        "id": 1,
        "name": "Lava",
        "logo": "../assets/lava.png",
        "cout": 4,
        "croissance": 1.07,
        "revenu": 1,
        "vitesse": 500,
        "quantite": 1,
        "timeleft": 0,
        "managerUnlocked": false,
        "paliers": [
          {
            "name": "Paper is beautiful !",
            "logo": "../assets/lava.png",
            "seuil": 20,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Don't forget your paper bag  !",
            "logo": "../assets/lava.png",
            "seuil": 75,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Go Paper ! ",
            "logo": "../assets/lava.png",
            "seuil": 300,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Paper Crazy !",
            "logo": "../assets/lava.png",
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
        "name": "Dog Toys",
        "logo": "../assets/dog_toys.png",
        "cout": 60,
        "croissance": 1.15,
        "revenu": 60,
        "vitesse": 3000,
        "quantite": 0,
        "timeleft": 0,
        "managerUnlocked": false,
        "paliers": [
          {
            "name": "Give me some good bins !",
            "logo": "../assets/dog_toys.png",
            "seuil": 20,
            "idcible": 2,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "My Trashcans are better than yours ! ",
            "logo": "../assets/dog_toys.png",
            "seuil": 75,
            "idcible": 2,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Recycle or die ! ",
            "logo": "../assets/dog_toys.png",
            "seuil": 300,
            "idcible": 2,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Bins are getting mad !",
            "logo": "../assets/dog_toys.png",
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
        "name": "Screams and Despair",
        "logo": "../assets/scream_and_despair.png",
        "cout": 720,
        "croissance": 1.14,
        "revenu": 540,
        "vitesse": 6000,
        "quantite": 0,
        "timeleft": 0,
        "managerUnlocked": false,
        "paliers": [
          {
            "name": "More Bicycles !",
            "logo": "../assets/scream_and_despair.png",
            "seuil": 20,
            "idcible": 3,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "More More Bicycles !",
            "logo": "../assets/scream_and_despair.png",
            "seuil": 75,
            "idcible": 3,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Bicycles will rule the world ! ",
            "logo": "../assets/scream_and_despair.png",
            "seuil": 300,
            "idcible": 3,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Bicycles, what else ?",
            "logo": "../assets/scream_and_despair.png",
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
        "name": "Flesh and Bones",
        "logo": "../assets/flesh_and_bone.png",
        "cout": 8640,
        "croissance": 1.13,
        "revenu": 4320,
        "vitesse": 12000,
        "quantite": 0,
        "timeleft": 0,
        "managerUnlocked": false,
        "paliers": [
          {
            "name": "These cars are wizzzzzz !",
            "logo": "../assets/flesh_and_bone.png",
            "seuil": 20,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Dont't be afraid by my cars !",
            "logo": "../assets/flesh_and_bone.png",
            "seuil": 75,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Electricity forever ! ",
            "logo": "../assets/flesh_and_bone.png",
            "seuil": 300,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "I like to drive !",
            "logo": "../assets/flesh_and_bone.png",
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
        "name": "Torture Machine",
        "logo": "../assets/torture_machine.png",
        "cout": 103680,
        "croissance": 1.12,
        "revenu": 51840,
        "vitesse": 24000,
        "quantite": 0,
        "timeleft": 0,
        "managerUnlocked": false,
        "paliers": [
          {
            "name": "I feel like the wind !",
            "logo": "../assets/torture_machine.png",
            "seuil": 20,
            "idcible": 5,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Give me more wind !",
            "logo": "../assets/torture_machine.png",
            "seuil": 75,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "There is nothing like the wind ! ",
            "logo": "../assets/torture_machine.png",
            "seuil": 300,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Ride the wild wind !",
            "logo": "../assets/torture_machine.png",
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
        "name": "Maths Lessons",
        "logo": "../assets/maths_lessons.png",
        "cout": 1244160,
        "croissance": 1.11,
        "revenu": 622080,
        "vitesse": 84000,
        "quantite": 0,
        "timeleft": 0,
        "managerUnlocked": false,
        "paliers": [
          {
            "name": "Let's the sun shining ! ",
            "logo": "../assets/maths_lessons.png",
            "seuil": 20,
            "idcible": 6,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "I feel the power of the sun !",
            "logo": "../assets/maths_lessons.png",
            "seuil": 75,
            "idcible": 6,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "It's hot ! ",
            "logo": "../assets/maths_lessons.png",
            "seuil": 300,
            "idcible": 6,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Oh my god, we can't stop it !",
            "logo": "../assets/maths_lessons.png",
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
        "logo": "../assets/satan.png",
        "seuil": 30,
        "idcible": 0,
        "ratio": 2,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "To take and not to give",
        "logo": "../assets/satan.png",
        "seuil": 150,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Take it all !",
        "logo": "../assets/satan.png",
        "seuil": 375,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "To infinite and beyond !",
        "logo": "../assets/satan.png",
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
        "logo": "../assets/lava.png",
        "seuil": 1000,
        "idcible": 1,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "This is my bin",
        "logo": "../assets/dog_toys.png",
        "seuil": 15000,
        "idcible": 2,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "A nice bicycle",
        "logo": "../assets/scream_and_despair.png",
        "seuil": 15000,
        "idcible": 3,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "I want this car !",
        "logo": "../assets/flesh_and_bone.png",
        "seuil": 100000,
        "idcible": 4,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Don't laugh ! Just buy ! ",
        "logo": "../assets/torture_machine.png",
        "seuil": 200000,
        "idcible": 5,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "A big advance",
        "logo": "../assets/maths_lessons.png",
        "seuil": 3000000,
        "idcible": 6,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "I want it all !",
        "logo": "../assets/satan.png",
        "seuil": 3500000,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Why do you look a my bag ?",
        "logo": "../assets/lava.png",
        "seuil": 4000000,
        "idcible": 1,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "The same bin as my mum.",
        "logo": "../assets/dog_toys.png",
        "seuil": 6000000,
        "idcible": 2,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "My bicycle goes fast.",
        "logo": "../assets/scream_and_despair.png",
        "seuil": 10000000,
        "idcible": 3,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "No more oil",
        "logo": "../assets/flesh_and_bone.png",
        "seuil": 20000000,
        "idcible": 4,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "It's blowing too fast!",
        "logo": "../assets/torture_machine.png",
        "seuil": 50000000,
        "idcible": 5,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Clouds go away !",
        "logo": "../assets/maths_lessons.png",
        "seuil": 100000000,
        "idcible": 6,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Bingo !",
        "logo": "../assets/satan.png",
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
        "logo": "icones/Demon.png",
        "seuil": 10,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Angelic Mutiny",
        "logo": "icones/Demon.png",
        "seuil": 100000,
        "idcible": -1,
        "ratio": 2,
        "typeratio": "ange",
        "unlocked": false
      },
      {
        "name": "Angelic Rebellion",
        "logo": "icones/Demon.png",
        "seuil": 100000000,
        "idcible": -1,
        "ratio": 2,
        "typeratio": "ange",
        "unlocked": false
      },
      {
        "name": "Angelic Selection",
        "logo": "icones/Demon.png",
        "seuil": 1000000000,
        "idcible": 0,
        "ratio": 5,
        "typeratio": "gain",
        "unlocked": false
      }
    ],
    "managers": [
      {
        "name": "Freddy Krueger",
        "logo": "../assets/Freddy_Krueger.png",
        "seuil": 10.02,
        "idcible": 1,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Shô Tucker",
        "logo": "../assets/Shô_Tucker.png",
        "seuil": 15000,
        "idcible": 2,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Pinhead",
        "logo": "../assets/Pinhead.png",
        "seuil": 100000,
        "idcible": 3,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Hannibal Lecter",
        "logo": "../assets/Hannibal_Lecter.png",
        "seuil": 500000,
        "idcible": 4,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "John Kramer",
        "logo": "../assets/John_Kramer.png",
        "seuil": 1200000,
        "idcible": 5,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Gwenael Araignie",
        "logo": "../assets/Gwenael_Araignie.png",
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
