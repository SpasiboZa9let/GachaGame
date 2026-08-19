/*
    ============================
    UNITS.JS

    Создание боевых единиц

    Карта -> Существо на поле

    Поддерживает:
    - stats
    - modifiers
    - equipment
    - effects
    - status
    - refreshUnitStats
    ============================
*/



function createCardInstance(id){



    const card =

        getCardById(id);





    if(!card){

        return null;

    }







    const baseStats = {



        attack:

            Number(card.attack) || 0,



        health:

            Number(card.health) || 0,



        maxHealth:

            Number(card.health) || 0,



        defense:

            Number(card.defense) || 0,



        strength:

            Number(card.strength) || 0



    };








    let unit = {



        instanceId:


            id +

            "_" +

            Date.now() +

            "_" +

            Math.random()

            .toString(36)

            .slice(2),





        cardId:id,





        name:

            card.name,





        rarity:

            card.rarity || "common",





        faction:

            card.faction || null,





        tags:

            card.tags || [],







        baseStats:{


            attack:baseStats.attack,

            health:baseStats.health,

            maxHealth:baseStats.maxHealth,

            defense:baseStats.defense,

            strength:baseStats.strength


        },








        stats:{


            attack:baseStats.attack,

            health:baseStats.health,

            maxHealth:baseStats.maxHealth,

            defense:baseStats.defense,

            strength:baseStats.strength


        },









        modifiers:[],





        equipment:[],





        effects:

            card.effects || [],





        status:[],





        abilities:

            card.abilities || [],





        canAttack:false



    };









    if(

        typeof refreshUnitStats === "function"

    ){



        unit =

            refreshUnitStats(unit);



    }








    return unit;


}








window.Units =

window.Units || {};



window.Units.createCardInstance =

createCardInstance;
