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
      this.service.getWorld().then(
        world => {
          this.world = world.data.getWorld;
          this.affichMoney();
        }
      );

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

  affichTotDemons(){
    this.affTotDemons = ""+this.world.activeangels;
    this.valeurTotDemons = "";

    if(this.world.activeangels > 1000000){
      let truc = Math.floor(Math.log(this.world.activeangels) / Math.log(1000));
      this.valeurTotDemons = this.Illions[truc];
      this.affTotDemons = this.affTotDemons.substring(0,this.affTotDemons.length-3*truc)+"."+this.affTotDemons.substring(this.affTotDemons.length-3*(truc),this.affTotDemons.length-3*(truc-1));
    }
  }

  affichScore(){
    let score = Math.floor((150 * ((this.world.score/(10**15))**0.5)) - this.world.activeangels); // C'est pas vraiment le score plutôt le nombre d'ange en plus 

    this.affScore = ""+score;
    this.valeurScore = "";

    if(score > 1000000){
      let truc = Math.floor(Math.log(score) / Math.log(1000));
      this.valeurScore = this.Illions[truc];
      this.affScore = this.affScore.substring(0,this.affScore.length-3*truc)+"."+this.affScore.substring(this.affScore.length-3*(truc),this.affScore.length-3*(truc-1));
    }
  }

  onProductionDone(event: any){
    this.world.score += event.prod.revenu * event.prod.quantite * event.n * (1 + (this.world.activeangels*this.world.angelbonus)/100);

    this.affichScore();

    this.world.money += event.prod.revenu * event.prod.quantite * event.n * (1 + (this.world.activeangels*this.world.angelbonus)/100);
    
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
    this.service.acheterQt(event.prod, event.nbBuy).catch(reason =>
      console.log("erreur: " + reason)
    );
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
    this.service.engager(man).catch(reason =>
      console.log("erreur: " + reason)
    );
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
    this.service.upgrader(upg).catch(reason =>
      console.log("erreur: " + reason)
    );
  }

  onBuyDem(upg: Palier){ // On est obligé de faire une nouvelle fonction (de ne pas réutiliser onBuyUpg) car on risque de confondre les AllUpgrades d'anges et d'argent
    this.world.activeangels = this.world.activeangels - upg.seuil;

    this.world.angelupgrades.forEach(worldUpg => {
      if(!worldUpg.unlocked && (worldUpg.name == upg.name) && (worldUpg.idcible == upg.idcible)){ // On doit faire plein de vérification car les upgrades n'ont pas d'ID unique :(
        worldUpg.unlocked = true;
      }
    });

    if (upg.idcible > 0){ // Normalement ça sert à rien mais le laisse au cas où
      if (upg.typeratio == "gain"){
        this.world.products[upg.idcible-1].revenu *= upg.ratio;
      }
      if (upg.typeratio == "vitesse"){
        this.world.products[upg.idcible-1].revenu /= upg.ratio;
      }
    }
    else if (upg.idcible == 0) {
      this.world.products.forEach(prod => {
        if (upg.typeratio == "gain"){
          prod.revenu *= upg.ratio;
        }
        if (upg.typeratio == "vitesse"){
          prod.revenu /= upg.ratio;
        }
      });
    }
    else if (upg.idcible == -1) {
      this.world.angelbonus += upg.ratio;
    }
    
    this.affichTotDemons();

    // ENLEVER LE COMMENTAIRE !!!
    this.service.angeler(upg).catch(reason =>
      console.log("erreur: " + reason)
    );
  }

  reset (){
    this.service.reset().catch(reason =>
      console.log("erreur: " + reason)
    );
    location.reload();
  }

  api = '';
  world: World = new World();

  Illions = ["","","Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Trigintillion", "Quadragintillion", "Quinquagintillion", "Sexagintillion", "Septuagintillion", "Octogintillion", "Nonagintillion", "Centillion", "Ducentillion", "Trucentillion", "Quadringentillion", "Quingentillion", "Sescentillion", "Septingentillion", "Octingentillion", "Nongentillion"];

  affMoney: string | undefined;
  valeur: string | undefined;

  affTotDemons: string | undefined;
  valeurTotDemons: string | undefined;

  affScore: string | undefined;
  valeurScore: string | undefined;


  username = localStorage.getItem("username") || "";

  constructor(private service: WebService) {
    if(this.username == null || this.username == ""){
      this.username = "Satan"+Math.floor(Math.random() * 10000);
      localStorage.setItem("username", this.username);
    }
    this.service.user = this.username;
    // ENLEVER LE COMMENTAIRE !!!
    this.api = service.api;
    service.getWorld().then(
      world => {
        this.world = world.data.getWorld;
        // console.log(this.world.money);
        this.affichMoney();
        this.affichScore();
        this.affichTotDemons();
      }
    );

    /*this.world = this.getWorldOffLine();
    this.affichMoney();
    this.affichScore();
    this.affichTotDemons();*/
  }

  getWorldOffLine () {
    return {"name": "Hell Capitalist",
    "logo": "../assets/satan.png",
    "money": 0,
    "score": 0,
    "totalangels": 0,
    "activeangels": 0,
    "angelbonus": 0,
    "lastupdate": "0",
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
            "name": "Lava Unlock 1",
            "logo": "../assets/lava.png",
            "seuil": 20,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Lava Unlock 2",
            "logo": "../assets/lava.png",
            "seuil": 75,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Lava Unlock 3",
            "logo": "../assets/lava.png",
            "seuil": 300,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Lava Unlock 4",
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
            "name": "Dog Toys Unlock 1",
            "logo": "../assets/dog_toys.png",
            "seuil": 20,
            "idcible": 2,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Dog Toys Unlock 2",
            "logo": "../assets/dog_toys.png",
            "seuil": 75,
            "idcible": 2,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Dog Toys Unlock 3",
            "logo": "../assets/dog_toys.png",
            "seuil": 300,
            "idcible": 2,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Dog Toys Unlock 4",
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
            "name": "Screams and Despair Unlock 1",
            "logo": "../assets/scream_and_despair.png",
            "seuil": 20,
            "idcible": 3,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Screams and Despair Unlock 2",
            "logo": "../assets/scream_and_despair.png",
            "seuil": 75,
            "idcible": 3,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Screams and Despair Unlock 3",
            "logo": "../assets/scream_and_despair.png",
            "seuil": 300,
            "idcible": 3,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Screams and Despair Unlock 4",
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
            "name": "Flesh and Bones Unlock 1",
            "logo": "../assets/flesh_and_bone.png",
            "seuil": 20,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Flesh and Bones Unlock 2",
            "logo": "../assets/flesh_and_bone.png",
            "seuil": 75,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Flesh and Bones Unlock 3",
            "logo": "../assets/flesh_and_bone.png",
            "seuil": 300,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Flesh and Bones Unlock 4",
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
            "name": "Torture Machine Unlock 1",
            "logo": "../assets/torture_machine.png",
            "seuil": 20,
            "idcible": 5,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Torture Machine Unlock 2",
            "logo": "../assets/torture_machine.png",
            "seuil": 75,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Torture Machine Unlock 3",
            "logo": "../assets/torture_machine.png",
            "seuil": 300,
            "idcible": 4,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Torture Machine Unlock 4",
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
            "name": "Maths Lessons unlock 1",
            "logo": "../assets/maths_lessons.png",
            "seuil": 20,
            "idcible": 6,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Maths Lessons unlock 2",
            "logo": "../assets/maths_lessons.png",
            "seuil": 75,
            "idcible": 6,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Maths Lessons unlock 3",
            "logo": "../assets/maths_lessons.png",
            "seuil": 300,
            "idcible": 6,
            "ratio": 2,
            "typeratio": "vitesse",
            "unlocked": false
          },
          {
            "name": "Maths Lessons unlock 4",
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
        "name": "Lava Upgrade 1",
        "logo": "../assets/lava.png",
        "seuil": 1000,
        "idcible": 1,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Dog Toys Upgrade 1",
        "logo": "../assets/dog_toys.png",
        "seuil": 15000,
        "idcible": 2,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Scream And Despair Upgrade 1",
        "logo": "../assets/scream_and_despair.png",
        "seuil": 15000,
        "idcible": 3,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Flesh And Bone Upgrade 1",
        "logo": "../assets/flesh_and_bone.png",
        "seuil": 100000,
        "idcible": 4,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Torture Machine Upgrade 1",
        "logo": "../assets/torture_machine.png",
        "seuil": 200000,
        "idcible": 5,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Maths Lessons",
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
        "name": "Lava Upgrade 2",
        "logo": "../assets/lava.png",
        "seuil": 4000000,
        "idcible": 1,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Dog Toys Upgrade 2",
        "logo": "../assets/dog_toys.png",
        "seuil": 6000000,
        "idcible": 2,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Scream And Despair Upgrade 2",
        "logo": "../assets/scream_and_despair.png",
        "seuil": 10000000,
        "idcible": 3,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Flesh And Bone Upgrade 2",
        "logo": "../assets/flesh_and_bone.png",
        "seuil": 20000000,
        "idcible": 4,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Torture Machine Update 2",
        "logo": "../assets/torture_machine.png",
        "seuil": 50000000,
        "idcible": 5,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Maths Lessons Upgrade 2",
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
        "logo": "../assets/Demon.png",
        "seuil": 10,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
      },
      {
        "name": "Angelic Mutiny",
        "logo": "../assets/Demon.png",
        "seuil": 100000,
        "idcible": -1,
        "ratio": 2,
        "typeratio": "ange",
        "unlocked": false
      },
      {
        "name": "Angelic Rebellion",
        "logo": "../assets/Demon.png",
        "seuil": 100000000,
        "idcible": -1,
        "ratio": 2,
        "typeratio": "ange",
        "unlocked": false
      },
      {
        "name": "Angelic Selection",
        "logo": "../assets/Demon.png",
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
