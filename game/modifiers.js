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

        typeof unit.baseStats[stat] === "number"

        ?

        unit.baseStats[stat]

        :

        0;




    let bonus = 0;




    (unit.modifiers || [])

    .forEach(

        mod => {


            if(
                mod.stat === stat
            ){

                bonus += mod.value || 0;

            }


        }

    );




    return base + bonus;


}









function refreshUnitStats(
    unit
){


    const health =

        calculateStat(
            unit,
            "health"
        );



    return {


        ...unit,



        stats:{


            ...(unit.stats || {}),



            attack:

                calculateStat(
                    unit,
                    "attack"
                ),




            health:health,




            maxHealth:health,




            defense:

                calculateStat(
                    unit,
                    "defense"
                ),




            strength:

                calculateStat(
                    unit,
                    "strength"
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
