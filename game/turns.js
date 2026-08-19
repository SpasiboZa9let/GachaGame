function opponentAttack(state) {

    let newState = state;


    while (true) {


        const attackers =
            newState.opponent.board
                .filter(
                    unit =>
                        unit.canAttack === true
                );


        if (
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
            Если есть существа игрока,
            атакуем их.
        */

        if (
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
            Если существ нет —
            бьём героя напрямую.
        */

        else {


            const damage =
                attacker.attack;



            newState = {

                ...newState,


                player: {

                    ...newState.player,

                    hp:
                        newState.player.hp
                        -
                        damage

                },


                combatLog: [

                    ...(newState.combatLog || []),


                    "«" +
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
            После атаки существо
            больше не атакует.
        */


        newState = {


            ...newState,


            opponent: {

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



        if (
            newState.gameOver
        ) {

            break;

        }

    }



    return newState;

}
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
