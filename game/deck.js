/*
    Работа с колодой
*/


function createDeck() {

    if (!Array.isArray(CARDS)) {

        console.error(
            "CARDS не найден"
        );

        return [];

    }


    /*
        Создаем колоду.
        Пока тест:
        каждая карта встречается 1 раз.
    */


    return CARDS.map(
        card => card.id
    );

}



/*
    Перемешивание колоды
*/

function shuffleDeck(deck) {


    const newDeck =
        [...deck];


    for (
        let i = newDeck.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random()
                *
                (i + 1)
            );


        [
            newDeck[i],
            newDeck[j]

        ] =
        [
            newDeck[j],
            newDeck[i]
        ];

    }


    return newDeck;

}



/*
    Стартовая рука
*/

function drawStartingHand(deck, count = 5) {


    return {

        hand:
            deck.slice(
                0,
                count
            ),


        deck:

            deck.slice(
                count
            )

    };

}




/*
    Будущий добор карт.
    Сейчас отключен.
*/

function drawCard(
    state,
    playerId
) {


    return state;

}




window.createDeck =
createDeck;


window.shuffleDeck =
shuffleDeck;


window.drawStartingHand =
drawStartingHand;


window.drawCard =
drawCard;
