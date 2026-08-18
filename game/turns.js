function preparePlayerTurn(state) {

    let newMaxMana =
        state.player.maxMana;

    if (newMaxMana < 10) {
        newMaxMana += 1;
    }

    const refreshedBoard =
        state.player.board.map(
            unit => ({
                ...unit,
                canAttack: true
            })
        );

    return {

        ...state,

        activePlayer: "player",

        player: {

            ...state.player,

            maxMana:
                newMaxMana,

            mana:
                newMaxMana,

            board:
                refreshedBoard

        }

    };

}


function prepareOpponentTurn(state) {

    let newMaxMana =
        state.opponent.maxMana;

    if (newMaxMana < 10) {
        newMaxMana += 1;
    }

    const refreshedBoard =
        state.opponent.board.map(
            unit => ({
                ...unit,
                canAttack: true
            })
        );

    return {

        ...state,

        activePlayer: "opponent",

        opponent: {

            ...state.opponent,

            maxMana:
                newMaxMana,

            mana:
                newMaxMana,

            board:
                refreshedBoard

        }

    };

}


function getRandomPlayableCard(state) {

    const opponent =
        state.opponent;

    if (
        !opponent ||
        !Array.isArray(opponent.hand)
    ) {
        return null;
    }

    const playableCards =
        opponent.hand
            .map(cardId =>
                getCardById(cardId)
            )
            .filter(card => {

                if (!card) {
                    return false;
                }

                if (
                    opponent.mana <
                    card.cost
                ) {
                    return false;
                }

                if (
                    opponent.board.length >= 5
                ) {
                    return false;
                }

                return true;

            });

    if (
        playableCards.length === 0
    ) {
        return null;
    }

    const randomIndex =
        Math.floor(
            Math.random() *
            playableCards.length
        );

    return playableCards[randomIndex];

}


function opponentPlayCards(state) {

    let newState =
        state;

    while (true) {

        const card =
            getRandomPlayableCard(
                newState
            );

        if (!card) {
            break;
        }

        const previousState =
            newState;

        newState =
            playCard(
                newState,
                "opponent",
                card.id
            );

        if (
            newState ===
            previousState
        ) {
            break;
        }

    }

    return newState;

}


function opponentAttack(state) {

    let newState =
        state;

    while (
        newState.player.board.length > 0
    ) {

        const attackers =
            newState.opponent.board.filter(
                unit =>
                    unit.canAttack === true
            );

        if (
            attackers.length === 0
        ) {
            break;
        }

        const attacker =
            attackers[
                Math.floor(
                    Math.random() *
                    attackers.length
                )
            ];

        const targets =
            newState.player.board;

        if (
            targets.length === 0
        ) {
            break;
        }

        const target =
            targets[
                Math.floor(
                    Math.random() *
                    targets.length
                )
            ];

        const previousState =
            newState;

        newState =
            attackUnit(
                newState,
                "opponent",
                attacker.instanceId,
                target.instanceId
            );

        if (
            newState ===
            previousState
        ) {
            break;
        }

    }

    return newState;

}


function opponentTurn(state) {

    let newState =
        state;

    newState =
        prepareOpponentTurn(
            newState
        );

    newState =
        opponentPlayCards(
            newState
        );

    newState =
        opponentAttack(
            newState
        );

    return newState;

}


function endTurn(state) {

    if (
        state.activePlayer !==
        "player"
    ) {
        return state;
    }

    let newState =
        state;

    newState =
        opponentTurn(
            newState
        );

    newState =
        preparePlayerTurn(
            newState
        );

    newState = {

        ...newState,

        turn:
            newState.turn + 1,

        activePlayer:
            "player"

    };

    return newState;

}
