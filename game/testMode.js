/*
    ============================
    TEST MODE

    Режим проверки карт

    Позволяет:
    - выдавать карты
    - менять стартовую руку
    - тестировать эффекты
    ============================
*/


const TEST_MODE = true;



function getTestHand(){


    if(!TEST_MODE){

        return null;

    }



    return [

        "medved",

        "razboynik",

        "kort_aika",

        "voin_pikhotinets",

        "lyagushka"

    ];


}







function getTestOpponentHand(){


    if(!TEST_MODE){

        return null;

    }



    return [

        "volk",

        "voin_s_kopem",

        "medved"

    ];


}






function applyTestMode(state){


    if(!TEST_MODE){

        return state;

    }





    const playerHand =
        getTestHand();



    const opponentHand =
        getTestOpponentHand();





    return {


        ...state,



        player:{


            ...state.player,


            hand:

                playerHand

        },





        opponent:{


            ...state.opponent,


            hand:

                opponentHand

        }


    };


}







window.TEST_MODE =
TEST_MODE;


window.applyTestMode =
applyTestMode;
