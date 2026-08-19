/*
    ============================
    ENGINE.JS

    Главное ядро

    Остальные системы вынесены:

    state.js
    units.js
    cardPlay.js
    combat.js
    turns.js
    effects.js
    victory.js

    Здесь только общие функции
    ============================
*/





function addCombatLog(
    state,
    text
){


    return {


        ...state,


        combatLog:[


            ...(state.combatLog || []),


            text


        ]


    };


}





window.addCombatLog =
addCombatLog;
