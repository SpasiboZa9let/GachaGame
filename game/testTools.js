/*
    ============================
    TEST TOOLS

    Быстрая постановка карт
    на поле для проверки боя
    ============================
*/



function createTestBoard(state){


    if(!TEST_MODE){

        return state;

    }



    const playerCards = [

        "medved",

        "razboynik",

        "lyagushka"

    ];



    const enemyCards = [

        "volk",

        "voin_s_kopem",

        "medved"

    ];




    return {


        ...state,



        player:{


            ...state.player,


            board:

                playerCards.map(

                    id => {


                        let unit =
                            createCardInstance(id);


                        unit.canAttack = true;


                        return unit;


                    }

                )


        },





        opponent:{


            ...state.opponent,


            board:

                enemyCards.map(

                    id => {


                        let unit =
                            createCardInstance(id);


                        unit.canAttack = true;


                        return unit;


                    }

                )


        },





        combatLog:[

            ...state.combatLog,

            "🧪 Тестовые существа выставлены."

        ]



    };


}





window.createTestBoard =
createTestBoard;
