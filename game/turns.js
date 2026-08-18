function endTurn(state) {

    /*
        Если сейчас не ход игрока —
        ничего не делаем.
    */

    if (state.activePlayer !== "player") {
        return state;
    }


    /*
        Следующий ход.
    */

    const newTurn =
        state.turn + 1;


    /*
        Увеличиваем максимальную ману
        максимум до 10.
    */

    const newMaxMana =
        Math.min(
            state.player.maxMana + 1,
            10
        );


    /*
        Подготавливаем существ игрока.

        После начала нового хода
        они снова могут атаковать.
    */

    const newPlayerBoard =
        state.player.board.map(unit => ({

            ...unit,

            canAttack: true

        }));


    /*
        Возвращаем новое состояние.
    */

    return {

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
                newPlayerBoard

        }

    };

}
