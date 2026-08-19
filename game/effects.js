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




    let unit={


        ...target,


        stats:{


            ...(target.stats || {})


        },


        status:[

            ...(target.status || [])

        ]


    };






    switch(effect.type){



        case "damage":



            unit.stats.health -=
                effect.value;



            break;







        case "heal":



            unit.stats.health =

                Math.min(

                    unit.stats.maxHealth,

                    unit.stats.health +
                    effect.value

                );


            break;








        case "buffAttack":



            unit.stats.attack +=
                effect.value;



            break;








        case "buffHealth":



            unit.stats.health +=
                effect.value;


            unit.stats.maxHealth +=
                effect.value;


            break;









        /*
            ЯРОСТЬ МЕДВЕДЯ

            За каждые потерянные 20%
            здоровья +5 атаки
        */


        case "rage":



            const lostHealth =

                unit.stats.maxHealth -
                unit.stats.health;



            const lostPercent =

                (
                    lostHealth /
                    unit.stats.maxHealth
                )
                *
                100;




            const bonus =

                Math.floor(
                    lostPercent / 20
                )
                *
                effect.value;





            unit.stats.attack =

                unit.stats.attack +
                bonus;



            break;










        case "shield":



            unit.status.push({

                type:"shield",

                value:
                    effect.value

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
            status.type===type

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

                status.type!==type

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




    let result =
        unit;





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









window.applyEffect =
applyEffect;


window.hasStatus =
hasStatus;


window.removeStatus =
removeStatus;


window.triggerEffects =
triggerEffects;
