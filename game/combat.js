/*
    Боевая система
*/


function canUnitAttack(unit) {

    if(!unit){
        return false;
    }


    return unit.canAttack === true;

}




function attackUnit(
    state,
    playerId,
    attackerId,
    targetId
){


    const player =
        state[playerId];


    const opponentId =
        playerId==="player"
        ?
        "opponent"
        :
        "player";


    const opponent =
        state[opponentId];



    const attacker =
        player.board.find(
            unit =>
                unit.instanceId===attackerId
        );


    if(!attacker){
        return state;
    }




    /*
        Атака по герою
    */

    if(targetId==="hero"){


        let newState={

            ...state,


            [opponentId]:{


                ...opponent,


                hp:
                    opponent.hp -
                    attacker.attack


            },


            combatLog:[

                ...state.combatLog,


                "«"+
                (
                    getCardById(
                        attacker.cardId
                    )?.name
                    ||
                    "Существо"
                )
                +
                "» атакует героя и наносит "
                +
                attacker.attack
                +
                " урона."

            ]

        };



        newState.player =
            playerId==="player"
            ?
            {

                ...newState.player,

                board:
                newState.player.board.map(
                    unit =>
                    unit.instanceId===attackerId
                    ?
                    {
                        ...unit,
                        canAttack:false
                    }
                    :
                    unit
                )

            }
            :
            newState.player;



        newState.opponent =
            playerId==="opponent"
            ?
            {

                ...newState.opponent,

                board:
                newState.opponent.board.map(
                    unit =>
                    unit.instanceId===attackerId
                    ?
                    {
                        ...unit,
                        canAttack:false
                    }
                    :
                    unit
                )

            }
            :
            newState.opponent;



        return checkGameOver(
            newState
        );

    }





    /*
        Бой существ
    */


    const target =
        opponent.board.find(
            unit =>
                unit.instanceId===targetId
        );



    if(!target){
        return state;
    }



    if(!canUnitAttack(attacker)){
        return state;
    }



    const attackerHealth =
        attacker.health -
        target.attack;



    const targetHealth =
        target.health -
        attacker.attack;




    return checkGameOver({


        ...state,



        [playerId]:{


            ...player,


            board:

            player.board

            .map(
                unit =>
                unit.instanceId===attackerId

                ?

                {

                    ...unit,

                    health:
                        attackerHealth,

                    canAttack:false

                }

                :

                unit
            )

            .filter(
                unit =>
                    unit.health>0
            )


        },



        [opponentId]:{


            ...opponent,


            board:

            opponent.board

            .map(
                unit =>
                unit.instanceId===targetId

                ?

                {

                    ...unit,

                    health:
                        targetHealth

                }

                :

                unit
            )

            .filter(
                unit =>
                    unit.health>0
            )


        }



    });


}




window.canUnitAttack =
canUnitAttack;


window.attackUnit =
attackUnit;
