/*
    ============================
    GAME EFFECTS

    Система эффектов карт

    Поддерживает:

    damage
    heal
    buffAttack
    buffHealth
    shield
    stun
    fear
    rage

============================
*/





function applyEffect(
    state,
    target,
    effect
){


    if(
        !target ||
        !effect
    ){

        return target;

    }






    let unit = {


        ...target,



        stats:{


            attack:0,

            health:0,

            maxHealth:0,

            defense:0,

            strength:0,


            ...(target.stats || {})


        },



        status:[

            ...(target.status || [])

        ]


    };








    switch(effect.type){



        case "damage":



            unit.stats.health =

                Math.max(

                    0,

                    unit.stats.health -

                    (Number(effect.value) || 0)

                );



            break;








        case "heal":



            unit.stats.health =

                Math.min(

                    unit.stats.maxHealth,

                    unit.stats.health +

                    (Number(effect.value) || 0)

                );



            break;








        case "buffAttack":



            unit.stats.attack +=

                Number(effect.value) || 0;



            break;








        case "buffHealth":



            unit.stats.maxHealth +=

                Number(effect.value) || 0;



            unit.stats.health +=

                Number(effect.value) || 0;



            break;









        case "rage":



            const lostHealth =

                unit.stats.maxHealth -

                unit.stats.health;




            const lostPercent =

                unit.stats.maxHealth > 0

                ?

                (
                    lostHealth /

                    unit.stats.maxHealth

                ) * 100

                :

                0;





            const bonus =

                Math.floor(

                    lostPercent / 20

                )

                *

                (Number(effect.value) || 0);





            unit.stats.attack += bonus;



            break;









        case "shield":



            unit.status.push({


                type:"shield",


                value:

                    Number(effect.value) || 0


            });



            break;









        case "stun":



            unit.status.push({


                type:"stun",


                turns:

                    effect.value || 1


            });



            unit.canAttack=false;



            break;









        case "fear":



            unit.status.push({


                type:"fear",


                turns:

                    effect.value || 1


            });



            unit.canAttack=false;



            break;









        default:



            console.log(

                "Неизвестный эффект",

                effect

            );


    }






    return unit;


}









function hasStatus(
    unit,
    type
){


    if(
        !unit ||
        !unit.status
    ){

        return false;

    }





    return unit.status.some(

        status =>

        status.type === type

    );


}









function removeStatus(
    unit,
    type
){


    return {


        ...unit,



        status:


            (unit.status || [])

            .filter(

                status =>

                status.type !== type

            )


    };


}









function triggerEffects(
    state,
    unit,
    trigger
){



    if(
        !unit ||
        !unit.effects
    ){

        return unit;

    }






    let result = unit;







    unit.effects.forEach(

        effect => {



            if(

                effect.trigger !== trigger

            ){

                return;

            }





            result =

                applyEffect(

                    state,

                    result,

                    effect

                );


        }


    );






    return result;


}









window.Effects =

window.Effects || {};



window.Effects.applyEffect =

applyEffect;



window.Effects.hasStatus =

hasStatus;



window.Effects.removeStatus =

removeStatus;



window.Effects.triggerEffects =

triggerEffects;
