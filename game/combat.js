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


    return (

        unit &&

        unit.stats &&

        typeof unit.stats.attack === "number"

    )

    ?

    Math.max(

        0,

        unit.stats.attack

    )

    :

    0;


}









function getUnitHealth(unit){


    return (

        unit &&

        unit.stats &&

        typeof unit.stats.health === "number"

    )

    ?

    unit.stats.health

    :

    0;


}









function setUnitHealth(
    unit,
    value
){


    return {


        ...unit,


        stats:{


            ...(unit.stats || {}),



            health:


                Math.max(

                    0,

                    value

                )



        }


    };


}









function getUnitById(
    board,
    id
){


    if(
        !Array.isArray(board)
    ){

        return null;

    }



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


    const triggerFunction =


        window.Effects?.triggerEffects

        ||

        window.triggerEffects;



    if(
        typeof triggerFunction !== "function"
    ){

        return unit;

    }




    return triggerFunction(

        state,

        unit,

        trigger

    );


}









function applyDamage(
    unit,
    damage
){


    return setUnitHealth(

        unit,

        getUnitHealth(unit)

        -

        (
            Number(damage) || 0
        )

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



    if(!player){

        return state;

    }






    const enemyId =


        playerId === "player"

        ?

        "opponent"

        :

        "player";





    const enemy =

        state[enemyId];






    if(!enemy){

        return state;

    }







    let attacker =


        getUnitById(

            player.board,

            attackerId

        );







    if(
        !attacker ||

        !canUnitAttack(attacker)

    ){

        return state;

    }









    attacker =

        triggerUnitEffect(

            state,

            attacker,

            "beforeAttack"

        );








    const damage =

        getUnitAttack(attacker);









    if(
        targetId === "hero"
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


                ...(state.combatLog || []),



                attacker.name +

                " наносит герою " +

                damage +

                " урона."


            ]



        };







        const updatedAttacker =


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


                    unit.instanceId === attackerId

                    ?

                    {

                        ...updatedAttacker,

                        canAttack:false

                    }

                    :

                    unit


                )


        };






        return (

            window.Victory?.checkGameOver

            ?

            window.Victory.checkGameOver(newState)

            :

            window.checkGameOver(newState)

        );


    }









    let target =


        getUnitById(

            enemy.board,

            targetId

        );






    if(!target){

        return state;

    }








    let newAttacker =


        applyDamage(

            attacker,

            getUnitAttack(target)

        );







    let newTarget =


        applyDamage(

            target,

            damage

        );







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






    newAttacker =

        triggerUnitEffect(

            state,

            newAttacker,

            "afterAttack"

        );







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









    const newState = {


        ...state,



        [playerId]:{


            ...player,



            board:


                player.board

                .map(

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


                    unit.instanceId === targetId

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


            ...(state.combatLog || []),



            attacker.name +

            " атакует " +

            target.name


        ]



    };








    return (

        window.Victory?.checkGameOver

        ?

        window.Victory.checkGameOver(newState)

        :

        window.checkGameOver(newState)

    );


}








window.Combat =

window.Combat || {};




window.Combat.canUnitAttack =

canUnitAttack;



window.Combat.attackUnit =

attackUnit;



window.Combat.getUnitAttack =

getUnitAttack;



window.Combat.getUnitHealth =

getUnitHealth;



window.Combat.getUnitById =

getUnitById;
