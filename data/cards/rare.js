const RARE_CARDS = [

    {

        id: "lesopatru",

        name: "Лиса Патрикеевна",

        rarity: "rare",

        type: "creature",

        cost: 3,

        health: 120,

        attack: 40,

        defense: 30,

        strength: 1,

        faction: "forest",

        image:
            "./assets/cards/rare/lesopatru.png",

        abilities: [

            {

                id: "cunning_smile",

                name: "Хитрая улыбка",

                type: "passive",

                description:
                    "25% шанс уклониться от атаки."

            },

            {

                id: "forest_mistress",

                name: "Хозяйка леса",

                type: "heal",

                description:
                    "В начале хода восстанавливает здоровье союзникам, если нет врагов."

            }

        ]

    },



    {

        id: "alysya",

        name: "Олыся",

        rarity: "rare",

        type: "creature",

        cost: 5,

        health: 2500,

        attack: 900,

        defense: 1500,

        strength: 30,

        faction: "home",

        image:
            "./assets/cards/rare/alysya.png",

        abilities: [

            {

                id: "house_master",

                name: "Хозяин дома",

                type: "heal",

                description:
                    "Лечит союзников и усиливает защиту."

            },

            {

                id: "house_tricks",

                name: "Домовые проказы",

                type: "debuff",

                description:
                    "50% шанс наложить Запутанность."

            }

        ]

    },



    {

        id: "yagmort",

        name: "Яг-морт",

        rarity: "rare",

        type: "creature",

        cost: 4,

        health: 1800,

        attack: 750,

        defense: 500,

        strength: 20,

        faction: "forest",

        image:
            "./assets/cards/rare/yagmort.png",

        abilities: [

            {

                id: "forest_creature",

                name: "Лесное существо",

                type: "passive",

                description:
                    "В лесном окружении получает +20% атаки."

            },

            {

                id: "taiga_call",

                name: "Зов тайги",

                type: "debuff",

                description:
                    "30% шанс вызвать страх и снизить атаку цели."

            }

        ]

    },



    {

        id: "rusalka",

        name: "Русалка",

        rarity: "rare",

        type: "creature",

        cost: 3,

        health: 1200,

        attack: 450,

        defense: 300,

        strength: 15,

        faction: "water",

        image:
            "./assets/cards/rare/rusalka.png",

        abilities: []

    }

];



window.RARE_CARDS =
    RARE_CARDS;
