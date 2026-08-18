function canUnitAttack(unit) {

    if (!unit) {
        return false;
    }

    return unit.canAttack === true;

}


function calculateDamage(attack, defense) {

    attack =
        Number(attack) || 0;

    defense =
        Number(defense) || 0;


    const damage =
        attack *
        100 /
        (
            100 +
            defense / 10
        );


    return Math.max(
        1,
        Math.floor(damage)
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
        Урон атакующего по цели.
    */

    const damageToTarget =
        calculateDamage(
            attacker.attack,
            target.defense
        );


    /*
        Ответный урон.
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
        Обновляем атакующего.
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
        Обновляем цель.
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
        Журнал боя.
    */

    let newCombatLog =
        [
            ...(state.combatLog || [])
        ];


    const attackerCard =
        window.getCardById
            ? window.getCardById(
                attacker.cardId
            )
            : null;


    const targetCard =
        window.getCardById
            ? window.getCardById(
                target.cardId
            )
            : null;


    const attackerName =
        attackerCard
            ? attackerCard.name
            : "Существо";


    const targetName =
        targetCard
            ? targetCard.name
            : "Существо";


    newCombatLog.push(
        attackerName +
        " атакует " +
        targetName +
        " и наносит " +
        damageToTarget +
        " урона."
    );


    newCombatLog.push(
        targetName +
        " отвечает и наносит " +
        damageToAttacker +
        " урона."
    );


    if (targetHealth <= 0) {

        newCombatLog.push(
            targetName +
            " погибает."
        );

    }


    if (attackerHealth <= 0) {

        newCombatLog.push(
            attackerName +
            " погибает."
        );

    }


    return {

        ...state,


        combatLog:
            newCombatLog,


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


window.calculateDamage =
    calculateDamage;


window.attackUnit =
    attackUnit;
