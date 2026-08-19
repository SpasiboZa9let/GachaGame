/*
    ============================
    CARD PLAY

    Розыгрыш карт

    Отвечает за:

    - проверку маны
    - создание существа
    - удаление карты из руки
    - добавление на поле

    Подготовка под:
    - заклинания
    - эффекты при входе
    - боевые крики
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







    /*
        Создаем боевую копию карты
    */


    const unit =

        createCardInstance(cardId);






    if(!unit){

        return state;

    }









    let newState = {



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









    /*
        Будущие эффекты:

        onPlay
        summon
        battlecry

    */


    if(

        typeof triggerEffects === "function"

    ){



        newState[playerId].board =

            newState[playerId].board.map(

                item =>


                item.instanceId === unit.instanceId

                ?


                triggerEffects(

                    newState,

                    item,

                    "onPlay"

                )


                :


                item


            );


    }







    return newState;


}








window.playCard =
playCard;
