const CARDS = [

   {
    id: "shaman",

    name: "Шаман",

    rarity: "uncommon",

    faction: "nav",

    cost: 3,

    health: 1850,

    attack: 740,

    defense: 560,

    strength: 6,

    image: "./assets/cards/shaman.png",

    abilities: [

        {
            id: "spirit_call",

            name: "Призыв духов",

            type: "buff"

        }

    ]

}
    {
        id: "baba_yaga",
        name: "Баба-Яга",
        rarity: "epic",
        faction: "Навь",
        cost: 6,
        health: 3500,
        attack: 1400,
        defense: 1050,
        strength: 12,
        image: "./assets/cards/epic/baba_yaga.png",
        abilities: [
            "Глаз ворона",
            "Контроль предков"
        ],
        description: "Таинственная хозяйка лесной глуши, владеющая древней магией."
    },

    {
        id: "chernobog",
        name: "Чернобог",
        rarity: "legendary",
        faction: "Навь",
        cost: 9,
        health: 4800,
        attack: 1400,
        defense: 1800,
        strength: 16,
        image: "./assets/cards/legendary/chernobog.png",
        abilities: [
            "Воля хаоса",
            "Сумрачная магия"
        ],
        description: "Древнее воплощение тьмы и хаоса."
    },

    {
        id: "frog",
        name: "Лягушка",
        rarity: "common",
        faction: "Навь",
        cost: 2,
        health: 210,
        attack: 100,
        defense: 90,
        strength: 2,
        image: "./assets/cards/common/frog.png",
        abilities: [
            "Болотная прыгучесть",
            "Боевой клич"
        ],
        description: "Небольшое болотное создание, способное неожиданно броситься в бой."
    },

    {
        id: "ilya_muromets",
        name: "Илья Муромец",
        rarity: "legendary",
        faction: "Явь",
        cost: 8,
        health: 4800,
        attack: 1800,
        defense: 1400,
        strength: 16,
        image: "./assets/cards/legendary/ilya_muromets.png",
        abilities: [
            "Исцеление от урона",
            "Базовый урон"
        ],
        description: "Великий русский богатырь, защитник земли русской."
    },

    {
        id: "koschei",
        name: "Кощей Бессмертный",
        rarity: "epic",
        faction: "Навь",
        cost: 7,
        health: 4200,
        attack: 1750,
        defense: 1250,
        strength: 16,
        image: "./assets/cards/epic/koschei.png",
        abilities: [
            "Несокрушимая жизнь",
            "Тёмный ритуал"
        ],
        description: "Бессмертный владыка тёмных сил, чья жизнь скрыта от мира."
    },

    {
        id: "mara",
        name: "Мара",
        rarity: "legendary",
        faction: "Навь",
        cost: 8,
        health: 4500,
        attack: 1700,
        defense: 1350,
        strength: 15,
        image: "./assets/cards/legendary/mara.png",
        abilities: [
            "Полотно теней",
            "Воля судьбы"
        ],
        description: "Древняя богиня тьмы, сна и неизбежной судьбы."
    },

    {
        id: "rusalka",
        name: "Русалка",
        rarity: "rare",
        faction: "Навь",
        cost: 4,
        health: 1200,
        attack: 450,
        defense: 300,
        strength: 15,
        image: "./assets/cards/rare/rusalka.png",
        abilities: [],
        description: "Чистое и непорочное создание, хранительница древних тайн, скрывающаяся в водах."
    },

    {
        id: "svarog",
        name: "Сварог",
        rarity: "legendary",
        faction: "Правь",
        cost: 8,
        health: 4200,
        attack: 1600,
        defense: 1300,
        strength: 14,
        image: "./assets/cards/legendary/svarog.png",
        abilities: [
            "Сварожье пламя",
            "Небесная ковка"
        ],
        description: "Великий бог-кузнец, повелитель небесного огня."
    },

    {
        id: "svetogor",
        name: "Светогор",
        rarity: "epic",
        faction: "Правь",
        cost: 8,
        health: 4800,
        attack: 1800,
        defense: 1400,
        strength: 16,
        image: "./assets/cards/epic/svetogor.png",
        abilities: [],
        description: "Древний богатырь исполинской силы."
    },

    {
        id: "viy",
        name: "Вий",
        rarity: "epic",
        faction: "Навь",
        cost: 6,
        health: 3100,
        attack: 1250,
        defense: 980,
        strength: 11,
        image: "./assets/cards/epic/viy.png",
        abilities: [
            "Взгляд ужаса",
            "Снятие печатей"
        ],
        description: "Древнее чудовище, чей взгляд способен повергнуть врага в ужас."
    },

    {
        id: "voin_pikhotinets",
        name: "Пехотинец",
        rarity: "common",
        faction: "Явь",
        cost: 1,
        health: 90,
        attack: 20,
        defense: 40,
        strength: 1,
        image: "./assets/cards/common/voin_pikhotinets.png",
        abilities: [
            "Стройность",
            "Стойкость"
        ],
        description: "Обычный воин, полагающийся на строй и дисциплину."
    },

    {
        id: "volk",
        name: "Волк",
        rarity: "common",
        faction: "Навь",
        cost: 3,
        health: 600,
        attack: 250,
        defense: 150,
        strength: 8,
        image: "./assets/cards/common/volk.png",
        abilities: [],
        description: "Дикий хищник, быстрый и опасный в ближнем бою."
    },

    {
        id: "zmey_gorynych",
        name: "Змей Горыныч",
        rarity: "epic",
        faction: "Навь",
        cost: 7,
        health: 3800,
        attack: 1500,
        defense: 1100,
        strength: 14,
        image: "./assets/cards/epic/zmey_gorynych.png",
        abilities: [
            "Огненное дыхание",
            "Хвостовой удар"
        ],
        description: "Трёхглавое чудовище, способное обрушить на врага огонь и сокрушительный удар."
    }

];

window.CARDS = CARDS;
