function canUnitAttack(unit) {

    if (!unit) {
        return false;
    }

    return unit.canAttack === true;

}


/*
    Расчёт обычного физического урона.

    Attack атакующего уменьшается
    защитой цели.

    Формула:

    Damage =
    Attack × 100 /
    (100 + Defense / 10)

    Минимальный урон:
    1% от Attack.
*/

function calculateDamage(
    attack,
    defense
) {

    const safeAttack =
        Math.max(
            0,
            Number(attack) || 0
        );

    const safeDefense =
        Math.max(
            0,
            Number(defense) || 0
        );


    const damage =
        safeAttack *
        100 /
        (
            100 +
            safeDefense / 10
        );


    const minimumDamage =
        safeAttack * 0.01;


    return Math.max(
        minimumDamage,
        Math.floor(damage)
    );

}


/*
    Атака существа по существу.
*/

function attackUnit(
    state,
    playerId,
    attackerId,
    targetId
) {

    if (!state || state.gameOver) {
        return state;
    }


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
                unit.instanceId === attackerId
        );


    const target =
        opponent.board.find(
            unit =>
                unit.instanceId === targetId
        );


    if (!attacker || !target) {

        console.log(
            "Атакующий или цель не найдены."
        );

        return state;

    }


    if (!canUnitAttack(attacker)) {

        console.log(
            "Это существо пока не может атаковать."
        );

        return state;

    }


    /*
        Рассчитываем урон
        с учётом защиты.
    */

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


    /*
        Обновляем поле атакующего.
    */

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
                            attackerHealth,

                        canAttack:
                            false

                    };

                }

                return unit;

            })

            .filter(
                unit =>
                    unit.health > 0
            );


    /*
        Обновляем поле цели.
    */

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
                            targetHealth

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



    /*
        Ответный удар.
    */

    newState =
        addCombatLog(
            newState,

            targetName +
            " отвечает и наносит " +
            damageToAttacker +
            " урона."
        );


    /*
        Проверяем смерть существ.
    */

    if (attackerHealth <= 0) {

        newState =
            addCombatLog(
                newState,

                attackerName +
                " погиб."
            );

    }


    if (targetHealth <= 0) {

        newState =
            addCombatLog(
                newState,

                targetName +
                " погиб."
            );

    }


    return checkGameOver(
        newState
    );

}


/*
    Атака героя существом.

    Пока герой не является
    отдельным существом на поле.

    Поэтому существо может
    атаковать непосредственно героя.
*/

function attackHero(
    state,
    playerId,
    attackerId
) {

    if (!state || state.gameOver) {
        return state;
    }


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


    const opponentHero =
        opponent.hero;


    const heroDefense =
        opponentHero
            ? opponentHero.defense
            : 0;


    const damage =
        calculateDamage(
            attacker.attack,
            heroDefense
        );


    const newOpponentHp =
        Math.max(
            0,
            opponent.hp -
            damage
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

                        canAttack:
                            false

                    };

                }

                return unit;

            });


    let newState = {

        ...state,

        [playerId]: {

            ...player,

            board:
                newPlayerBoard

        },

        [opponentId]: {

            ...opponent,

            hp:
                newOpponentHp

        }

    };


    const attackerCard =
        getCardById(
            attacker.cardId
        );


    const attackerName =
        attackerCard
            ? attackerCard.name
            : "Существо";


    const heroName =
        opponentHero
            ? opponentHero.name
            : "Герой";


    newState =
        addCombatLog(
            newState,

            attackerName +
            " атакует героя " +
            heroName +
            " и наносит " +
            damage +
            " урона."
        );


    return checkGameOver(
        newState
    );

}


window.canUnitAttack =
canUnitAttack;

window.calculateDamage =
calculateDamage;

window.attackUnit =
attackUnit;

window.attackHero =
attackHero;
