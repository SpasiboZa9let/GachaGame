const EPIC_CARDS = [

    {

        id: "baba_yaga",

        name: "Баба-Яга",

        rarity: "epic",

        type: "creature",

        cost: 7,

        health: 3500,

        attack: 1400,

        defense: 1050,

        strength: 12,

        faction: "nav",

        image:
            "./assets/cards/epic/baba_yaga.png",

        abilities: [

            {

                id: "raven_eye",

                name: "Глаз ворона",

                type: "control",

                description:
                    "Контролирует поле, может превращать врагов и перемещать существ."

            },

            {

                id: "ancestor_control",

                name: "Контроль предков",

                type: "control",

                description:
                    "Временно подчиняет волю врага."

            }

        ]

    },



    {

        id: "kaschey",

        name: "Кащей",

        rarity: "epic",

        type: "creature",

        cost: 8,

        health: 4200,

        attack: 1750,

        defense: 1250,

        strength: 16,

        faction: "nav",

        image:
            "./assets/cards/epic/kaschey.png",

        abilities: [

            {

                id: "immortal_life",

                name: "Несокрушимая жизнь",

                type: "revive",

                description:
                    "После гибели может возродиться."

            },

            {

                id: "dark_ritual",

                name: "Тёмный ритуал",

                type: "drain",

                description:
                    "Ослабляет врагов и восстанавливает здоровье."

            }

        ]

    },



    {

        id: "svyatogor",

        name: "Святогор",

        rarity: "epic",

        type: "creature",

        cost: 8,

        health: 4800,

        attack: 1800,

        defense: 1400,

        strength: 16,

        faction: "yav",

        image:
            "./assets/cards/epic/svyatogor.png",

        abilities: [

            {

                id: "ancient_strike",

                name: "Старейший удар",

                type: "damage",

                description:
                    "Мощная атака, игнорирующая часть защиты врага."

            },

            {

                id: "mountain_body",

                name: "Горный плот",

                type: "armor",

                description:
                    "Огромное здоровье и высокая защита."

            }

        ]

    },



    {

        id: "viy",

        name: "Вий",

        rarity: "epic",

        type: "creature",

        cost: 6,

        health: 3100,

        attack: 1250,

        defense: 980,

        strength: 11,

        faction: "nav",

        image:
            "./assets/cards/epic/viy.png",

        abilities: [

            {

                id: "terror_gaze",

                name: "Взгляд ужаса",

                type: "control",

                description:
                    "Враг не может атаковать до конца хода."

            },

            {

                id: "remove_seal",

                name: "Снять печать",

                type: "buff",

                description:
                    "Снимает эффекты и усиливает союзников."

            }

        ]

    },



    {

        id: "zmey_gorynych",

        name: "Змей Горыныч",

        rarity: "epic",

        type: "creature",

        cost: 9,

        health: 3800,

        attack: 1500,

        defense: 1100,

        strength: 14,

        faction: "nav",

        image:
            "./assets/cards/epic/zmey_gorynych.png",

        abilities: [

            {

                id: "fire_breath",

                name: "Огненное дыхание",

                type: "damage",

                description:
                    "Наносит урон всем вражеским существам."

            },

            {

                id: "tail_strike",

                name: "Хвостовой удар",

                type: "debuff",

                description:
                    "Оглушает врага и снижает защиту."

            }

        ]

    }

];



window.EPIC_CARDS =
    EPIC_CARDS;
