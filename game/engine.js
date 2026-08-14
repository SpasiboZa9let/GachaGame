function createInitialGameState() {

    return {

        turn: 1,

        activePlayer: "player",

        player: {

            hp: 30,

            mana: 1,
            maxMana: 1,

            deck: [],

            hand: [
                "baba_yaga",
                "shaman"
            ],

            board: []

        },


        opponent: {

            hp: 30,

            mana: 1,
            maxMana: 1,

            deck: [],

            hand: [],

            board: []

        }

    };

}


/*
    Создание экземпляра существа.

    cardId — ссылка на шаблон карты.
*/

function createCardInstance(cardId) {

    const card = CARDS[cardId];

    if (!card) {
        console.error("Карта не найдена:", cardId);
        return null;
    }


    return {

        instanceId:
            cardId + "_" + Date.now() + "_" + Math.random(),

        cardId: cardId,

        attack: card.attack,

        health: card.health,

        maxHealth: card.health,

        canAttack: false,

        status: []

    };

}


/*
    Получаем карту игрока
    из его руки.
*/

function getCardFromHand(player, cardId) {

    return player.hand.find(
        id => id === cardId
    );

}


/*
    Разыгрывание карты.

    Пока поддерживаем только существ.
*/

function playCard(state, playerId, cardId) {

    const player = state[playerId];

    if (!player) {
        return state;
    }


    // Проверяем, есть ли карта в руке

    const cardIdInHand =
        getCardFromHand(player, cardId);

    if (!cardIdInHand) {

        console.log(
            "Карты нет в руке:",
            cardId
        );

        return state;
    }


    // Получаем шаблон карты

    const card = CARDS[cardId];

    if (!card) {
        return state;
    }


    // Проверяем ману

    if (player.mana < card.cost) {

        console.log(
            "Недостаточно маны."
        );

        return state;
    }


    // Проверяем поле

    if (player.board.length >= 5) {

        console.log(
            "На поле нет свободного места."
        );

        return state;
    }


    // Создаём экземпляр

    const instance =
        createCardInstance(cardId);

    if (!instance) {
        return state;
    }


    /*
        Создаём новое состояние,
        не изменяя старое напрямую.
    */

    const newState = {

        ...state,

        [playerId]: {

            ...player,

            mana:
                player.mana - card.cost,

            hand:
                player.hand.filter(
                    id => id !== cardId
                ),

            board: [
                ...player.board,
                instance
            ]

        }

    };


    return newState;

}
