function saveWorld(context) {
    const fs = require('fs');
    fs.writeFile("userworlds/" + context.user + "-world.json",
        JSON.stringify(context.world), err => {
            if (err) {
                console.error(err)
                throw new Error(
                    `Erreur d'écriture du monde coté serveur`)
            }
        })
}

module.exports = {
    Query: {
        getWorld(parent, args, context, info) {
            saveWorld(context)
            return context.world
        }
    },


    Mutation: {
        acheterQtProduit(parent, args, context, info){
            let products = context.world.products;
            let product = products.find(p => p.id === args.id)
            if (product){
                let coutNProduits = (product.cout*(1-Math.pow(product.croissance, quantite)))/(1-product.croissance);
                if (context.world.money >= coutNProduits){
                    product.quantite += args.quantite;
                    product.cout = product.cout*Math.pow(product.croissance, args.quantite);
                    context.world.money -= coutNProduits;
                    saveWorld(context)
                    return(product);
                }else{
                    throw new Error(
                        `Une telle quantité coute ${coutNProduits}, vous n'avez que ${context.world.money}`)
                }

            }else {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            }
        }
    },


    Mutation: {
        lancerProductionProduit(parent, args, context, info){
            let products = context.world.products;
            let product = products.find(p => p.id === args.id)
            if (product){

            }else{
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            }
        }
    }
};