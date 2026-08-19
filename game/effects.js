/*
    ============================
    GAME EFFECTS

    Базовая система эффектов

    Поддерживает:

    damage
    heal
    buffAttack
    buffHealth
    shield
    stun
    fear

    Будет использоваться:
    - картами
    - способностями
    - амуницией
    ============================
*/






function applyEffect(
    state,
    target,
    effect
){



    if(!effect || !target){

        return target;

    }





    let unit = {


        ...target,


        stats:{


            ...(target.stats || {})


        },


        status:[

            ...(target.status || [])

        ]



    };








    switch(effect.type){



        /*
            Прямой урон
        */

        case "damage":


            unit.stats.health -=

                effect.value;



            break;








        /*
            Лечение
        */

        case "heal":


            unit.stats.health =

                Math.min(

                    unit.stats.maxHealth,

                    unit.stats.health +
                    effect.value

                );


            break;









        /*
            Усиление атаки
        */

        case "buffAttack":



            unit.stats.attack +=

                effect.value;



            break;









        /*
            Усиление здоровья
        */

        case "buffHealth":



            unit.stats.health +=

                effect.value;



            unit.stats.maxHealth +=

                effect.value;



            break;









        /*
            Щит

            Пока просто статус

            Позже:
            поглощение урона
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

            Нельзя атаковать
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

            Существо не атакует
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









/*
    Проверка наличия эффекта
*/


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









/*
    Удаление статуса
*/


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









window.applyEffect =
applyEffect;


window.hasStatus =
hasStatus;


window.removeStatus =
removeStatus;
