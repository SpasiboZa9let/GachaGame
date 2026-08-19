/*
    ============================
    VICTORY

    Проверка конца игры
    ============================
*/



function checkGameOver(state){



    if(!state){

        return state;

    }







    if(
        state.player.hp <= 0
    ){



        return {


            ...state,


            gameOver:true,


            winner:"opponent",



            combatLog:[


                ...(state.combatLog || []),


                "Победил противник."

            ]



        };


    }








    if(
        state.opponent.hp <= 0
    ){



        return {


            ...state,


            gameOver:true,


            winner:"player",



            combatLog:[


                ...(state.combatLog || []),


                "Победа игрока."

            ]



        };


    }







    return state;


}








window.Victory =

window.Victory || {};



window.Victory.checkGameOver =

checkGameOver;








/*
    Совместимость
*/



window.checkGameOver =

checkGameOver;
