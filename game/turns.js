/*
    ============================
    TURNS.JS

    Ходы игроков
    AI
    смена хода

    Изменения:
    - защита AI от бесконечных циклов
    - проверка статусов перед атакой
    - лог действий AI
    - сохранена совместимость window.*
    ============================
*/





function preparePlayerTurn(state){


    if(
        !state ||
        !state.player
    ){

        return state;

    }





    let maxMana =

        state.player.maxMana || 0;




    if(maxMana < 10){

        maxMana++;

    }







    return {


        ...state,


        activePlayer:"player",



        player:{


            ...state.player,



            maxMana:maxMana,


            mana:maxMana,



            board:


                state.player.board.map(

                    unit => ({


                        ...unit,


                        canAttack:

                            !window.Effects?.hasStatus

                            ?

                            true

                            :

                            !window.Effects.hasStatus(
                                unit,
                                "stun"
                            )
                            &&
                            !window.Effects.hasStatus(
                                unit,
                                "fear"
                            )


                    })


                )


        }


    };


}









function prepareOpponentTurn(state){


    if(
        !state ||
        !state.opponent
    ){

        return state;

    }





    let maxMana =

        state.opponent.maxMana || 0;




    if(maxMana < 10){

        maxMana++;

    }







    return {


        ...state,


        activePlayer:"opponent",



        opponent:{


            ...state.opponent,



            maxMana:maxMana,


            mana:maxMana,



            board:


                state.opponent.board.map(

                    unit => ({


                        ...unit,


                        canAttack:

                            !window.Effects?.hasStatus

                            ?

                            true

                            :

                            !window.Effects.hasStatus(
                                unit,
                                "stun"
                            )
                            &&
                            !window.Effects.hasStatus(
                                unit,
                                "fear"
                            )


                    })


                )


        }


    };


}









function getRandomPlayableCard(state){



    const opponent =

        state?.opponent;





    if(
        !opponent ||
        !Array.isArray(opponent.hand)
    ){

        return null;

    }







    const getCard =

        window.Cards?.getCardById

        ||

        window.getCardById;







    const playable =


        opponent.hand

        .map(

            id => getCard(id)

        )

        .filter(

            card =>

                card &&

                card.cost <= opponent.mana &&

                opponent.board.length < 5


        );







    if(playable.length === 0){

        return null;

    }







    return playable[

        Math.floor(

            Math.random() *

            playable.length

        )

    ];


}









function opponentPlayCards(state){


    let newState = state;



    let actions = 0;



    while(actions < 10){


        actions++;




        const card =

            getRandomPlayableCard(
                newState
            );




        if(!card){

            break;

        }





        const before =

            newState;







        newState =

            window.CardPlay?.playCard

            ?

            window.CardPlay.playCard(

                newState,

                "opponent",

                card.id

            )

            :

            window.playCard(

                newState,

                "opponent",

                card.id

            );







        if(before === newState){

            break;

        }






        newState.combatLog.push(

            "Василиса сыграла карту: " +

            card.name

        );


    }




    return newState;


}









function opponentAttack(state){


    let newState = state;



    let attacks = 0;





    while(attacks < 10){


        attacks++;





        const attackers =


            newState.opponent.board

            .filter(

                unit =>

                    unit.canAttack === true

            );







        if(
            attackers.length === 0
        ){

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







        if(
            newState.player.board.length > 0
        ){



            const target =


                newState.player.board[

                    Math.floor(

                        Math.random()

                        *

                        newState.player.board.length

                    )

                ];







            newState =


                window.Combat.attackUnit(

                    newState,

                    "opponent",

                    attacker.instanceId,

                    target.instanceId

                );



        }



        else {



            const damage =

                attacker.stats?.attack || 0;







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



                    attacker.name +

                    " атакует героя и наносит " +

                    damage +

                    " урона."


                ]



            };



        }







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

            window.Victory?.checkGameOver

            ?

            window.Victory.checkGameOver(newState)

            :

            window.checkGameOver(newState);







        if(
            newState.gameOver
        ){

            break;

        }



    }




    return newState;


}









function opponentTurn(state){



    let newState = state;







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









function endTurn(state){



    if(
        !state ||

        state.activePlayer !== "player"

    ){

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
    ){

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









window.Turns =

window.Turns || {};




window.Turns.preparePlayerTurn =
preparePlayerTurn;


window.Turns.prepareOpponentTurn =
prepareOpponentTurn;


window.Turns.getRandomPlayableCard =
getRandomPlayableCard;


window.Turns.opponentPlayCards =
opponentPlayCards;


window.Turns.opponentAttack =
opponentAttack;


window.Turns.opponentTurn =
opponentTurn;


window.Turns.endTurn =
endTurn;




/*
    Совместимость
*/


window.endTurn =
endTurn;
