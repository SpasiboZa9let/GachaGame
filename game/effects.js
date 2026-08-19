/*
    ============================
    GAME EFFECTS

    Система эффектов

    Поддерживает:

    damage
    heal
    buffAttack
    buffHealth
    shield
    stun
    fear


    Работает через:

    modifiers.js

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


        status:[

            ...(target.status || [])

        ],


        modifiers:[

            ...(target.modifiers || [])

        ]



    };







    switch(effect.type){



        /*
            Прямой урон
        */


        case "damage":



            unit.stats = {


                ...(unit.stats || {}),


                health:

                    unit.stats.health -

                    effect.value



            };



            break;









        /*
            Лечение
        */


        case "heal":



            unit.stats = {


                ...(unit.stats || {}),



                health:


                    Math.min(


                        unit.baseStats.maxHealth,


                        unit.stats.health +

                        effect.value


                    )



            };



            break;









        /*
            Бафф атаки

            Теперь НЕ меняем attack напрямую

        */


        case "buffAttack":



            if(
                typeof addModifier === "function"
            ){



                unit =

                    addModifier(

                        unit,


                        createAttackBuff(

                            effect.value,


                            effect.source ||

                            "Эффект"

                        )


                    );




                unit =

                    refreshUnitStats(unit);



            }



            break;









        /*
            Бафф здоровья
        */


        case "buffHealth":



            if(
                typeof addModifier === "function"
            ){



                unit =


                    addModifier(

                        unit,


                        createHealthBuff(

                            effect.value,


                            effect.source ||

                            "Эффект"

                        )


                    );




                unit =

                    refreshUnitStats(unit);



            }



            break;









        /*
            Щит

        */


        case "shield":



            unit.status.push({


                type:"shield",


                value:
                    effect.value



            });



            break;









        /*
            Оглушение

        */


        case "stun":



            unit.status.push({


                type:"stun",


                turns:

                    effect.value || 1



            });



            unit.canAttack=false;



            break;









        /*
            Страх

        */


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

                "Неизвестный эффект:",

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













/*
    Запуск эффектов карты

    Например:

    afterAttack

    onSummon

    onDeath

*/


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
