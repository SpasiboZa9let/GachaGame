/*
    Система колоды
*/


function createDeck() {


    if (!Array.isArray(CARDS)) {

        console.error(
            "Карты не найдены"
        );

        return [];

    }


    return CARDS.map(
        card => card.id
    );

}




function shuffleDeck(deck) {


    const result =
        [...deck];


    for (
        let i = result.length - 1;
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
            result[i],
            result[j]

        ] =
        [
            result[j],
            result[i]
        ];


    }


    return result;

}




/*
    Получаем стартовую руку
*/

function drawStartingHand(
    deck,
    count = 5
) {


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
    Сейчас добор выключен.
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
