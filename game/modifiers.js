/*
    ============================
    MODIFIERS.JS

    Система модификаторов существ

    Баффы
    Дебаффы
    Амуниция
    Артефакты
    Способности героев

    ============================
*/






function addModifier(
    unit,
    modifier
){


    return {


        ...unit,


        modifiers:[


            ...(unit.modifiers || []),


            modifier


        ]


    };


}









function removeModifier(
    unit,
    source
){


    return {


        ...unit,


        modifiers:

            (unit.modifiers || [])

            .filter(

                mod =>
                    mod.source !== source

            )


    };


}









function calculateStat(
    unit,
    stat
){



    let base =

        unit.baseStats &&

        unit.baseStats[stat]

        ?

        unit.baseStats[stat]

        :

        unit[stat] || 0;





    let bonus = 0;




    (unit.modifiers || [])

    .forEach(

        mod => {



            if(
                mod.stat === stat
            ){

                bonus += mod.value;

            }


        }


    );





    return base + bonus;



}









function refreshUnitStats(
    unit
){


    return {


        ...unit,


        stats:{


            attack:

                calculateStat(
                    unit,
                    "attack"
                ),



            health:

                calculateStat(
                    unit,
                    "health"
                ),



            defense:

                calculateStat(
                    unit,
                    "defense"
                )



        }


    };


}









function createAttackBuff(
    value,
    source
){


    return {


        type:"buff",


        stat:"attack",


        value:value,


        source:source


    };


}









function createHealthBuff(
    value,
    source
){


    return {


        type:"buff",


        stat:"health",


        value:value,


        source:source


    };


}









window.addModifier =
addModifier;


window.removeModifier =
removeModifier;


window.calculateStat =
calculateStat;


window.refreshUnitStats =
refreshUnitStats;


window.createAttackBuff =
createAttackBuff;


window.createHealthBuff =
createHealthBuff;
