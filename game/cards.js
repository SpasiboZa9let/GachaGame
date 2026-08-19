/*
    ============================
    CARDS.JS

    Работа с картами
    ============================
*/



function getCardById(id){


    return (

        CARDS.find(

            c => c.id === id

        )

        ||

        null

    );


}



window.getCardById =
getCardById;
