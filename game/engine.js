function addCombatLog(state, message) {

    const combatLog =
        Array.isArray(state.combatLog)
            ? state.combatLog
            : [];

    return {

        ...state,

        combatLog:
            [
                ...combatLog,
                message
            ].slice(-20)

    };

}


function createInitialGameState() {

    const playerHero =
        HEROES.find(
            hero =>
                hero.id === "ilya_muromets"
        );


    const opponentHero =
        HEROES.find(
            hero =>
                hero.id === "vasilisa_premudraya"
        );


    return {

        turn: 1,

        activePlayer: "player",

        combatLog: [
            "Бой начинается."
        ],


        player: {

            hero: playerHero,

            hp:
                playerHero
                    ? playerHero.maxHealth
                    : 10000,

            mana: 1,

            maxMana: 1,

            deck: [],

            hand: [
                "baba_yaga",
                "shaman",
                "voin_pikhotinets"
            ],

            board: []

        },


        opponent: {

            hero: opponentHero,

            hp:
                opponentHero
                    ? opponentHero.maxHealth
                    : 9000,

            mana: 1,

            maxMana: 1,

            deck: [],

            hand: [],

            board: []

        }

    };

}


function getCardById(cardId) {

    if (!Array.isArray(CARDS)) {

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
            id =>
                id !== cardId
        );


    const newBoard =
        [
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


    const playerName =
        playerId === "player"
            ? "Вы"
            : "Противник";


    newState =
        addCombatLog(
            newState,

            playerName +
            " разыгрывает " +
            card.name +
            "."
        );


    return newState;

}


function preparePlayerTurn(
    state
) {

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


    newState =
        addCombatLog(
            newState,
            "Ваш ход."
        );


    return newState;

}


function prepareOpponentTurn(
    state
) {

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


    let newState = {

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


    newState =
        addCombatLog(
            newState,
            "Ход противника."
        );


    return newState;

}


function getRandomPlayableCard(
    state
) {

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
                    getCardById(cardId)
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
                        opponent.board.length >=
                        5
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


function opponentPlayCards(
    state
) {

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


function canUnitAttack(
    unit
) {

    if (!unit) {
        return false;
    }


    return (
        unit.canAttack === true
    );

}


function calculateDamage(
    attack,
    defense
) {

    if (
        !Number.isFinite(attack)
    ) {

        return 1;

    }


    if (
        !Number.isFinite(defense)
    ) {

        defense = 0;

    }


    const damage =
        Math.round(
            attack *
            100 /
            (
                100 +
                defense / 10
            )
        );


    return Math.max(
        1,
        damage
    );

}


function attackUnit(
    state,
    playerId,
    attackerId,
    targetId
) {

    const player =
        state[playerId];


    const opponentId =
        playerId === "player"
            ? "opponent"
            : "player";


    const opponent =
        state[opponentId];


    if (
        !player ||
        !opponent
    ) {

        return state;

    }


    if (
        state.activePlayer !==
        playerId
    ) {

        return state;

    }


    const attacker =
        player.board.find(
            unit =>
                unit.instanceId ===
                attackerId
        );


    const target =
        opponent.board.find(
            unit =>
                unit.instanceId ===
                targetId
        );


    if (
        !attacker ||
        !target
    ) {

        console.log(
            "Атакующий или цель не найдены."
        );

        return state;

    }


    if (
        !canUnitAttack(
            attacker
        )
    ) {

        console.log(
            "Это существо пока не может атаковать."
        );

        return state;

    }


    const attackerCard =
        getCardById(
            attacker.cardId
        );


    const targetCard =
        getCardById(
            target.cardId
        );


    const attackerName =
        attackerCard
            ? attackerCard.name
            : "Существо";


    const targetName =
        targetCard
            ? targetCard.name
            : "Существо";


    const damageToTarget =
        calculateDamage(
            attacker.attack,
            target.defense
        );


    const damageToAttacker =
        calculateDamage(
            target.attack,
            attacker.defense
        );


    const attackerHealth =
        Math.max(
            0,
            attacker.health -
            damageToAttacker
        );


    const targetHealth =
        Math.max(
            0,
            target.health -
            damageToTarget
        );


    const newPlayerBoard =
        player.board

            .map(
                unit => {

                    if (
                        unit.instanceId ===
                        attackerId
                    ) {

                        return {

                            ...unit,

                            health:
                                attackerHealth,

                            canAttack:
                                false

                        };

                    }


                    return unit;

                }
            )

            .filter(
                unit =>
                    unit.health > 0
            );


    const newOpponentBoard =
        opponent.board

            .map(
                unit => {

                    if (
                        unit.instanceId ===
                        targetId
                    ) {

                        return {

                            ...unit,

                            health:
                                targetHealth

                        };

                    }


                    return unit;

                }
            )

            .filter(
                unit =>
                    unit.health > 0
            );


    let newState = {

        ...state,

        [playerId]: {

            ...player,

            board:
                newPlayerBoard

        },

        [opponentId]: {

            ...opponent,

            board:
                newOpponentBoard

        }

    };


    newState =
        addCombatLog(
            newState,

            attackerName +
            " атакует " +
            targetName +
            " и наносит " +
            damageToTarget +
            " урона."
        );


    if (
        targetHealth <= 0
    ) {

        newState =
            addCombatLog(
                newState,

                targetName +
                " погибает."
            );

    }


    if (
        attackerHealth > 0
    ) {

        newState =
            addCombatLog(
                newState,

                targetName +
                " наносит ответный удар и причиняет " +
                damageToAttacker +
                " урона."
            );

    }


    if (
        attackerHealth <= 0
    ) {

        newState =
            addCombatLog(
                newState,

                attackerName +
                " погибает."
            );

    }


    return newState;

}


function opponentAttack(
    state
) {

    let newState =
        state;


    while (
        newState.opponent.board
            .some(
                unit =>
                    unit.canAttack === true
            )
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


        /*
            Если на поле игрока
            ещё есть существа —
            атакуем случайное существо.

            Позже сюда можно поставить
            полноценный AI.
        */

        if (
            newState.player.board.length >
            0
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

        } else {

            /*
                Пока герой напрямую
                не атакуется существами.

                Это место оставляем
                для будущей логики.
            */

            break;

        }

    }


    return newState;

}


function opponentTurn(
    state
) {

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


function endTurn(
    state
) {

    if (
        state.activePlayer !==
        "player"
    ) {

        return state;

    }


    let newState =
        state;


    newState =
        addCombatLog(
            newState,
            "Вы завершили ход."
        );


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


function checkBattleResult(
    state
) {

    if (
        state.player.hp <= 0
    ) {

        return "defeat";

    }


    if (
        state.opponent.hp <= 0
    ) {

        return "victory";

    }


    return null;

}


window.addCombatLog =
    addCombatLog;


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


window.preparePlayerTurn =
    preparePlayerTurn;


window.prepareOpponentTurn =
    prepareOpponentTurn;


window.getRandomPlayableCard =
    getRandomPlayableCard;


window.opponentPlayCards =
    opponentPlayCards;


window.canUnitAttack =
    canUnitAttack;


window.calculateDamage =
    calculateDamage;


window.attackUnit =
    attackUnit;


window.opponentAttack =
    opponentAttack;


window.opponentTurn =
    opponentTurn;


window.endTurn =
    endTurn;


window.checkBattleResult =
    checkBattleResult;
