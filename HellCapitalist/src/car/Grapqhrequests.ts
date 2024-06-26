import {gql} from "@urql/core";

export
const GET_WORLD = gql`
    query getWorld {
        getWorld {
            name
            logo
            money
            score
            totalangels
            activeangels
            angelbonus
            lastupdate
            products {
                id
                name
                logo
                cout
                croissance
                revenu
                vitesse
                quantite
                timeleft
                managerUnlocked
                paliers {
                    name
                    logo
                    seuil
                    idcible
                    ratio
                    typeratio
                    unlocked
                }
            }
            allunlocks {
                name
                logo
                seuil
                idcible
                ratio
                typeratio
                unlocked
            }
            upgrades {
                name
                logo
                seuil
                idcible
                ratio
                typeratio
                unlocked
            }
            angelupgrades {
                name
                logo
                seuil
                idcible
                ratio
                typeratio
                unlocked
            }
            managers {
                name
                logo
                seuil
                idcible
                ratio
                typeratio
                unlocked
            }
        }
    }
`;

export const LANCER_PRODUCTION = gql`
    mutation lancerProductionProduit($id: Int!) {
        lancerProductionProduit(id: $id) {
            id
        }
    }
`;

export const ACHETER_QT = gql`
    mutation acheterQtProduit($id: Int!, $quantite: Int!) {
        acheterQtProduit(id: $id, quantite: $quantite) {
            id, quantite
        }
    }
`;

export const ENGAGER = gql`
    mutation engagerManager($name: String!) {
        engagerManager(name: $name) {
            name
        }
    }
`;

export const UPGRADER = gql`
    mutation acheterCashUpgrade($name: String!) {
        acheterCashUpgrade(name: $name) {
            name
        }
    }
`;

export const RESET = gql`
    mutation resetWorld {
        resetWorld {
            name
            logo
            money
            score
            totalangels
            activeangels
            angelbonus
            lastupdate
            products {
                id
                name
                logo
                cout
                croissance
                revenu
                vitesse
                quantite
                timeleft
                managerUnlocked
                paliers {
                    name
                    logo
                    seuil
                    idcible
                    ratio
                    typeratio
                    unlocked
                }
            }
            allunlocks {
                name
                logo
                seuil
                idcible
                ratio
                typeratio
                unlocked
            }
            upgrades {
                name
                logo
                seuil
                idcible
                ratio
                typeratio
                unlocked
            }
            angelupgrades {
                name
                logo
                seuil
                idcible
                ratio
                typeratio
                unlocked
            }
            managers {
                name
                logo
                seuil
                idcible
                ratio
                typeratio
                unlocked
            }
        }
    }
`;

export const ANGELER = gql`
    mutation acheterAngelUpgrade($name: String!) {
        acheterAngelUpgrade(name: $name) {
            name
        }
    }
`;