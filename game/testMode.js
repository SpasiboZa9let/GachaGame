/*
    ============================
    TEST MODE

    Тестовые колоды
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



window.TEST_MODE =
TEST_MODE;


window.getTestHand =
getTestHand;


window.getTestOpponentHand =
getTestOpponentHand;
