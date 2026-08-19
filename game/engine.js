/*
    ============================
    ENGINE.JS

    Главное ядро игры

    Здесь нет:
    - боя
    - эффектов
    - карт
    - ходов

    Только общие системные функции

    ============================
*/





window.Engine =

window.Engine || {};







function addCombatLog(
    state,
    text
){



    if(!state){

        return state;

    }






    return {


        ...state,



        combatLog:[


            ...(state.combatLog || []),



            text



        ]



    };


}







window.Engine.addCombatLog =

addCombatLog;








/*
    Совместимость
*/



window.addCombatLog =

addCombatLog;
