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
            "logo": "../icones/lava.png",
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
                    "logo": "../icones/lava.png",
                    "seuil": 25,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": false
                },
                {
                    "name": "Deuxième palier",
                    "logo": "../icones/lava.png",
                    "seuil": 50,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "gain",
                    "unlocked": false
                },
            ],
        },
        {
            "id": 2,
            "name": "Dog toys",
            "logo": "../icones/dog_toys.png",
            "cout": 20,
            "croissance": 1.2,
            "revenu": 9,
            "vitesse": 3000,
            "quantite": 0,
            "timeleft": 0,
            "managerUnlocked": false,
            "paliers": [
                {
                    "name": "Premier palier",
                    "logo": "../icones/dog_toys.png",
                    "seuil": 25,
                    "idcible": 2,
                    "ratio": 2,
                    "typeratio": "gain",
                    "unlocked": false
                },
                {
                    "name": "Deuxième palier",
                    "logo": "../icones/dog_toys.png",
                    "seuil": 50,
                    "idcible": 2,
                    "ratio": 3,
                    "typeratio": "vitesse",
                    "unlocked": false
                }
            ]
        },
        {
            "id": 3,
            "name": "Scream and despair",
            "logo": "../icones/scream_and_despair.png",
            "cout": 100,
            "croissance": 1.5,
            "revenu": 45,
            "vitesse": 25000,
            "quantite": 0,
            "timeleft": 0,
            "managerUnlocked": false,
            "paliers": [
                {
                    "name": "Premier palier",
                    "logo": "../icones/scream_and_despair.png",
                    "seuil": 25,
                    "idcible": 3,
                    "ratio": 3,
                    "typeratio": "vitesse",
                    "unlocked": false
                },
                {
                    "name": "Deuxième palier",
                    "logo": "../icones/scream_and_despair.png",
                    "seuil": 50,
                    "idcible": 3,
                    "ratio": 2.5,
                    "typeratio": "vitesse",
                    "unlocked": false
                }
            ]
        },
        {
            "id": 4,
            "name": "Flesh and bone",
            "logo": "../icones/flesh_and_bone.png",
            "cout": 500,
            "croissance": 2.1,
            "revenu": 270,
            "vitesse": 100000,
            "quantite": 0,
            "timeleft": 0,
            "managerUnlocked": false,
            "paliers": [
                {
                    "name": "Premier palier",
                    "logo": "../icones/flesh_and_bone.png",
                    "seuil": 25,
                    "idcible": 4,
                    "ratio": 3.2,
                    "typeratio": "gain",
                    "unlocked": false
                },
                {
                    "name": "Deuxième palier",
                    "logo": "../icones/flesh_and_bone.png",
                    "seuil": 50,
                    "idcible": 4,
                    "ratio": 4,
                    "typeratio": "vitesse",
                    "unlocked": false
                }
            ]
        },
        {
            "id": 5,
            "name": "Torture machine",
            "logo": "../icones/torture_machine.png",
            "cout": 3000,
            "croissance": 2.8,
            "revenu": 1300,
            "vitesse": 4500000,
            "quantite": 0,
            "timeleft": 0,
            "managerUnlocked": false,
            "paliers": [
                {
                    "name": "Premier palier",
                    "logo": "../icones/torture_machine.png",
                    "seuil": 25,
                    "idcible": 5,
                    "ratio": 6,
                    "typeratio": "vitesse",
                    "unlocked": false
                },
                {
                    "name": "Deuxième palier",
                    "logo": "../icones/torture_machine.png",
                    "seuil": 50,
                    "idcible": 5,
                    "ratio": 4,
                    "typeratio": "gain",
                    "unlocked": false
                }
            ]
        },
        {
            "id": 6,
            "name": "Maths lessons",
            "logo": "../icones/maths_lessons.png",
            "cout": 10000,
            "croissance": 5,
            "revenu": 800,
            "vitesse": 12000000,
            "quantite": 0,
            "timeleft": 0,
            "managerUnlocked": false,
            "paliers": [
                {
                    "name": "Premier palier",
                    "logo": "../icones/maths_lessons.png",
                    "seuil": 25,
                    "idcible": 6,
                    "ratio": 5,
                    "typeratio": "gain",
                    "unlocked": false
                },
                {
                    "name": "Deuxième palier",
                    "logo": "../icones/maths_lessons.png",
                    "seuil": 50,
                    "idcible": 6,
                    "ratio": 8,
                    "typeratio": "vitesse",
                    "unlocked": false
                }
            ]
        }
    ],
    "allunlocks": [
        {
            "name": "Nom du premier unlock général",
            "logo": "../icones/satan.png",
            "seuil": 30,
            "idcible": 0,
            "ratio": 2,
            "typeratio": "gain",
            "unlocked": false
        },
    ],
    "upgrades": [
        {
            "name": "Nom du premier upgrade",
            "logo": "../icones/satan.png",
            "seuil": 1e3,
            "idcible": 1,
            "ratio": 3,
            "typeratio": "gain",
            "unlocked": false
        },
    ],
    "angelupgrades": [
        {
            "name": "Angel Sacrifice",
            "logo": "../icones/Demon.png",
            "seuil": 10,
            "idcible": 0,
            "ratio": 3,
            "typeratio": "gain",
            "unlocked": false
        },
    ],
    "managers": [
        {
            "name": "Freddy Krueger",
            "logo": "../icones/Freddy_Krueger.png",
            "seuil": 10,
            "idcible": 1,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": false
        },
        {
            "name": "Shô Tucker",
            "logo": "../icones/Shô_Tucker.png",
            "seuil": 10,
            "idcible": 2,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": false
        },
        {
            "name": "Pinhead",
            "logo": "../icones/Pinhead.png",
            "seuil": 10,
            "idcible": 3,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": false
        },
        {
            "name": "Hannibal Lecter",
            "logo": "../icones/Hannibal_Lecter.png",
            "seuil": 10,
            "idcible": 4,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": false
        },
        {
            "name": "John Kramer",
            "logo": "../icones/John_Kramer.png",
            "seuil": 10,
            "idcible": 5,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": false
        },
        {
            "name": "Gwenael Araignie",
            "logo": "../icones/Gwenael_Araignie.png",
            "seuil": 10,
            "idcible": 6,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": false
        }
    ]
}; 