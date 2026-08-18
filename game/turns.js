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

                canAttack:
                    true

            })
        );


    let newState = {

        ...state,

        activePlayer:
            "player",

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


    /*
        Добор карты в начале хода.
    */

    if (
        window.drawCard
    ) {

        newState =
            window.drawCard(
                newState,
                "player"
            );

    }


    return newState;

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

                canAttack:
                    true

            })
        );


    return {

        ...state,

        activePlayer:
            "opponent",

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
        !Array.isArray(
            opponent.hand
        )
    ) {

        return null;

    }


    const playableCards =
        opponent.hand

            .map(
                cardId =>
                    window.getCardById(
                        cardId
                    )
            )

            .filter(
                card => {

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

                }
            );


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


    return playableCards[
        randomIndex
    ];

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
            window.playCard(
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


    while (true) {

        const attackers =
            newState.opponent.board
                .filter(
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


        /*
            Если у игрока есть существа —
            атакуем случайное существо.
        */

        if (
            newState.player.board.length > 0
        ) {

            const targets =
                newState.player.board;


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
                window.attackUnit(
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

        } else {

            /*
                Пока герой напрямую
                не атакуется.
            */

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


    let log =
        [
            ...(newState.combatLog || [])
        ];


    log.push(
        "Ход противника."
    );


    newState = {

        ...newState,

        combatLog:
            log

    };


    /*
        AI разыгрывает карты.
    */

    newState =
        opponentPlayCards(
            newState
        );


    /*
        AI атакует.
    */

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


    let log =
        [
            ...(newState.combatLog || [])
        ];


    log.push(
        "Игрок завершает ход."
    );


    newState = {

        ...newState,

        combatLog:
            log

    };


    /*
        Передаём управление AI.
    */

    newState =
        opponentTurn(
            newState
        );


    /*
        Возвращаем управление игроку.
    */

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


window.preparePlayerTurn =
preparePlayerTurn;


window.prepareOpponentTurn =
prepareOpponentTurn;


window.getRandomPlayableCard =
getRandomPlayableCard;


window.opponentPlayCards =
opponentPlayCards;


window.opponentAttack =
opponentAttack;


window.opponentTurn =
opponentTurn;


window.endTurn =
endTurn;
