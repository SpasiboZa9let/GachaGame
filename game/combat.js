function canUnitAttack(unit) {

    if (!unit) {
        return false;
    }

    return unit.canAttack === true;

}


/*
    Атака одного существа другим.

    Пока используется простая модель:
    атакующий и защищающийся
    одновременно наносят друг другу урон.
*/

function attackUnit(state, playerId, attackerId, targetId) {

    const player = state[playerId];

    const opponentId =
        playerId === "player"
            ? "opponent"
            : "player";

    const opponent =
        state[opponentId];


    if (!player || !opponent) {
        return state;
    }


    /*
        Ищем атакующего.
    */

    const attacker =
        player.board.find(
            unit =>
                unit.instanceId === attackerId
        );


    /*
        Ищем цель.
    */

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


    /*
        Проверяем возможность атаки.
    */

    if (!canUnitAttack(attacker)) {

        console.log(
            "Это существо пока не может атаковать."
        );

        return state;

    }


    /*
        Наносим урон.
    */

    const attackerHealth =
        attacker.health - target.attack;


    const targetHealth =
        target.health - attacker.attack;


    /*
        Атакующий после атаки
        больше не может атаковать
        в этот ход.
    */

    const newPlayerBoard =
        player.board

            .map(unit => {

                if (
                    unit.instanceId === attackerId
                ) {

                    return {

                        ...unit,

                        health: attackerHealth,

                        canAttack: false

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
                    unit.instanceId === targetId
                ) {

                    return {

                        ...unit,

                        health: targetHealth

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

            board: newPlayerBoard

        },

        [opponentId]: {

            ...opponent,

            board: newOpponentBoard

        }

    };

}
