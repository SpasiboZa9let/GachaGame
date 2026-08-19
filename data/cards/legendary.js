const LEGENDARY_CARDS = [

    {

        id: "yollupukki",

        name: "Йоллупукки",

        rarity: "legendary",

        type: "creature",

        cost: 10,

        health: 8500,

        attack: 2800,

        defense: 2500,

        strength: 8,

        faction: "prav",

        image:
            "./assets/cards/legendary/yollupukki.png",

        abilities: [

            {

                id: "gift_yollupukki",

                name: "Подарок Йоллупукки",

                type: "buff",

                description:
                    "Даёт союзному существу случайный бонус."

            }

        ]

    },



    {

        id: "zarnian",

        name: "Зарниань",

        rarity: "legendary",

        type: "creature",

        cost: 9,

        health: 4500,

        attack: 1800,

        defense: 2200,

        strength: 60,

        faction: "prav",

        image:
            "./assets/cards/legendary/zarnian.png",

        abilities: [

            {

                id: "mother_blessing",

                name: "Материнское благословение",

                type: "heal",

                description:
                    "В начале хода лечит союзников и накладывает защиту."

            }

        ]

    },



    {

        id: "chernobog",

        name: "Чернобог",

        rarity: "legendary",

        type: "creature",

        cost: 9,

        health: 4800,

        attack: 1800,

        defense: 1400,

        strength: 16,

        faction: "nav",

        image:
            "./assets/cards/legendary/chernobog.png",

        abilities: [

            {

                id: "field_distortion",

                name: "Искажение поля",

                type: "chaos",

                description:
                    "Создаёт случайный хаос-эффект."

            }

        ]

    },



    {

        id: "leshy",

        name: "Леший",

        rarity: "legendary",

        type: "creature",

        cost: 8,

        health: 4000,

        attack: 1600,

        defense: 1200,

        strength: 15,

        faction: "forest",

        image:
            "./assets/cards/legendary/leshy.png",

        abilities: [

            {

                id: "forest_roots",

                name: "Корни леса",

                type: "control",

                description:
                    "Замедляет и ограничивает врагов."

            }

        ]

    },



    {

        id: "ilya_muromets",

        name: "Илья Муромец",

        rarity: "legendary",

        type: "creature",

        cost: 8,

        health: 4800,

        attack: 1800,

        defense: 1400,

        strength: 16,

        faction: "yav",

        image:
            "./assets/cards/legendary/ilya_muromets.png",

        abilities: [

            {

                id: "rage_of_hero",

                name: "Усиление урона",

                type: "buff",

                description:
                    "Полученный урон увеличивает атаку."

            }

        ]

    },



    {

        id: "mara",

        name: "Мара",

        rarity: "legendary",

        type: "creature",

        cost: 8,

        health: 4500,

        attack: 1700,

        defense: 1350,

        strength: 15,

        faction: "nav",

        image:
            "./assets/cards/legendary/mara.png",

        abilities: [

            {

                id: "shadow_canvas",

                name: "Полотно теней",

                type: "debuff",

                description:
                    "Ослабляет врагов и создаёт хаос."

            }

        ]

    },



    {

        id: "svarog",

        name: "Сварог",

        rarity: "legendary",

        type: "creature",

        cost: 9,

        health: 4200,

        attack: 1600,

        defense: 1300,

        strength: 14,

        faction: "prav",

        image:
            "./assets/cards/legendary/svarog.png",

        abilities: [

            {

                id: "svarog_fire",

                name: "Сварожье пламя",

                type: "damage",

                description:
                    "В начале хода наносит урон врагам и лечит союзника."

            }

        ]

    }

];



window.LEGENDARY_CARDS =
    LEGENDARY_CARDS;
