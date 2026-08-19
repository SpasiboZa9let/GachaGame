const COMMON_CARDS = [


{
id:"medved",

name:"Медведь",

rarity:"common",

type:"creature",

cost:5,

health:1600,

attack:650,

defense:550,

strength:7,

faction:"forest",


effects:[

{
trigger:"afterAttack",

type:"rage",

value:5
}

],


image:
"./assets/cards/common/medved.png",


abilities:[

{
id:"den_of_rage",

name:"Ярость берлоги",

type:"passive",

description:
"Получает +5 атаки за каждые потерянные 20% здоровья."
}

]

},





{
id:"razboynik",

name:"Разбойник",

rarity:"common",

type:"creature",

cost:1,

health:350,

attack:150,

defense:100,

strength:2,

faction:"forest",


effects:[

{
trigger:"afterAttack",

type:"buffAttack",

value:10
}

],


image:
"./assets/cards/common/razboynik.png",


abilities:[

{
id:"forest_thief",

name:"Лесной вор",

type:"passive",

description:
"После успешной атаки получает +10 атаки."
}

]

},






{
id:"kort_aika",

name:"Корт-айка",

rarity:"common",

type:"creature",

cost:4,

health:1400,

attack:600,

defense:500,

strength:6,

faction:"forest",


effects:[

{
trigger:"onDamage",

type:"buffAttack",

value:25
}

],


image:
"./assets/cards/common/kort_aika.png",


abilities:[

{
id:"row_defense",

name:"Защита ряда",

type:"passive",

description:
"После получения урона становится сильнее."
}

]

},








{
id:"voin_pikhotinets",

name:"Воин-пехотинец",

rarity:"common",

type:"creature",

cost:2,

health:650,

attack:210,

defense:180,

strength:3,

faction:"yav",


effects:[

{
trigger:"beforeAttack",

type:"buffAttack",

value:10
}

],


image:
"./assets/cards/common/voin_pikhotinets.png",


abilities:[

{
id:"wooden_shield",

name:"Деревянный щит",

type:"armor",

description:
"Перед атакой получает +10 атаки."
}

]

},








{
id:"lyagushka",

name:"Лягушка",

rarity:"common",

type:"creature",

cost:1,

health:210,

attack:100,

defense:90,

strength:2,

faction:"swamp",


effects:[

{
trigger:"onDamage",

type:"heal",

value:50
}

],


image:
"./assets/cards/common/lyagushka.png",


abilities:[

{
id:"swamp_jump",

name:"Болотная прыгучесть",

type:"passive",

description:
"После получения урона восстанавливает 50 здоровья."
}

]

},








{
id:"voin_s_kopem",

name:"Крестьянин с копьём",

rarity:"common",

type:"creature",

cost:1,

health:90,

attack:20,

defense:40,

strength:1,

faction:"yav",


effects:[

{
trigger:"afterAttack",

type:"buffAttack",

value:5
}

],


image:
"./assets/cards/common/voin_s_kopem.png",


abilities:[

{
id:"spear_training",

name:"Тренировка копья",

type:"passive",

description:
"Каждая атака делает его сильнее."
}

]

},








{
id:"volk",

name:"Волк",

rarity:"common",

type:"creature",

cost:2,

health:600,

attack:250,

defense:150,

strength:8,

faction:"forest",


effects:[

{
trigger:"afterAttack",

type:"buffAttack",

value:20
}

],


image:
"./assets/cards/common/volk.png",


abilities:[

{
id:"predator",

name:"Хищник",

type:"passive",

description:
"После атаки получает +20 атаки."
}

]

}


];



window.COMMON_CARDS =
COMMON_CARDS;
