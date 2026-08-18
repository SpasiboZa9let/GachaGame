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
    Получить карту по ID
*/

function getCardById(cardId) {

    if (!Array.isArray(CARDS)) {
        console.error("CARDS не является массивом");
        return null;
    }

    return CARDS.find(
        card => card.id === cardId
    ) || null;

}


/*
    Создание экземпляра существа
*/

function createCardInstance(cardId) {

    const card =
        getCardById(cardId);

    if (!card) {

        console.error(
            "Карта не найдена:",
            cardId
        );

        return null;
    }


    return {

        instanceId:
            cardId +
            "_" +
            Date.now() +
            "_" +
            Math.random()
                .toString(36)
                .substring(2, 8),

        cardId: cardId,

        attack: card.attack,

        health: card.health,

        maxHealth: card.health,

        canAttack: false,

        status: []

    };

}


/*
    Проверяем наличие карты в руке
*/

function getCardFromHand(player, cardId) {

    if (!player || !Array.isArray(player.hand)) {
        return null;
    }

    return player.hand.find(
        id => id === cardId
    ) || null;

}


/*
    Разыгрывание карты
*/

function playCard(state, playerId, cardId) {

    const player =
        state[playerId];

    if (!player) {
        return state;
    }


    /*
        Проверяем ход
    */

    if (
        state.activePlayer !==
        playerId
    ) {

        return state;

    }


    /*
        Карта должна быть в руке
    */

    const cardInHand =
        getCardFromHand(
            player,
            cardId
        );

    if (!cardInHand) {

        console.log(
            "Карты нет в руке:",
            cardId
        );

        return state;

    }


    /*
        Получаем карту
    */

    const card =
        getCardById(cardId);

    if (!card) {
        return state;
    }


    /*
        Проверяем ману
    */

    if (
        player.mana <
        card.cost
    ) {

        console.log(
            "Недостаточно маны."
        );

        return state;

    }


    /*
        Максимум 5 существ
    */

    if (
        player.board.length >= 5
    ) {

        console.log(
            "На поле нет свободного места."
        );

        return state;

    }


    /*
        Создаём экземпляр
    */

    const instance =
        createCardInstance(
            cardId
        );

    if (!instance) {
        return state;
    }


    /*
        Новое состояние
    */

    return {

        ...state,

        [playerId]: {

            ...player,

            mana:
                player.mana -
                card.cost,

            hand:
                player.hand.filter(
                    id =>
                        id !== cardId
                ),

            board: [

                ...player.board,

                instance

            ]

        }

    };

}
