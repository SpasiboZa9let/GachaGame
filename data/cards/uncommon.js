const UNCOMMON_CARDS = [

    {

        id: "kikimora",

        name: "Кикимора",

        rarity: "uncommon",

        type: "creature",

        cost: 2,

        health: 650,

        attack: 160,

        defense: 200,

        strength: 12,

        faction: "home",

        image:
            "./assets/cards/uncommon/kikimora.png",

        abilities: []

    },



    {

        id: "bobo",

        name: "Бобо",

        rarity: "uncommon",

        type: "creature",

        cost: 2,

        health: 550,

        attack: 200,

        defense: 160,

        strength: 4,

        faction: "home",

        image:
            "./assets/cards/uncommon/bobo.png",

        abilities: [

            {

                id: "night_fear",

                name: "Ночной страх",

                type: "debuff",

                description:
                    "40% шанс наложить страх при входе в бой."

            }

        ]

    },



    {

        id: "kuy_gorozh",

        name: "Куй-горож",

        rarity: "uncommon",

        type: "creature",

        cost: 3,

        health: 450,

        attack: 150,

        defense: 300,

        strength: 8,

        faction: "yav",

        image:
            "./assets/cards/uncommon/kuy_gorozh.png",

        abilities: [

            {

                id: "task_execution",

                name: "Выполнение задачи",

                type: "buff",

                description:
                    "50% шанс дать +1 силы союзникам в ряду."

            }

        ]

    }

];



window.UNCOMMON_CARDS =
    UNCOMMON_CARDS;
