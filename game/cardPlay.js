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






    const getCard =

        window.Cards?.getCardById

        ||

        window.getCardById;





    const card =

        getCard(cardId);





    if(!card){

        return state;

    }






    if(
        player.mana < card.cost
    ){

        return state;

    }







    /*
        Ограничение поля
    */


    if(

        player.board.length >= 5

    ){

        return state;

    }








    const unit =

        window.Units?.createCardInstance

        ?

        window.Units.createCardInstance(cardId)

        :

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
        Эффекты при выходе

        onPlay
        battlecry
        summon
    */



    const effectsSystem =

        window.Effects?.triggerEffects

        ||

        window.triggerEffects;







    if(
        typeof effectsSystem === "function"
    ){



        newState[playerId].board =


            newState[playerId].board.map(

                item =>



                item.instanceId === unit.instanceId


                ?


                effectsSystem(

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
