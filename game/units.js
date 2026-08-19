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



    const getCard =


        window.Cards?.getCardById

        ||

        window.getCardById;







    const card =

        getCard(id);







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


            ...baseStats


        },











        stats:{


            ...baseStats


        },









        modifiers:[],








        equipment:[],









        effects:


            card.effects || [],










        abilities:


            card.abilities || [],









        status:[],








        currentEffects:[],









        canAttack:false



    };









    const refresh =


        window.Modifiers?.refreshUnitStats

        ||

        window.refreshUnitStats;








    if(
        typeof refresh === "function"
    ){



        unit =

            refresh(unit);



    }








    return unit;


}









window.Units =

window.Units || {};




window.Units.createCardInstance =

createCardInstance;
