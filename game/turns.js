function endTurn(state) {

    if (state.activePlayer !== "player") {

        return state;

    }


    const newTurn =
        state.turn + 1;


    let newMaxMana =
        state.player.maxMana;


    /*
        Максимальная мана увеличивается
        каждый новый ход.

        Пока ограничиваем её десятью.
    */

    if (newMaxMana < 10) {

        newMaxMana += 1;

    }


    return {

        ...state,

        turn: newTurn,

        activePlayer: "player",

        player: {

            ...state.player,

            maxMana: newMaxMana,

            mana: newMaxMana,

            board:
                state.player.board.map(
                    unit => ({

                        ...unit,

                        canAttack: true

                    })
                )

        }

    };

}
