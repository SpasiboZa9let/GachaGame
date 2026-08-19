/*
============================
GameData.jsx

Подготовка данных для отображения

Отвечает за:
- получение карт игрока
- получение карт противника

Игровую логику не содержит
============================
*/


function GameData({


    gameState,

    children


}){


    const player = gameState.player;

    const opponent = gameState.opponent;





    const handCards =

        (player.hand || [])

        .map(

            cardId =>

            window.Cards.getCardById(cardId)

        )

        .filter(Boolean);







    const opponentHandCards =

        (opponent.hand || [])

        .map(

            cardId =>

            window.Cards.getCardById(cardId)

        )

        .filter(Boolean);







    return children({


        player,

        opponent,

        handCards,

        opponentHandCards


    });


}





window.GameData = GameData;
