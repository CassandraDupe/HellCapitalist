import { Injectable } from '@angular/core';
import { createClient, fetchExchange } from '@urql/core';
import { GET_WORLD } from './Grapqhrequests'

@Injectable({
  providedIn: 'root'
})
export class WebService {
    server = 'http://localhost:4000/';
    user = '';
    api = 'https://isiscapitalistgraphql.kk.kurasawa.fr/graphql';

    createClient() {
        return createClient({ url: this.api,
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
}