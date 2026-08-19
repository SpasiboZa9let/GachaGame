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



    let newState = {


        ...state,


        activePlayer:"player",


        player: {


            ...state.player,


            maxMana:maxMana,


            mana:maxMana,


            board:refreshedBoard


        }


    };



    /*
        Добор карты
    */

    if (
        window.drawCard
    ) {

        newState =
            window.drawCard(
                newState,
                "player"
            );

    }



    return newState;

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


            board:refreshedBoard


        }


    };


}








/*
    Получить случайную карту,
    которую AI может сыграть.
*/


function getRandomPlayableCard(state) {


    const opponent =
        state.opponent;



    if (
        !opponent ||
        !Array.isArray(
            opponent.hand
        )
    ) {

        return null;

    }



    const cards =


        opponent.hand

        .map(

            id =>
                window.getCardById(id)

        )

        .filter(

            card => {


                if (!card) {

                    return false;

                }



                if (
                    card.cost >
                    opponent.mana
                ) {

                    return false;

                }



                if (
                    opponent.board.length >= 5
                ) {

                    return false;

                }



                return true;


            }

        );





    if (
        cards.length === 0
    ) {

        return null;

    }




    return cards[

        Math.floor(
            Math.random()
            *
            cards.length
        )

    ];

}









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





        const previous =
            newState;




        newState =

            window.playCard(

                newState,

                "opponent",

                card.id

            );





        if(
            previous === newState
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



            const targets =
                newState.player.board;




            const target =


                targets[

                    Math.floor(

                        Math.random()

                        *

                        targets.length

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
            Нет существ —
            удар героя
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

                            newState.player.hp
                            -
                            damage

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
            После атаки отключаем
        */


        newState = {


            ...newState,


            opponent:{


                ...newState.opponent,


                board:


                    newState.opponent.board.map(


                        unit =>


                            unit.instanceId ===
                            attacker.instanceId


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
