function preparePlayerTurn(state) {

    let newMaxMana =
        state.player.maxMana;


    if (
        newMaxMana < 10
    ) {

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
        Добор карты.
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


    if (
        newMaxMana < 10
    ) {

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


/*
    Получаем случайную
    доступную карту AI.
*/

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


    if (
        opponent.board.length >= 5
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


                    return (
                        opponent.mana >=
                        card.cost
                    );

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


/*
    AI разыгрывает карты.
*/

function opponentPlayCards(state) {

    let newState =
        state;


    while (
        !newState.gameOver
    ) {

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


/*
    AI атакует.

    Приоритет:

    1. Если у игрока есть существа —
       атакуем случайное существо.

    2. Если существ нет —
       атакуем героя.

    AI продолжает атаковать
    всеми доступными существами.
*/

function opponentAttack(state) {

    let newState =
        state;


    while (
        !newState.gameOver
    ) {

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
            Если есть существа игрока —
            атакуем их.
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

        }

        /*
            Если существ игрока нет —
            атакуем героя.
        */

        else {

            const previousState =
                newState;


            newState =
                window.attackHero(
                    newState,
                    "opponent",
                    attacker.instanceId
                );


            if (
                newState ===
                previousState
            ) {

                break;

            }

        }

    }


    return newState;

}


/*
    Полный ход противника.
*/

function opponentTurn(state) {

    let newState =
        state;


    if (
        newState.gameOver
    ) {

        return newState;

    }


    newState =
        prepareOpponentTurn(
            newState
        );


    newState = {

        ...newState,

        combatLog: [

            ...(newState.combatLog || []),

            "Ход Василисы."

        ]

    };


    /*
        Сначала играем карты.
    */

    newState =
        opponentPlayCards(
            newState
        );


    /*
        Затем атакуем.
    */

    newState =
        opponentAttack(
            newState
        );


    return newState;

}


/*
    Завершение хода игрока.
*/

function endTurn(state) {

    if (
        !state ||
        state.gameOver
    ) {

        return state;

    }


    if (
        state.activePlayer !==
        "player"
    ) {

        return state;

    }


    let newState = {

        ...state,

        combatLog: [

            ...(state.combatLog || []),

            "Игрок завершает ход."

        ]

    };


    /*
        Ход AI.
    */

    newState =
        opponentTurn(
            newState
        );


    /*
        Если AI убил игрока —
        дальше ход не передаём.
    */

    if (
        newState.gameOver
    ) {

        return newState;

    }


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
