const LEGENDARY_CARDS = [

    {
        id: "yollupukki",

        name: "Йоллупукки",

        rarity: "legendary",

        cost: 8,

        health: 8500,

        attack: 2800,

        defense: 2500,

        strength: 8,

        faction: "prav",

        abilities: [
            "yollupukki_gift"
        ],

        description:
            "Рождественский козёл. Может даровать союзникам подарки.",

        image:
            "./assets/cards/yollupukki.png"
    },


    {
        id: "zarnian",

        name: "Зарниань",

        rarity: "legendary",

        cost: 7,

        health: 4500,

        attack: 1800,

        defense: 2200,

        strength: 60,

        faction: "prav",

        abilities: [
            "mother_blessing"
        ],

        description:
            "Золотая Мать. Усиливается рядом с богами.",

        image:
            "./assets/cards/zarnian.png"
    },


    {
        id: "chernobog",

        name: "Чернобог",

        rarity: "legendary",

        cost: 8,

        health: 4800,

        attack: 1800,

        defense: 1400,

        strength: 16,

        faction: "nav",

        abilities: [
            "chaos_field"
        ],

        description:
            "Повелитель тьмы. Его присутствие искажает поле.",

        image:
            "./assets/cards/chernobog.png"
    },


    {
        id: "leshy",

        name: "Леший",

        rarity: "legendary",

        cost: 6,

        health: 4000,

        attack: 1600,

        defense: 1200,

        strength: 15,

        faction: "forest",

        abilities: [
            "forest_roots"
        ],

        description:
            "Хозяин леса, сковывающий врагов корнями.",

        image:
            "./assets/cards/leshy.png"
    },


    {
        id: "ilya_muromets",

        name: "Илья Муромец",

        rarity: "legendary",

        cost: 8,

        health: 4800,

        attack: 1800,

        defense: 1400,

        strength: 16,

        faction: "yav",

        abilities: [
            "damage_growth"
        ],

        description:
            "Богатырь, становящийся сильнее от полученных ударов.",

        image:
            "./assets/cards/ilya_muromets.png"
    },


    {
        id: "mara",

        name: "Мара",

        rarity: "legendary",

        cost: 7,

        health: 4500,

        attack: 1700,

        defense: 1350,

        strength: 15,

        faction: "nav",

        abilities: [
            "shadow_canvas"
        ],

        description:
            "Хозяйка кошмаров и хаоса.",

        image:
            "./assets/cards/mara.png"
    },


    {
        id: "svarog",

        name: "Сварог",

        rarity: "legendary",

        cost: 8,

        health: 4200,

        attack: 1600,

        defense: 1300,

        strength: 14,

        faction: "prav",

        abilities: [
            "svarog_flame"
        ],

        description:
            "Бог небесного огня и кузнечного пламени.",

        image:
            "./assets/cards/svarog.png"
    }

];


window.LEGENDARY_CARDS =
    LEGENDARY_CARDS;
