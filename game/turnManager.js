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







function preparePlayerTurn(state){



    return {


        ...state,



        activePlayer:"player",






        player:{



            ...state.player,






            maxMana:


                Math.min(

                    10,

                    state.player.maxMana + 1

                ),







            mana:


                Math.min(

                    10,

                    state.player.maxMana + 1

                ),







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



    return {


        ...state,



        activePlayer:"opponent",






        opponent:{



            ...state.opponent,






            maxMana:


                Math.min(

                    10,

                    state.opponent.maxMana + 1

                ),







            mana:


                Math.min(

                    10,

                    state.opponent.maxMana + 1

                ),







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








window.preparePlayerTurn =
preparePlayerTurn;



window.prepareOpponentTurn =
prepareOpponentTurn;
