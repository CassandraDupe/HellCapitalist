import { Pipe } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'bigvalue'
})
export class bigvalue{

    transform(valeur: number, args?: any): string {
        let res ="";
        if (valeur < 1000)
            res = valeur.toFixed(2);
        else if (valeur < 1000000)
            res = valeur.toFixed(0);
        else if (valeur >= 1000000) {
            res = valeur.toPrecision(4);
            res = res.replace(/e\+(.*)/, " 10<sup>$1</sup>");
        }
        return res;
    }

}