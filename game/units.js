/*
    ============================
    UNITS.JS

    Создание боевых единиц

    Карта -> Существо на поле

    Отвечает за:

    - характеристики
    - эффекты
    - статусы
    - амуницию
    - модификаторы

    НЕ содержит боя
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

            card.attack || 0,



        health:

            card.health || 0,



        maxHealth:

            card.health || 0,



        defense:

            card.defense || 0,



        strength:

            card.strength || 0



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







        /*
            Начальные характеристики

        */


        baseStats:{


            ...baseStats


        },






        /*
            Текущие характеристики

        */


        stats:{


            ...baseStats


        },









        /*
            Изменения характеристик

            Пример:

            {
                stat:"attack",
                value:50,
                source:"Ярость берлоги"
            }

        */


        modifiers:[],









        /*
            Экипировка

            Будущая система:

            когти медведя
            мечи
            броня

        */


        equipment:[],









        /*
            Эффекты карты

        */


        effects:

            card.effects || [],







        /*
            Временные состояния

            stun
            fear
            shield

        */


        status:[],








        canAttack:false



    };









    /*
        Перерасчёт характеристик

        Если модификаторы есть
        применяем их

    */


    if(

        typeof refreshUnitStats === "function"

    ){


        unit =

            refreshUnitStats(unit);


    }









    return unit;



}








window.createCardInstance =
createCardInstance;
