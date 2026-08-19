/*
============================
GameActions.js

Игровые действия

Отвечает за:
- розыгрыш карт
- выбор атакующего существа
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






    /*
        Разыграть карту
    */


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









    /*
        Выбор своего существа
    */


    function selectAttacker(unit){


        if(!unit){

            return;

        }





        if(gameState.activePlayer !== "player"){

            return;

        }






        if(!window.Combat.canUnitAttack(unit)){

            return;

        }







        if(selectedAttacker === unit.instanceId){


            setSelectedAttacker(null);


            return;


        }







        setSelectedAttacker(

            unit.instanceId

        );


    }









    /*
        Атака существа
    */


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









    /*
        Атака героя
    */


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









    /*
        Завершение хода
    */


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









    /*
        Перезапуск
    */


    function restart(){


        setSelectedAttacker(null);






        setGameState(

            window.State.createInitialGameState()

        );


    }









    /*
        Тестовое поле
    */


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

        selectAttacker,

        attackUnit,

        attackHero,

        endTurn,

        restart,

        testBoard


    };


}







window.createGameActions = createGameActions;
