const {lastupdate} = require("./world");

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
        acheterQtProduit(parent, args, context, info) {
            let products = context.world.products;
            let product = products.find(p => p.id === args.id)
            //console.log(`produit = ${product}`)
            if (product) {
                let coutNProduits = (product.cout * (1 - Math.pow(product.croissance, args.quantite))) / (1 - product.croissance);
                if (context.world.money >= coutNProduits) {
                    product.quantite += args.quantite;
                    product.cout = product.cout * Math.pow(product.croissance, args.quantite);
                    context.world.money -= coutNProduits;
                    saveWorld(context)
                    return (product);
                } else {
                    throw new Error(
                        `Une telle quantité coute ${coutNProduits}, vous n'avez que ${context.world.money}`)
                }
            } else {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            }
        },

        lancerProductionProduit(parent, args, context, info) {
            let products = context.world.products;
            let product = products.find(p => p.id === args.id)
            if (product) {
                product.vitesse = product.timeleft
                saveWorld(context);
            } else {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            }
        },

        engagerManager(parent, args, context, info) {
            let managers = context.world.managers;
            let manager = managers.find(m => m.name === args.name)
            if (manager) {
                if (context.world.money >= manager.seuil) {
                    let products = context.world.products
                    let produit = products.find(p => p.id = manager.idcible)
                    manager.unlocked = true
                    saveWorld(context);
                } else {
                    throw new Error(
                        `Vous n'avez pas assez d'argent pour acheter ce manager`)
                }
            } else {
                throw new Error(
                    `Le manager avec l'id ${args.id} n'existe pas`)
            }
        }
    }
}


// Fonction pas aboutie. A finir !!!!!
// Vérifier le timeleft et comment l'appeler. Peut-être product.timeleft
function CondiCalcul (parent, args, context, info){
    // On récupère un produit du monde selon son id
    let product = context.world.products.findIndex (p => p.id === args.id)
    // Calcul de la date actuelle
    const today = new Date(Date.now());
    today.toLocaleDateString();
    // Calcul du temps écoulé depuis la dernière mise à jour
    let elapsetime = today - lastupdate;
    elapsetime -= product.vitesse-timeleft;
    if (product.managerUnlocked){
        timeleft = product.vitesse - elapsetime%product.vitesse;
        nbrProduit = Math.trunc(elapsetime / product.vitesse);
    } else {
        if (timeleft != 0){
            if (product.timeleft <= elapsetime){
                nProd = 1;
                product.timeleft = 0;
            } else {
                product.timeleft -= elapsetime;
            }
        }
    }
}

function calculScore(parent, args, context, info){
    let products = context.world.products;
}