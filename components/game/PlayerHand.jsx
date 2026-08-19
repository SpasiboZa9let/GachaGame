/*
============================
PlayerHand.jsx

Рука игрока

Показывает карты,
которые можно разыграть.

Логика игры остаётся в Game.jsx

============================
*/


function PlayerHand({


    cards,

    onCardClick


}){


    return (


        <Hand

            cards={cards}

            onCardClick={onCardClick}

        />


    );


}




window.PlayerHand = PlayerHand;
