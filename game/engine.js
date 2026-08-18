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
    =========================
    ПОИСК КАРТЫ
    =========================

    CARDS — массив объектов.

    Поэтому ищем карту по её id.
*/

function getCardById(cardId) {

    return CARDS.find(
        card => card.id === cardId
    );

}


/*
    =========================
    СОЗДАНИЕ ЭКЗЕМПЛЯРА
    =========================
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
            Math.random(),


        cardId: cardId,


        attack:
            card.attack,


        health:
            card.health,


        maxHealth:
            card.health,


        canAttack: false,


        status: []

    };

}


/*
    =========================
    ПОЛУЧЕНИЕ КАРТЫ ИЗ РУКИ
    =========================
*/

function getCardFromHand(player, cardId) {

    return player.hand.find(
        id => {

            if (
                typeof id === "object"
            ) {

                return id.id === cardId;

            }

            return id === cardId;

        }
    );

}


/*
    =========================
    РАЗЫГРЫВАНИЕ КАРТЫ
    =========================
*/

function playCard(
    state,
    playerId,
    cardId
) {

    const player =
        state[playerId];


    if (!player) {

        return state;

    }


    /*
        Проверяем наличие карты
        в руке.
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
        Получаем шаблон карты.
    */

    const card =
        getCardById(cardId);


    if (!card) {

        console.error(
            "Шаблон карты не найден:",
            cardId
        );

        return state;

    }


    /*
        Проверяем ману.
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
        Проверяем лимит существ
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


    /*
        Создаём экземпляр карты.
    */

    const instance =
        createCardInstance(cardId);


    if (!instance) {

        return state;

    }


    /*
        Удаляем карту из руки.
    */

    const newHand =
        player.hand.filter(
            id => {

                if (
                    typeof id === "object"
                ) {

                    return id.id !== cardId;

                }

                return id !== cardId;

            }
        );


    /*
        Создаём новое состояние.
    */

    const newState = {

        ...state,


        [playerId]: {

            ...player,


            mana:
                player.mana -
                card.cost,


            hand:
                newHand,


            board: [

                ...player.board,

                instance

            ]

        }

    };


    return newState;

}
