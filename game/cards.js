/*
    ============================
    CARDS.JS

    Работа с картами

    Поиск карты
    ============================
*/


function getCardById(id){


    return (

        CARDS.find(

            card => card.id === id

        )

        ||

        null

    );


}



window.getCardById =
getCardById;
