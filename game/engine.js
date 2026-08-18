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

        player: {

            hero: playerHero,

            hp: playerHero
                ? playerHero.maxHealth
                : 10000,

            mana: 1,
            maxMana: 1,

            deck: [],

            hand: [
                "baba_yaga",
                "voin_pikhotinets"
            ],

            board: []

        },

        opponent: {

    hero: opponentHero,

    hp: opponentHero
        ? opponentHero.maxHealth
        : 9000,

    mana: 1,
    maxMana: 1,

    deck: [],

    hand: [
        "volk",
        "frog"
    ],

    board: []

}
    };

}

function getCardById(cardId) {

    if (!Array.isArray(CARDS)) {

        console.error(
            "CARDS не является массивом"
        );

        return null;

    }

    return CARDS.find(
        card => card.id === cardId
    ) || null;

}

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

        defense: card.defense,

        strength: card.strength,

        canAttack: false,

        status: []

    };

}

function getCardFromHand(player, cardId) {

    if (
        !player ||
        !Array.isArray(player.hand)
    ) {

        return null;

    }

    return player.hand.find(
        id => id === cardId
    ) || null;

}

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

    if (
        player.mana <
        card.cost
    ) {

        console.log(
            "Недостаточно маны."
        );

        return state;

    }

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

    const newHand =
        player.hand.filter(
            id => id !== cardId
        );

    const newBoard =
        [
            ...player.board,
            instance
        ];

    const newPlayer = {

        ...player,

        mana:
            player.mana -
            card.cost,

        hand:
            newHand,

        board:
            newBoard

    };

    return {

        ...state,

        [playerId]:
            newPlayer

    };

}

window.createInitialGameState =
    createInitialGameState;

window.getCardById =
    getCardById;

window.createCardInstance =
    createCardInstance;

window.getCardFromHand =
    getCardFromHand;

window.playCard =
    playCard;
