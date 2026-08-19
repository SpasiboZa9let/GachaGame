/*
============================

COMMON CARDS

Обычные карты

Поля:

faction
race
role

============================
*/


const COMMON_CARDS = [


{
id:"voin_s_kopem",

name:"Крестьянин с копьём",

rarity:"common",

type:"creature",

cost:1,

health:220,

attack:60,

defense:90,

strength:2,

faction:"yav",

race:"human",

role:"fighter",


effects:[

{
trigger:"afterAttack",

type:"buffAttack",

value:15
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
id:"voin_pikhotinets",

name:"Воин-пехотинец",

rarity:"common",

type:"creature",

cost:2,

health:750,

attack:240,

defense:220,

strength:4,

faction:"yav",

race:"human",

role:"soldier",


effects:[

{
trigger:"beforeAttack",

type:"buffAttack",

value:20
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
"Перед атакой получает дополнительную силу."
}

]

},






{
id:"luchnik",

name:"Лучник",

rarity:"common",

type:"creature",

cost:2,

health:420,

attack:260,

defense:100,

strength:3,

faction:"yav",

race:"human",

role:"ranged",


effects:[

{
trigger:"beforeAttack",

type:"buffAttack",

value:40
}

],


image:
"./assets/cards/common/luchnik.png",


abilities:[

{
id:"long_shot",

name:"Дальний выстрел",

type:"damage",

description:
"Сражается с врагами на расстоянии."
}

]

},






{
id:"znahar",

name:"Знахарь",

rarity:"common",

type:"creature",

cost:3,

health:900,

attack:180,

defense:250,

strength:4,

faction:"yav",

race:"human",

role:"support",


effects:[

{
trigger:"onDamage",

type:"heal",

value:80
}

],


image:
"./assets/cards/common/znahar.png",


abilities:[

{
id:"healing_herbs",

name:"Лечебные травы",

type:"heal",

description:
"Использует знания трав для восстановления сил."
}

]

},






{
id:"uchenik_volhva",

name:"Ученик волхва",

rarity:"common",

type:"creature",

cost:3,

health:700,

attack:220,

defense:180,

strength:5,

faction:"yav",

race:"human",

role:"magic",


effects:[

{
trigger:"afterAttack",

type:"buffAttack",

value:30
}

],


image:
"./assets/cards/common/uchenik_volhva.png",


abilities:[

{
id:"first_magic",

name:"Первые знания",

type:"magic",

description:
"Осваивает древние знания волхвов."
}

]

},






{
id:"razboynik",

name:"Разбойник",

rarity:"common",

type:"creature",

cost:1,

health:320,

attack:170,

defense:80,

strength:3,

faction:"forest",

race:"human",

role:"assassin",


effects:[

{
trigger:"afterAttack",

type:"buffAttack",

value:20
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
"После успешной атаки становится сильнее."
}

]

},






{
id:"volk",

name:"Волк",

rarity:"common",

type:"creature",

cost:2,

health:650,

attack:260,

defense:120,

strength:5,

faction:"forest",

race:"beast",

role:"aggressive",


effects:[

{
trigger:"afterAttack",

type:"buffAttack",

value:25
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
"Каждая атака делает зверя опаснее."
}

]

},






{
id:"medved",

name:"Медведь",

rarity:"common",

type:"creature",

cost:5,

health:2300,

attack:750,

defense:650,

strength:9,

faction:"forest",

race:"beast",

role:"tank",


effects:[

{
trigger:"afterAttack",

type:"rage",

value:150
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
"Чем меньше здоровья осталось у медведя, тем сильнее становится его ярость."
}

]

},






{
id:"auka",

name:"Аука",

rarity:"common",

type:"creature",

cost:1,

health:300,

attack:80,

defense:100,

strength:2,

faction:"forest",

race:"spirit",

role:"trickster",


effects:[

{
trigger:"onDamage",

type:"buffAttack",

value:30
}

],


image:
"./assets/cards/common/auka.png",


abilities:[

{
id:"forest_echo",

name:"Лесное эхо",

type:"passive",

description:
"Маленький лесной дух становится сильнее после опасности."
}

]

},






{
id:"lyagushka",

name:"Лягушка",

rarity:"common",

type:"creature",

cost:1,

health:250,

attack:80,

defense:120,

strength:2,

faction:"swamp",

race:"beast",

role:"survivor",


effects:[

{
trigger:"onDamage",

type:"heal",

value:80
}

],


image:
"./assets/cards/common/lyagushka.png",


abilities:[

{
id:"swamp_jump",

name:"Болотная живучесть",

type:"passive",

description:
"После получения урона восстанавливает здоровье."
}

]

},






{
id:"chetyre_myshi",

name:"Четыре мыши",

rarity:"common",

type:"creature",

cost:2,

health:500,

attack:120,

defense:100,

strength:3,

faction:"home",

race:"beast",

role:"swarm",


effects:[

{
trigger:"afterAttack",

type:"buffAttack",

value:10
}

],


image:
"./assets/cards/common/chetyre_myshi.png",


abilities:[

{
id:"mouse_swarm",

name:"Мышиная дружина",

type:"passive",

description:
"Количество превращает слабых существ в опасную стаю."
}

]

},






{
id:"babka_sheptunya",

name:"Бабка-шептуня",

rarity:"common",

type:"creature",

cost:3,

health:800,

attack:150,

defense:150,

strength:5,

faction:"nav",

race:"human",

role:"witch",


effects:[

{
trigger:"afterAttack",

type:"fear",

value:1
}

],


image:
"./assets/cards/common/babka_sheptunya.png",


abilities:[

{
id:"evil_whisper",

name:"Злой шёпот",

type:"fear",

description:
"Накладывает страх на врагов."
}

]

}



];


window.COMMON_CARDS =
COMMON_CARDS;
