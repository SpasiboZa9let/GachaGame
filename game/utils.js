/*
    ============================
    UTILS.JS

    Вспомогательные функции

    Лог боя
    ============================
*/


window.Utils =
window.Utils || {};





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







window.Utils.addCombatLog =

addCombatLog;
