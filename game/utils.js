/*
    ============================
    UTILS.JS

    Вспомогательные функции

    Лог боя
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
