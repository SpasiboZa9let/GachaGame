/*
    ============================
    COMBAT.JS

    Боевая система

    Поддерживает:

    - атака героя
    - бой существ
    - stats
    - смерть существ
    - подготовка под эффекты
    ============================
*/


function canUnitAttack(unit){


    if(!unit){

        return false;

    }


    return unit.canAttack === true;


}






function getUnitAttack(unit){


    if(
        unit.stats &&
        typeof unit.stats.attack === "number"
    ){

        return unit.stats.attack;

    }


    return unit.attack || 0;


}






function getUnitHealth(unit){


    if(
        unit.stats &&
        typeof unit.stats.health === "number"
    ){

        return unit.stats.health;

    }


    return unit.health || 0;


}








function setUnitHealth(
    unit,
    value
){


    return {


        ...unit,


        stats:{


            ...unit.stats,


            health:value


        }


    };


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
        playerId === "player"
        ?
        "opponent"
        :
        "player";



    const opponent =
        state[opponentId];





    const attacker =

        player.board.find(

            unit =>
                unit.instanceId === attackerId

        );





    if(!attacker){

        return state;

    }





    if(!canUnitAttack(attacker)){


        return state;


    }





    const damage =
        getUnitAttack(attacker);







    /*
        Атака героя
    */


    if(targetId === "hero"){



        const newState = {


            ...state,



            [opponentId]:{


                ...opponent,


                hp:

                    opponent.hp - damage


            },



            combatLog:[


                ...state.combatLog,


                "«" +

                attacker.name +

                "» атакует героя и наносит " +

                damage +

                " урона."


            ]


        };






        newState[playerId] = {


            ...newState[playerId],



            board:


                newState[playerId].board.map(


                    unit =>


                    unit.instanceId === attackerId


                    ?


                    {


                        ...unit,


                        canAttack:false


                    }


                    :


                    unit


                )


        };





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
                unit.instanceId === targetId

        );





    if(!target){

        return state;

    }






    const targetAttack =

        getUnitAttack(target);



    const attackerHealth =

        getUnitHealth(attacker)
        -
        targetAttack;




    const targetHealth =

        getUnitHealth(target)
        -
        damage;






    let newState = {


        ...state,



        [playerId]:{


            ...player,



            board:


                player.board.map(

                    unit =>


                    unit.instanceId === attackerId


                    ?


                    setUnitHealth(

                        {

                            ...unit,


                            canAttack:false

                        },


                        attackerHealth

                    )


                    :


                    unit


                )


                .filter(

                    unit =>

                    getUnitHealth(unit) > 0

                )


        },





        [opponentId]:{


            ...opponent,



            board:


                opponent.board.map(

                    unit =>


                    unit.instanceId === targetId


                    ?


                    setUnitHealth(

                        unit,

                        targetHealth

                    )


                    :


                    unit


                )


                .filter(

                    unit =>

                    getUnitHealth(unit) > 0

                )


        },





        combatLog:[


            ...state.combatLog,


            attacker.name +

            " атакует " +

            target.name +

            "."


        ]



    };






    return checkGameOver(
        newState
    );



}






window.canUnitAttack =
canUnitAttack;



window.attackUnit =
attackUnit;
