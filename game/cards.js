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







    const cards =


        window.Cards?.list

        ||

        window.CARDS

        ||

        (typeof CARDS !== "undefined"
            ?
            CARDS
            :
            null
        );








    if(

        !Array.isArray(cards)

    ){

        console.error(

            "База карт не загружена"

        );


        return null;

    }









    return (

        cards.find(

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
*/



window.getCardById =

getCardById;
