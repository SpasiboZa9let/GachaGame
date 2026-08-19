/*
    ============================
    VICTORY

    Проверка конца игры
    ============================
*/


function checkGameOver(state){



    if(state.player.hp <= 0){


        return {


            ...state,


            gameOver:true,


            winner:"opponent"


        };


    }





    if(state.opponent.hp <= 0){


        return {


            ...state,


            gameOver:true,


            winner:"player"


        };


    }




    return state;


}




window.checkGameOver =
checkGameOver;
