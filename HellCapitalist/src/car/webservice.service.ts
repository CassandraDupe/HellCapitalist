import { Injectable } from '@angular/core';
import { createClient, fetchExchange } from '@urql/core';
import { GET_WORLD, LANCER_PRODUCTION } from './Grapqhrequests'
import { Product } from '../class/World';

@Injectable({
  providedIn: 'root'
})
export class WebService {
    server = 'http://localhost:4000/';
    user = '';
    api = 'https://isiscapitalistgraphql.kk.kurasawa.fr/';

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
        return this.createClient().mutation(LANCER_PRODUCTION, { id:product.id}).toPromise();
    }
}