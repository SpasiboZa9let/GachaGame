function createInitialGameState() {

    const playerHero =
        HEROES.find(
            hero => hero.id === "ilya_muromets"
        );

    const opponentHero =
        HEROES.find(
            hero => hero.id === "vasilisa_premudraya"
        );


    return {

        turn: 1,

        activePlayer: "player",

        gameOver: false,

        winner: null,

        combatLog: [
            "Бой начинается."
        ],


        player: {

            hero: playerHero,

            hp: playerHero
                ? playerHero.maxHealth
                : 10000,

            mana: 1,

            maxMana: 1,

            deck:
    createDeck(),


hand:
    createStartingHand(),

            board: []

        },


        opponent: {

            hero: opponentHero,

            hp: opponentHero
                ? opponentHero.maxHealth
                : 9000,

            mana: 1,

            maxMana: 1,

            deck:
    createDeck(),


hand:
    createStartingHand(),

            board: []

        }

    };

}


/*
    Добавление сообщения в журнал боя.
*/

function addCombatLog(
    state,
    message
) {

    return {

        ...state,

        combatLog: [
            ...(state.combatLog || []),
            message
        ]

    };

}


/*
    Проверка окончания игры.
*/

function checkGameOver(state) {

    if (!state) {
        return state;
    }


    if (state.gameOver) {
        return state;
    }


    /*
        Победа игрока.
    */

    if (
        state.opponent.hp <= 0
    ) {

        return {

            ...state,

            gameOver: true,

            winner: "player",

            opponent: {

                ...state.opponent,

                hp: 0

            },

            combatLog: [

                ...(state.combatLog || []),

                "Герой противника повержен.",

                "ПОБЕДА."

            ]

        };

    }


    /*
        Победа противника.
    */

    if (
        state.player.hp <= 0
    ) {

        return {

            ...state,

            gameOver: true,

            winner: "opponent",

            player: {

                ...state.player,

                hp: 0

            },

            combatLog: [

                ...(state.combatLog || []),

                "Ваш герой повержен.",

                "ПОРАЖЕНИЕ."

            ]

        };

    }


    return state;

}


/*
    Получение карты по ID.
*/

function getCardById(cardId) {

    if (
        !Array.isArray(CARDS)
    ) {

        console.error(
            "CARDS не является массивом."
        );

        return null;

    }


    return (

        CARDS.find(
            card =>
                card.id === cardId
        ) || null

    );

}


/*
    Создание экземпляра карты
    для размещения на поле.
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


        attack:
            card.attack,


        health:
            card.health,


        maxHealth:
            card.health,


        defense:
            card.defense,


        strength:
            card.strength,


        canAttack:
            false,


        status: []

    };

}


/*
    Поиск карты в руке.
*/

function getCardFromHand(
    player,
    cardId
) {

    if (
        !player ||
        !Array.isArray(player.hand)
    ) {

        return null;

    }


    return (

        player.hand.find(
            id =>
                id === cardId
        ) || null

    );

}


/*
    Розыгрыш карты.
*/

function playCard(
    state,
    playerId,
    cardId
) {

    if (
        !state ||
        state.gameOver
    ) {

        return state;

    }


    const player =
        state[playerId];


    if (!player) {
        return state;
    }


    /*
        Играть карту можно
        только во время своего хода.
    */

    if (
        state.activePlayer !==
        playerId
    ) {

        return state;

    }


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


    const card =
        getCardById(cardId);


    if (!card) {
        return state;
    }


    /*
        Проверка маны.
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
        на поле.
    */

    if (
        player.board.length >= 5
    ) {

        console.log(
            "На поле нет свободного места."
        );

        return state;

    }


    const instance =
        createCardInstance(
            cardId
        );


    if (!instance) {
        return state;
    }


    /*
        Удаляем карту из руки.
    */

    const newHand =
        player.hand.filter(
            id =>
                id !== cardId
        );


    /*
        Добавляем существо
        на поле.
    */

    const newBoard = [

        ...player.board,

        instance

    ];


    let newState = {

        ...state,

        [playerId]: {

            ...player,

            mana:
                player.mana -
                card.cost,

            hand:
                newHand,

            board:
                newBoard

        }

    };


    newState =
        addCombatLog(

            newState,

            (
                playerId === "player"
                    ? "Вы"
                    : "Василиса"
            ) +

            " разыграли карту «" +

            card.name +

            "»."

        );


    return newState;

}


/*
    Начать новый бой.
*/

function restartGame() {

    return createInitialGameState();

}


/*
    Экспортируем функции
    в глобальную область,
    поскольку проект использует
    Babel без сборщика.
*/

window.createInitialGameState =
    createInitialGameState;


window.addCombatLog =
    addCombatLog;


window.checkGameOver =
    checkGameOver;


window.getCardById =
    getCardById;


window.createCardInstance =
    createCardInstance;


window.getCardFromHand =
    getCardFromHand;


window.playCard =
    playCard;


window.restartGame =
    restartGame;
