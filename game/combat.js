/*
    ============================
    COMBAT.JS

    Боевая система

    Поддерживает:

    - атака героя
    - бой существ
    - stats
    - эффекты
    - баффы
    - триггеры
    - смерть существ
    - подготовка под амуницию
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
        unit &&
        unit.stats &&
        typeof unit.stats.attack === "number"
    ){

        return unit.stats.attack;

    }


    return unit.attack || 0;

}





function getUnitHealth(unit){


    if(
        unit &&
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


            ...(unit.stats || {}),


            health:value


        }


    };


}





function getUnitById(
    board,
    id
){


    return board.find(

        unit =>

        unit.instanceId === id

    );


}








function triggerUnitEffect(
    state,
    unit,
    trigger
){


    if(
        typeof triggerEffects !== "function"
    ){

        return unit;

    }



    return triggerEffects(

        state,

        unit,

        trigger

    );


}








function applyDamage(
    unit,
    damage
){


    let health =
        getUnitHealth(unit);



    health -= damage;



    return setUnitHealth(
        unit,
        health
    );


}








function attackUnit(
    state,
    playerId,
    attackerId,
    targetId
){



    const player =
        state[playerId];



    const enemyId =
        playerId==="player"
        ?
        "opponent"
        :
        "player";



    const enemy =
        state[enemyId];






    let attacker =
        getUnitById(
            player.board,
            attackerId
        );




    if(!attacker){

        return state;

    }






    if(!canUnitAttack(attacker)){

        return state;

    }







    /*
        Перед атакой
    */


    attacker =
        triggerUnitEffect(

            state,

            attacker,

            "beforeAttack"

        );







    const damage =
        getUnitAttack(attacker);









    /*
        Удар по герою
    */


    if(
        targetId==="hero"
    ){



        let newState = {


            ...state,


            [enemyId]:{


                ...enemy,


                hp:

                Math.max(
                    0,
                    enemy.hp - damage
                )


            },


            combatLog:[


                ...state.combatLog,


                attacker.name +

                " наносит герою " +

                damage +

                " урона."


            ]



        };





        let updatedAttacker =

            triggerUnitEffect(

                newState,

                attacker,

                "afterAttack"

            );






        newState[playerId]={


            ...newState[playerId],


            board:


                newState[playerId].board.map(

                    unit =>


                    unit.instanceId===attackerId

                    ?

                    {

                        ...updatedAttacker,

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





    let target =

        getUnitById(

            enemy.board,

            targetId

        );




    if(!target){

        return state;

    }





    const attackerDamage =
        getUnitAttack(attacker);



    const targetDamage =
        getUnitAttack(target);






    let newAttacker =

        applyDamage(

            attacker,

            targetDamage

        );



    let newTarget =

        applyDamage(

            target,

            attackerDamage

        );








    /*
        Получили урон
    */


    newAttacker =
        triggerUnitEffect(

            state,

            newAttacker,

            "onDamage"

        );



    newTarget =
        triggerUnitEffect(

            state,

            newTarget,

            "onDamage"

        );







    /*
        После атаки

        Медведь например
        получает бафф здесь
    */


    newAttacker =
        triggerUnitEffect(

            state,

            newAttacker,

            "afterAttack"

        );








    /*
        Смерть
    */


    if(
        getUnitHealth(newAttacker)<=0
    ){


        newAttacker =

            triggerUnitEffect(

                state,

                newAttacker,

                "onDeath"

            );


    }





    if(
        getUnitHealth(newTarget)<=0
    ){


        newTarget =

            triggerUnitEffect(

                state,

                newTarget,

                "onDeath"

            );


    }








    let newState={


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

                    ...newAttacker,

                    canAttack:false

                }

                :

                unit

            )

            .filter(

                unit =>

                getUnitHealth(unit)>0

            )


        },







        [enemyId]:{


            ...enemy,


            board:


            enemy.board

            .map(

                unit =>


                unit.instanceId===targetId

                ?

                newTarget

                :

                unit

            )

            .filter(

                unit =>

                getUnitHealth(unit)>0

            )


        },







        combatLog:[


            ...state.combatLog,


            attacker.name +

            " атакует " +

            target.name


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
