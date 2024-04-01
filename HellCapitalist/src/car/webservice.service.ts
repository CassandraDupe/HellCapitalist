import { Injectable } from '@angular/core';
import { createClient, fetchExchange } from '@urql/core';
import { ACHETER_QT, ANGELER, ENGAGER, GET_WORLD, LANCER_PRODUCTION, UPGRADER } from './Grapqhrequests'
import { Palier, Product } from '../class/World';

@Injectable({
  providedIn: 'root'
})
export class WebService {
    api = 'http://localhost:4000/'; // Notre Back
    user = '';
    // api = 'https://isiscapitalistgraphql.kk.kurasawa.fr/'; // Back du Prof

    createClient() {
        return createClient({ url: this.api+'graphql',
            exchanges: [fetchExchange],
            fetchOptions: () => {
                return {
                    headers: {'x-user': this.user},
                };
            },
        });
    }

    getWorld() {
        return this.createClient().query(GET_WORLD, {}).toPromise();
    }

    lancerProduction(product: Product) {
        return this.createClient().mutation(LANCER_PRODUCTION, { id:product.id }).toPromise();
    }

    acheterQt(product: Product, qt:number) {
        return this.createClient().mutation(ACHETER_QT, { id:product.id, quantite: qt }).toPromise();
    }

    engager(manager: Palier) {
        return this.createClient().mutation(ENGAGER, { name:manager.name }).toPromise();
    }

    upgrader(upgrade: Palier) {
        return this.createClient().mutation(UPGRADER, { name:upgrade.name }).toPromise();
    }

    /*reset() {
        return this.createClient().mutation(RESET, {}).toPromise();
    }*/

    angeler(angel: Palier) {
        return this.createClient().mutation(ANGELER, { name:angel.name }).toPromise();
    }
}