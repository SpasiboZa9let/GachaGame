function canUnitAttack(unit) {

    if (!unit) {
        return false;
    }

    return unit.canAttack === true;

}


/*
    Расчёт урона.

    Attack атакующего не равен
    итоговому урону.

    Defense уменьшает входящий урон:

    Урон =
    Attack × 100 / (100 + Defense / 10)

    Минимальный урон =
    1% от Attack.
*/

function calculateDamage(
    attack,
    defense
) {

    attack =
        Number(attack) || 0;

    defense =
        Number(defense) || 0;


    const rawDamage =
        attack *
        100 /
        (
            100 +
            defense / 10
        );


    const minimumDamage =
        Math.max(
            1,
            Math.floor(
                attack * 0.01
            )
        );


    return Math.max(
        minimumDamage,
        Math.floor(rawDamage)
    );

}


/*
    Добавление сообщения
    в журнал боя.
*/

function combatLog(
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
    Атака существа
    по существу.
*/

function attackUnit(
    state,
    playerId,
    attackerId,
    targetId
) {

    if (
        !state ||
        state.gameOver
    ) {

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


    if (
        !player ||
        !opponent
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
        !canUnitAttack(attacker)
    ) {

        console.log(
            "Это существо не может атаковать."
        );

        return state;

    }


    /*
        Урон атакующего
        по цели.
    */

    const damageToTarget =
        calculateDamage(
            attacker.attack,
            target.defense
        );


    /*
        Ответный урон
        по атакующему.
    */

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


    /*
        Обновляем поле цели.
    */

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


    const attackerCard =
        window.getCardById(
            attacker.cardId
        );


    const targetCard =
        window.getCardById(
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
        combatLog(
            newState,

            (
                playerId === "player"
                    ? "Вы"
                    : "Василиса"
            ) +

            " атакуют «" +

            attackerName +

            "» → «" +

            targetName +

            "»: " +

            damageToTarget +

            " урона."

        );


    /*
        Ответный удар.
    */

    newState =
        combatLog(
            newState,

            "Ответный удар: «" +

            targetName +

            "» наносит " +

            damageToAttacker +

            " урона."

        );


    /*
        Проверяем смерть существ.
    */

    if (
        targetHealth <= 0
    ) {

        newState =
            combatLog(
                newState,

                "«" +
                targetName +
                "» погибает."

            );

    }


    if (
        attackerHealth <= 0
    ) {

        newState =
            combatLog(
                newState,

                "«" +
                attackerName +
                "» погибает."

            );

    }


    /*
        После боя проверяем
        окончание игры.
    */

    if (
        window.checkGameOver
    ) {

        newState =
            window.checkGameOver(
                newState
            );

    }


    return newState;

}


/*
    Атака героя.

    Герой находится вне поля,
    поэтому существо наносит
    урон непосредственно HP героя.

    Defense героя участвует
    в расчёте урона.
*/

function attackHero(
    state,
    playerId,
    attackerId
) {

    if (
        !state ||
        state.gameOver
    ) {

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


    if (
        !player ||
        !opponent ||
        !opponent.hero
    ) {

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


    if (
        !canUnitAttack(attacker)
    ) {

        return state;

    }


    const heroDefense =
        Number(
            opponent.hero.defense
        ) || 0;


    const damage =
        calculateDamage(
            attacker.attack,
            heroDefense
        );


    const newHeroHP =
        Math.max(
            0,
            opponent.hp -
            damage
        );


    const newBoard =
        player.board.map(
            unit => {

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

            }
        );


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


    const attackerCard =
        window.getCardById(
            attacker.cardId
        );


    const attackerName =
        attackerCard
            ? attackerCard.name
            : "Существо";


    const heroName =
        opponent.hero.name ||
        (
            opponentId === "player"
                ? "Игрок"
                : "Василиса"
        );


    newState =
        combatLog(
            newState,

            "«" +
            attackerName +
            "» атакует героя «" +
            heroName +
            "» и наносит " +
            damage +
            " урона."

        );


    /*
        Проверяем победу.
    */

    if (
        window.checkGameOver
    ) {

        newState =
            window.checkGameOver(
                newState
            );

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
