/*
    ============================
    ACTIONS.JS

    Действия игрока

    Отвечает за:

    - розыгрыш карты
    - изменение руки
    - трата маны
    - добавление существа на поле

    НЕ содержит:
    - бой
    - эффекты
    - ходы
    ============================
*/







function playCard(
    state,
    playerId,
    cardId
){



    const player =

        state[playerId];





    if(!player){

        return state;

    }







    const card =

        getCardById(cardId);





    if(!card){

        return state;

    }









    /*
        Проверка маны
    */


    if(

        player.mana < card.cost

    ){

        return state;

    }








    const unit =

        createCardInstance(cardId);







    if(!unit){

        return state;

    }








    return {



        ...state,





        [playerId]:{



            ...player,





            mana:

                player.mana -

                card.cost,







            hand:


                player.hand.filter(

                    id => id !== cardId

                ),







            board:[



                ...player.board,



                unit



            ]




        }



    };



}









window.playCard =
playCard;
