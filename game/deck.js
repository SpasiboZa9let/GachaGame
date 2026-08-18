function drawCard(
    state,
    playerId
) {

    const player =
        state[playerId];


    if (!player) {
        return state;
    }


    if (
        !Array.isArray(player.deck)
    ) {

        return state;

    }


    if (
        player.deck.length === 0
    ) {

        return state;

    }


    const newDeck =
        [
            ...player.deck
        ];


    const cardId =
        newDeck.shift();


    if (!cardId) {
        return state;
    }


    const newHand =
        [
            ...(player.hand || []),
            cardId
        ];


    let newCombatLog =
        [
            ...(state.combatLog || [])
        ];


    const card =
        window.getCardById
            ? window.getCardById(cardId)
            : null;


    if (card) {

        newCombatLog.push(
            (
                playerId === "player"
                    ? "Игрок"
                    : "Противник"
            ) +
            " получает карту: " +
            card.name +
            "."
        );

    }


    return {

        ...state,


        combatLog:
            newCombatLog,


        [playerId]: {

            ...player,

            deck:
                newDeck,

            hand:
                newHand

        }

    };

}


function createDeck(cardIds) {

    if (!Array.isArray(cardIds)) {
        return [];
    }


    return [
        ...cardIds
    ];

}


function shuffleDeck(deck) {

    if (!Array.isArray(deck)) {
        return [];
    }


    const shuffled =
        [
            ...deck
        ];


    for (
        let i =
            shuffled.length - 1;

        i > 0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        const temp =
            shuffled[i];


        shuffled[i] =
            shuffled[j];


        shuffled[j] =
            temp;

    }


    return shuffled;

}


window.drawCard =
drawCard;


window.createDeck =
createDeck;


window.shuffleDeck =
shuffleDeck;
