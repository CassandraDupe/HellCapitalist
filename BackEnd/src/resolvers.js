const {lastupdate} = require("./world");

function saveWorld(context) {
    const fs = require('fs');
    fs.writeFile("../userworlds/" + context.user + "-world.json",
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
            updateScore(context)
            saveWorld(context)
            return context.world
        }
    },

    Mutation: {
        acheterQtProduit(parent, args, context, info) {
            updateScore(context);
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
            updateScore(context);
            let products = context.world.products;
            let product = products.find(p => p.id === args.id)
            if (product) {
                product.timeleft = product.vitesse
                saveWorld(context);
                return (product);
            } else {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            }
        },

        engagerManager(parent, args, context, info) {
            updateScore(context);
            let managers = context.world.managers;
            let manager = managers.find(m => m.name === args.name)
            if (manager) {
                if (context.world.money >= manager.seuil) {
                    manager.unlocked = true;
                    let products = context.world.products
                    let product = products.find(p => p.id = manager.idcible)
                    product.managerUnlocked = true;
                    saveWorld(context);
                    return (manager, product);
                } else {
                    throw new Error(
                        `Vous n'avez pas assez d'argent pour acheter ce manager`)
                }
            } else {
                throw new Error(
                    `Le manager avec l'id ${args.id} n'existe pas`)
            }
        },

        // acheterCashUpgrade(parent, args, context, info) {
        //     updateScore(context);
        // }
    }
}

function condiCalcul(product, elapsetime, context) {
    // On replace le elapsetime pour ne plus avoir de problème de temps restant
    elapsetime += product.vitesse - product.timeleft;
    // On déclare une variable pour compter le nbr de produits créés depuis le lastupdate
    let nbrProduit = 0;
    if (product.managerUnlocked) {
        product.timeleft = product.vitesse - elapsetime % product.vitesse;
        nbrProduit = Math.trunc(elapsetime / product.vitesse);
    } else {
        if (product.timeleft != 0) {
            if (product.vitesse < elapsetime) {
                nbrProduit = 1;
                product.timeleft = 0;
            } else {
                product.timeleft = product.vitesse - elapsetime;
            }
        }
    }
    let sous = nbrProduit * product.revenu * product.quantite;
    context.world.score += sous;
    context.world.money += sous;
}


function updateScore(context) {
    let products = context.world.products;
    // Calcul de la date actuelle
    const today = Date.now();
    // Convertion de lastupdate, qui est en string vers un entier
    const lastup = parseInt(context.world.lastupdate);
    // Calcul du temps écoulé depuis la dernière mise à jour
    let elapsetime = today - lastup;
    context.world.lastupdate = today;
    for (let p of products) {
        condiCalcul(p, elapsetime, context);
    }
}