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



    if(!state){

        return state;

    }






    const player =

        state[playerId];







    if(!player){

        return state;

    }









    const getCard =


        window.Cards?.getCardById

        ||

        window.getCardById;








    const card =

        getCard(cardId);







    if(!card){

        return state;

    }








    const cost =

        Number(card.cost) || 0;









    if(
        player.mana < cost
    ){

        return state;

    }









    /*
        Пока только существа

        Заклинания добавим позже
    */



    if(

        player.board.length >= 5

    ){

        return state;

    }









    const createUnit =


        window.Units?.createCardInstance

        ||

        window.createCardInstance;








    const unit =


        createUnit(cardId);









    if(!unit){

        return state;

    }









    let newState = {



        ...state,




        [playerId]:{


            ...player,



            mana:


                player.mana - cost,





            hand:


                (player.hand || [])

                .filter(

                    id =>

                    id !== cardId

                ),





            board:[


                ...(player.board || []),


                unit


            ]



        }



    };









    /*
        Эффекты входа:

        onPlay
        battlecry
        summon

    */






    const trigger =


        window.Effects?.triggerEffects

        ||

        window.triggerEffects;









    if(
        typeof trigger === "function"
    ){



        newState[playerId].board =


            newState[playerId].board.map(

                item =>



                item.instanceId === unit.instanceId


                ?


                trigger(

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









window.CardPlay =

window.CardPlay || {};





window.CardPlay.playCard =

playCard;









/*
    Совместимость
*/



window.playCard =

playCard;
