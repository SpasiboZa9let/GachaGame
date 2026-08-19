/*
    ============================
    COMBAT.JS

    Боевая система

    Поддерживает:

    - атака героя
    - бой существ
    - stats
    - эффекты
    - триггеры
    - смерть существ
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









function markUnitDead(
    unit
){


    return {


        ...unit,


        dead:true


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






    let attacker =

        getUnitById(

            player.board,

            attackerId

        );





    if(!attacker){

        return state;

    }







    if(
        !canUnitAttack(attacker)
    ){

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
        Атака героя
    */


    if(
        targetId === "hero"
    ){



        let newAttacker =

            triggerUnitEffect(

                state,

                attacker,

                "afterAttack"

            );






        let newState = {


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

                        ...newAttacker,


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

            opponent.board,

            targetId

        );





    if(!target){

        return state;

    }






    const targetAttack =

        getUnitAttack(target);







    let attackerDamage =

        damage;






    let targetHealth =

        getUnitHealth(target)

        -

        attackerDamage;






    let attackerHealth =

        getUnitHealth(attacker)

        -

        targetAttack;







    let deadUnits=[];






    let newAttacker =

        setUnitHealth(

            attacker,

            attackerHealth

        );






    newAttacker.canAttack=false;







    let newTarget =

        setUnitHealth(

            target,

            targetHealth

        );









    /*
        Получение урона
    */


    newTarget =

        triggerUnitEffect(

            state,

            newTarget,

            "onDamage"

        );









    /*
        После атаки
    */


    newAttacker =

        triggerUnitEffect(

            state,

            newAttacker,

            "afterAttack"

        );









    if(
        getUnitHealth(newAttacker)<=0
    ){


        deadUnits.push(

            triggerUnitEffect(

                state,

                newAttacker,

                "onDeath"

            )

        );


    }







    if(
        getUnitHealth(newTarget)<=0
    ){


        deadUnits.push(

            triggerUnitEffect(

                state,

                newTarget,

                "onDeath"

            )

        );


    }









    let newState = {


        ...state,



        [playerId]:{


            ...player,


            board:


                player.board.map(

                    unit =>


                    unit.instanceId===attackerId

                    ?

                    newAttacker

                    :

                    unit


                )

                .filter(

                    unit =>

                    getUnitHealth(unit)>0

                )


        },







        [opponentId]:{


            ...opponent,


            board:


                opponent.board.map(

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
