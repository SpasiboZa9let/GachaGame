function endTurn(state) {

    console.log(
        "🔥 END TURN FROM turns.js",
        "turn:",
        state.turn,
        "mana:",
        state.player.mana,
        "maxMana:",
        state.player.maxMana
    );


    /*
        Сейчас ход всегда принадлежит игроку.

        Позже здесь сделаем:
        игрок → противник → игрок.
    */

    if (state.activePlayer !== "player") {

        console.log(
            "Ход сейчас не игрока."
        );

        return state;

    }


    /*
        Увеличиваем номер хода.
    */

    const newTurn =
        state.turn + 1;


    /*
        Увеличиваем максимальную ману.

        Максимум — 10.
    */

    const newMaxMana =
        Math.min(
            state.player.maxMana + 1,
            10
        );


    /*
        Разрешаем существам атаковать
        в начале нового хода.
    */

    const newBoard =
        (state.player.board || [])
            .map(unit => ({

                ...unit,

                canAttack: true

            }));


    const newState = {

        ...state,

        turn: newTurn,

        activePlayer: "player",


        player: {

            ...state.player,

            maxMana:
                newMaxMana,

            mana:
                newMaxMana,

            board:
                newBoard

        }

    };


    console.log(
        "🔥 НОВОЕ СОСТОЯНИЕ:",
        "turn:",
        newState.turn,
        "mana:",
        newState.player.mana,
        "maxMana:",
        newState.player.maxMana
    );


    return newState;

}
