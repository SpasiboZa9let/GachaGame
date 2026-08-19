/*
    ============================
    TURN MANAGER

    Подготовка начала хода

    Отвечает за:

    - смену активного игрока
    - увеличение маны
    - восстановление атаки существ

    ============================
*/


window.TurnManager =
window.TurnManager || {};







function preparePlayerTurn(state){



    const maxMana =

        Math.min(

            10,

            state.player.maxMana + 1

        );






    return {


        ...state,



        activePlayer:"player",






        player:{



            ...state.player,



            maxMana:maxMana,



            mana:maxMana,





            board:


                state.player.board.map(


                    unit => ({


                        ...unit,


                        canAttack:true


                    })


                )



        }



    };


}









function prepareOpponentTurn(state){



    const maxMana =

        Math.min(

            10,

            state.opponent.maxMana + 1

        );








    return {


        ...state,



        activePlayer:"opponent",






        opponent:{



            ...state.opponent,



            maxMana:maxMana,



            mana:maxMana,





            board:


                state.opponent.board.map(


                    unit => ({


                        ...unit,


                        canAttack:true


                    })


                )



        }



    };


}









window.TurnManager.preparePlayerTurn =

preparePlayerTurn;



window.TurnManager.prepareOpponentTurn =

prepareOpponentTurn;
