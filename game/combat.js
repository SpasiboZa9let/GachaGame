function canUnitAttack(unit) {

    if (!unit) {
        return false;
    }

    return unit.canAttack === true;

}


function calculateDamage(attack, defense) {

    const safeAttack =
        Math.max(0, Number(attack) || 0);

    const safeDefense =
        Math.max(0, Number(defense) || 0);

    const damage =
        safeAttack *
        100 /
        (100 + safeDefense / 10);

    const minimumDamage =
        safeAttack * 0.01;

    return Math.max(
        1,
        Math.round(
            Math.max(
                damage,
                minimumDamage
            )
        )
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


    if (!player || !opponent) {
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


    if (!attacker || !target) {
        return state;
    }


    if (!canUnitAttack(attacker)) {
        return state;
    }


    const attackerDefense =
        attacker.defense || 0;

    const targetDefense =
        target.defense || 0;


    const damageToTarget =
        calculateDamage(
            attacker.attack,
            targetDefense
        );


    const damageToAttacker =
        calculateDamage(
            target.attack,
            attackerDefense
        );


    const newAttackerHealth =
        Math.max(
            0,
            attacker.health -
            damageToAttacker
        );


    const newTargetHealth =
        Math.max(
            0,
            target.health -
            damageToTarget
        );


    const newPlayerBoard =
        player.board
            .map(unit => {

                if (
                    unit.instanceId ===
                    attackerId
                ) {

                    return {
                        ...unit,
                        health:
                            newAttackerHealth,
                        canAttack: false
                    };

                }

                return unit;

            })
            .filter(
                unit =>
                    unit.health > 0
            );


    const newOpponentBoard =
        opponent.board
            .map(unit => {

                if (
                    unit.instanceId ===
                    targetId
                ) {

                    return {
                        ...unit,
                        health:
                            newTargetHealth
                    };

                }

                return unit;

            })
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


    if (
        Array.isArray(
            newState.combatLog
        )
    ) {

        newState.combatLog = [
            ...newState.combatLog,

            `${getCardName(attacker.cardId)} атакует ${getCardName(target.cardId)}: ${damageToTarget} урона.`

        ];

    }


    return newState;

}


function getCardName(cardId) {

    const card =
        getCardById(cardId);

    return card
        ? card.name
        : cardId;

}


function attackHero(
    state,
    playerId,
    attackerId
) {

    const player =
        state[playerId];

    const opponentId =
        playerId === "player"
            ? "opponent"
            : "player";

    const opponent =
        state[opponentId];


    if (!player || !opponent) {
        return state;
    }


    const attacker =
        player.board.find(
            unit =>
                unit.instanceId ===
                attackerId
        );


    if (!attacker) {
        return state;
    }


    if (!canUnitAttack(attacker)) {
        return state;
    }


    const heroDefense =
        opponent.hero &&
        opponent.hero.defense
            ? opponent.hero.defense
            : 0;


    const damage =
        calculateDamage(
            attacker.attack,
            heroDefense
        );


    const newHeroHP =
        Math.max(
            0,
            opponent.hp - damage
        );


    const newBoard =
        player.board
            .map(unit => {

                if (
                    unit.instanceId ===
                    attackerId
                ) {

                    return {
                        ...unit,
                        canAttack: false
                    };

                }

                return unit;

            });


    let newState = {

        ...state,

        [playerId]: {

            ...player,

            board:
                newBoard

        },

        [opponentId]: {

            ...opponent,

            hp:
                newHeroHP

        }

    };


    if (
        Array.isArray(
            newState.combatLog
        )
    ) {

        newState.combatLog = [
            ...newState.combatLog,

            `${getCardName(attacker.cardId)} атакует героя ${opponent.hero ? opponent.hero.name : "противника"} и наносит ${damage} урона.`

        ];

    }


    if (newHeroHP <= 0) {

        newState.gameOver = true;

        newState.winner =
            playerId;

    }


    return newState;

}


function opponentAttack(state) {

    let newState =
        state;


    const attackers =
        newState.opponent.board
            .filter(
                unit =>
                    unit.canAttack === true
            );


    for (
        let i = 0;
        i < attackers.length;
        i++
    ) {

        if (
            newState.gameOver
        ) {
            break;
        }


        const attacker =
            newState.opponent.board.find(
                unit =>
                    unit.instanceId ===
                    attackers[i].instanceId
            );


        if (!attacker) {
            continue;
        }


        if (
            !canUnitAttack(attacker)
        ) {
            continue;
        }


        /*
            Если у игрока есть существа,
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


            newState =
                attackUnit(
                    newState,
                    "opponent",
                    attacker.instanceId,
                    target.instanceId
                );


        }

        /*
            Если существ игрока нет,
            атакуем непосредственно героя.
        */

        else {

            newState =
                attackHero(
                    newState,
                    "opponent",
                    attacker.instanceId
                );

        }

    }


    return newState;

}


window.canUnitAttack =
    canUnitAttack;

window.calculateDamage =
    calculateDamage;

window.attackUnit =
    attackUnit;

window.attackHero =
    attackHero;

window.opponentAttack =
    opponentAttack;
