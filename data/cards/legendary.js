const LEGENDARY_CARDS = [

{
    id:"yollupukki",

    name:"Йоллупукки",

    rarity:"legendary",

    type:"creature",

    cost:10,

    health:8500,

    attack:2800,

    defense:2500,

    strength:8,

    faction:"prav",

    image:
    "./assets/cards/legendary/yollupukki.png",

    abilities:[

        {
            id:"gift_yollupukki",

            name:"Подарок Йоллупукки",

            type:"buff"

        }

    ]

},



{
    id:"zarnian",

    name:"Зарниань",

    rarity:"legendary",

    type:"creature",

    cost:9,

    health:4500,

    attack:1800,

    defense:2200,

    strength:60,

    faction:"prav",

    image:
    "./assets/cards/legendary/zarnian.png",

    abilities:[

        {
            id:"mother_blessing",

            name:"Материнское благословение",

            type:"heal"

        }

    ]

}

];


window.LEGENDARY_CARDS =
LEGENDARY_CARDS;
