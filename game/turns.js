function endTurn(state) {

    if (
        state.activePlayer !==
        "player"
    ) {

        return state;

    }


    let newMaxMana =
        state.player.maxMana;


    /*
        Каждый новый ход
        +1 максимальная мана.

        Максимум — 10.
    */

    if (
        newMaxMana < 10
    ) {

        newMaxMana += 1;

    }


    /*
        Все существа игрока
        снова получают возможность атаковать.
    */

    const refreshedBoard =
        state.player.board.map(
            unit => ({

                ...unit,

                canAttack: true

            })
        );


    return {

        ...state,

        turn:
            state.turn + 1,

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

}
