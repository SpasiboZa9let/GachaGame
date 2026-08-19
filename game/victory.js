/*
    ============================
    VICTORY

    Проверка конца игры

    ============================
*/



window.Victory =
window.Victory || {};





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









window.Victory.checkGameOver =

checkGameOver;
