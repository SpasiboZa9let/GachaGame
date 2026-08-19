/*
    ============================
    CARDS.JS

    Работа с картами

    Поиск карты
    ============================
*/



function getCardById(id){



    if(!id){

        return null;

    }






    if(
        typeof CARDS === "undefined"
        ||
        !Array.isArray(CARDS)
    ){

        console.error(

            "CARDS не загружен"

        );


        return null;

    }








    return (

        CARDS.find(

            card =>

            card.id === id

        )

        ||

        null

    );


}







window.Cards =

window.Cards || {};



window.Cards.getCardById =

getCardById;



/*
    Совместимость
    со старыми файлами
*/


window.getCardById =

getCardById;
