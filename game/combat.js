function canUnitAttack(unit) {

    if (!unit) {
        return false;
    }

    return unit.canAttack === true;

}


/*
    Минимальный урон обычной атаки.

    Существо всегда наносит хотя бы
    1% от своей Attack.

    Это нужно для того, чтобы маленькие
    существа не становились абсолютно
    бесполезными против очень высокой Defense.
*/

function calculateMinimumDamage(attack) {

    if (
        typeof attack !== "number" ||
        attack <= 0
    ) {

        return 1;

    }

    return Math.max(
        1,
        Math.round(attack * 0.01)
    );

}


/*
    Расчёт обычного физического урона.

    Формула:

    Damage =
    Attack × 100
    /
    (100 + Defense / 10)

    Defense не вычитается напрямую.

    Чем выше Defense,
    тем сильнее уменьшается
    входящий урон.
*/

function calculateDamage(attack, defense) {

    const safeAttack =
        typeof attack === "number" &&
        attack > 0
            ? attack
            : 0;

    const safeDefense =
        typeof defense === "number" &&
        defense > 0
            ? defense
            : 0;


    if (safeAttack <= 0) {
        return 1;
    }


    const damage =
        safeAttack *
        100 /
        (
            100 +
            safeDefense / 10
        );


    const minimumDamage =
        calculateMinimumDamage(
            safeAttack
        );


    return Math.max(
        minimumDamage,
        Math.round(damage)
    );

}


/*
    Атака одного существа другим.

    Оба существа одновременно
    получают физический урон.

    Атакующий:

    Attack атакующего
    ↓
    Defense цели
    ↓
    урон цели

    Защищающийся:

    Attack цели
    ↓
    Defense атакующего
    ↓
    урон атакующему
*/

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


    /*
        Ищем атакующего.
    */

    const attacker =
        player.board.find(
            unit =>
                unit.instanceId ===
                attackerId
        );


    /*
        Ищем цель.
    */

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


    /*
        Проверяем возможность атаки.
    */

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


    /*
        Рассчитываем урон атакующего
        по защищающемуся.
    */

    const damageToTarget =
        calculateDamage(
            attacker.attack,
            target.defense
        );


    /*
        Рассчитываем ответный удар.

        Пока ответный удар происходит
        всегда, если оба существа живы.
    */

    const damageToAttacker =
        calculateDamage(
            target.attack,
            attacker.defense
        );


    /*
        Новое здоровье атакующего.
    */

    const attackerHealth =
        Math.max(
            0,
            attacker.health -
            damageToAttacker
        );


    /*
        Новое здоровье цели.
    */

    const targetHealth =
        Math.max(
            0,
            target.health -
            damageToTarget
        );


    /*
        Обновляем поле атакующего.

        После атаки существо больше
        не может атаковать в этот ход.
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
        Обновляем поле противника.
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


    /*
        Возвращаем новое состояние игры.
    */

    return {

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

}


window.canUnitAttack =
    canUnitAttack;

window.calculateMinimumDamage =
    calculateMinimumDamage;

window.calculateDamage =
    calculateDamage;

window.attackUnit =
    attackUnit;
