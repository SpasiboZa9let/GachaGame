/*
    ============================
    TURNS.JS

    Ходы игроков
    AI
    смена хода
    ============================
*/



function preparePlayerTurn(state) {


    let maxMana =
        state.player.maxMana;



    if (
        maxMana < 10
    ) {

        maxMana++;

    }



    const refreshedBoard =

        state.player.board.map(

            unit => ({

                ...unit,

                canAttack:true

            })

        );



    return {


        ...state,


        activePlayer:"player",



        player:{


            ...state.player,


            maxMana:maxMana,


            mana:maxMana,


            board:
                refreshedBoard


        }


    };


}







function prepareOpponentTurn(state) {


    let maxMana =
        state.opponent.maxMana;



    if (
        maxMana < 10
    ) {

        maxMana++;

    }



    const refreshedBoard =

        state.opponent.board.map(

            unit => ({

                ...unit,

                canAttack:true

            })

        );



    return {


        ...state,


        activePlayer:"opponent",



        opponent:{


            ...state.opponent,


            maxMana:maxMana,


            mana:maxMana,


            board:
                refreshedBoard


        }


    };


}









/*
    Поиск карты для AI
*/


function getRandomPlayableCard(state) {


    const opponent =
        state.opponent;



    if (
        !opponent ||
        !Array.isArray(opponent.hand)
    ) {

        return null;

    }




    const playable =


        opponent.hand

        .map(

            id =>

                window.getCardById(id)

        )

        .filter(

            card =>

                card &&

                card.cost <= opponent.mana &&

                opponent.board.length < 5

        );





    if (
        playable.length === 0
    ) {

        return null;

    }




    return playable[

        Math.floor(

            Math.random()
            *
            playable.length

        )

    ];

}










/*
    AI играет карты
*/


function opponentPlayCards(state) {


    let newState =
        state;



    while(true) {


        const card =

            getRandomPlayableCard(
                newState
            );



        if(!card) {

            break;

        }



        const before =
            newState;



        newState =

            window.playCard(

                newState,

                "opponent",

                card.id

            );



        if(
            before === newState
        ) {

            break;

        }


    }



    return newState;


}









/*
    Атака AI
*/


function opponentAttack(state) {


    let newState =
        state;



    while(true) {



        const attackers =


            newState.opponent.board

            .filter(

                unit =>

                    unit.canAttack === true

            );



        if(
            attackers.length === 0
        ) {

            break;

        }




        const attacker =


            attackers[

                Math.floor(

                    Math.random()
                    *
                    attackers.length

                )

            ];





        /*
            Есть существа игрока
        */


        if(
            newState.player.board.length > 0
        ) {



            const target =


                newState.player.board[

                    Math.floor(

                        Math.random()
                        *
                        newState.player.board.length

                    )

                ];



            newState =

                window.attackUnit(

                    newState,

                    "opponent",

                    attacker.instanceId,

                    target.instanceId

                );



        }



        /*
            Бьем героя
        */


        else {



            const damage =
                attacker.attack;



            newState = {


                ...newState,


                player:{


                    ...newState.player,


                    hp:

                        Math.max(

                            0,

                            newState.player.hp - damage

                        )


                },



                combatLog:[


                    ...(newState.combatLog || []),



                    "«"

                    +

                    (
                        window.getCardById(
                            attacker.cardId
                        )?.name
                        ||
                        "Существо"

                    )

                    +

                    "» атакует героя и наносит "

                    +

                    damage

                    +

                    " урона."


                ]

            };


        }





        /*
            Существо больше не атакует
        */


        newState = {


            ...newState,


            opponent:{


                ...newState.opponent,


                board:


                    newState.opponent.board.map(

                        unit =>

                            unit.instanceId === attacker.instanceId

                            ?

                            {

                                ...unit,

                                canAttack:false

                            }

                            :

                            unit


                    )


            }


        };





        newState =

            window.checkGameOver(
                newState
            );





        if(
            newState.gameOver
        ) {

            break;

        }


    }



    return newState;


}









/*
    Ход AI полностью
*/


function opponentTurn(state) {


    let newState =
        state;



    newState =

        prepareOpponentTurn(
            newState
        );




    newState = {


        ...newState,


        combatLog:[


            ...(newState.combatLog || []),


            "Ход Василисы."


        ]

    };





    newState =

        opponentPlayCards(
            newState
        );




    newState =

        opponentAttack(
            newState
        );





    return newState;


}









/*
    Завершение хода игрока
*/


function endTurn(state) {



    if(
        state.activePlayer !== "player"
    ) {

        return state;

    }




    let newState = {


        ...state,


        combatLog:[


            ...(state.combatLog || []),


            "Игрок завершает ход."


        ]

    };





    newState =

        opponentTurn(
            newState
        );





    if(
        newState.gameOver
    ) {

        return newState;

    }






    newState =

        preparePlayerTurn(
            newState
        );





    return {


        ...newState,


        turn:

            newState.turn + 1,


        activePlayer:"player"


    };


}









/*
    GLOBAL EXPORT
*/


window.preparePlayerTurn =
    preparePlayerTurn;


window.prepareOpponentTurn =
    prepareOpponentTurn;


window.getRandomPlayableCard =
    getRandomPlayableCard;


window.opponentPlayCards =
    opponentPlayCards;


window.opponentAttack =
    opponentAttack;


window.opponentTurn =
    opponentTurn;


window.endTurn =
    endTurn;
