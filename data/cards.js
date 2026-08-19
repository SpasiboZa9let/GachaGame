/*
    Главный сборщик карт.

    Все категории хранятся отдельно:

    legendary.js
    epic.js
    rare.js
    uncommon.js
    common.js

    Здесь они объединяются
    в один игровой пул.
*/


const CARDS = [

    ...LEGENDARY_CARDS,

    ...EPIC_CARDS,

    ...RARE_CARDS,

    ...UNCOMMON_CARDS,

    ...COMMON_CARDS

];



console.log(
    "Загружено карт:",
    CARDS.length
);



window.CARDS = CARDS;
