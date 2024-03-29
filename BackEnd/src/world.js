module.exports = {
    "name": "Hell Capitalist",
    "logo": "icones/logomonde.png",
    "money": 0,
    "score": 0,
    "totalangels": 0,
    "activeangels": 0,
    "angelbonus": 2,
    "lastupdate": 0,
    "products": [
        {
            "id": 1,
            "name": "Lava",
            "logo": "../Public/Icones/lava.png",
            "cout": 4,
            "croissance": 1.07,
            "revenu": 1,
            "vitesse": 500,
            "quantite": 1,
            "timeleft": 0,
            "managerUnlocked": false,
            "paliers": [
                {
                    "name": "Premier palier",
                    "logo": "../Public/Icones/lava.png",
                    "seuil": 25,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": "false"
                },
                {
                    "name": "Deuxième palier",
                    "logo": "../Public/Icones/lava.png",
                    "seuil": 50,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "gain",
                    "unlocked": "false"
                },
            ],
        },
        {
            "id": 2,
            "name": "Dog toys",
            "logo": "../Public/Icones/dog_toys.png",
            "cout": 16,
            "croissance": 1.2,
            "revenu": 7,
            "vitesse": 3000,
            "quantite": 1,
            "timeleft": 0,
            "managerUnlocked": false,
            "paliers": [
                {
                    "name": "Premier palier",
                    "logo": "../Public/Icones/dog_toys.png",
                    "seuil": 25,
                    "idcible": 2,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": "false"
                },
                {
                    "name": "Deuxième palier",
                    "logo": "../Public/Icones/dog_toys.png",
                    "seuil": 50,
                    "idcible": 2,
                    "ratio": 2,
                    "typeratio": "gain",
                    "unlocked": "false"
                }
            ]
        }
    ],
    "allunlocks": [
        {
            "name": "Nom du premier unlock général",
            "logo": "../Public/Icones/satan.png",
            "seuil": 30,
            "idcible": 0,
            "ratio": 2,
            "typeratio": "gain",
            "unlocked": "false"
        },
    ],
    "upgrades": [
        {
            "name": "Nom du premier upgrade",
            "logo": "../Public/Icones/satan.png",
            "seuil": 1e3,
            "idcible": 1,
            "ratio": 3,
            "typeratio": "gain",
            "unlocked": "false"
        },
    ],
    "angelupgrades": [
        {
            "name": "Angel Sacrifice",
            "logo": "../Public/Icones/satan.png",
            "seuil": 10,
            "idcible": 0,
            "ratio": 3,
            "typeratio": "gain",
            "unlocked": "false"
        },
    ],
    "managers": [
        {
            "name": "Freddy Krueger",
            "logo": "../Public/Icones/lava.png",
            "seuil": 10,
            "idcible": 1,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": "false"
        },
    ]
}; 