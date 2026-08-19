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









    const value =

        Number(effect.value) || 0;








    switch(effect.type){



        case "damage":



            unit.stats.health =

                Math.max(

                    0,

                    unit.stats.health - value

                );



            break;









        case "heal":



            unit.stats.health =

                Math.min(

                    unit.stats.maxHealth,

                    unit.stats.health + value

                );



            break;









        case "buffAttack":



            unit.stats.attack += value;



            break;









        case "buffHealth":



            unit.stats.maxHealth += value;



            unit.stats.health += value;



            break;









        case "rage":



            const lost =

                unit.stats.maxHealth -

                unit.stats.health;





            const percent =


                unit.stats.maxHealth > 0

                ?

                (
                    lost /

                    unit.stats.maxHealth

                ) * 100

                :

                0;







            const rageBonus =


                Math.floor(

                    percent / 20

                )

                *

                value;






            unit.stats.attack += rageBonus;



            break;









        case "shield":



            unit.status.push({


                type:"shield",


                value:value


            });



            break;









        case "stun":



            unit.status.push({


                type:"stun",


                turns:

                    value || 1


            });



            unit.canAttack = false;



            break;









        case "fear":



            unit.status.push({


                type:"fear",


                turns:

                    value || 1


            });



            unit.canAttack = false;



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
        !Array.isArray(unit.status)
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
        !Array.isArray(unit.effects)
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









/*
    Совместимость
*/



window.applyEffect =

applyEffect;



window.hasStatus =

hasStatus;



window.removeStatus =

removeStatus;



window.triggerEffects =

triggerEffects;
