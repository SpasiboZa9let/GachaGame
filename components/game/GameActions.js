/*
============================
GameActions.js

Игровые действия

Отвечает за:
- розыгрыш карт
- атаки
- завершение хода
- рестарт
- тестовое поле

React state остаётся в Game.jsx
============================
*/


function createGameActions({


    gameState,

    setGameState,

    selectedAttacker,

    setSelectedAttacker


}){





    function playCard(card){


        if(!card){

            return;

        }





        if(gameState.activePlayer !== "player"){

            return;

        }






        const newState =

            window.CardPlay.playCard(

                gameState,

                "player",

                card.id

            );






        setGameState(newState);


    }









    function attackUnit(unitId){


        if(!selectedAttacker){

            return;

        }






        const newState =

            window.Combat.attackUnit(

                gameState,

                "player",

                selectedAttacker,

                unitId

            );






        setGameState(newState);


        setSelectedAttacker(null);


    }









    function attackHero(){


        if(!selectedAttacker){

            return;

        }






        const newState =

            window.Combat.attackUnit(

                gameState,

                "player",

                selectedAttacker,

                "hero"

            );






        setGameState(newState);


        setSelectedAttacker(null);


    }









    function endTurn(){


        if(gameState.gameOver){

            return;

        }






        const newState =

            window.Turns.endTurn(

                gameState

            );






        setGameState(newState);


        setSelectedAttacker(null);


    }









    function restart(){


        setSelectedAttacker(null);






        setGameState(

            window.State.createInitialGameState()

        );


    }









    function testBoard(){


        if(

            typeof window.createTestBoard !== "function"

        ){

            console.warn(

                "createTestBoard не найден"

            );


            return;

        }






        setGameState(

            window.createTestBoard(

                gameState

            )

        );


    }









    return {


        playCard,

        attackUnit,

        attackHero,

        endTurn,

        restart,

        testBoard


    };


}





window.createGameActions = createGameActions;
