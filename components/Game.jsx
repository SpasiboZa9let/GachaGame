/*
    ============================
    GAME.JSX

    Главный компонент игры

    Отвечает за:

    - состояние игры
    - управление ходом игрока
    - розыгрыш карт
    - выбор атакующего
    - атаки

    Отображение вынесено в:
    
    components/game/GameBoard.jsx

    ============================
*/


function Game(){


    const [gameState,setGameState] =

        React.useState(

            () =>

            window.State.createInitialGameState()

        );





    const [selectedAttacker,setSelectedAttacker] =

        React.useState(null);






    /*
        Разыграть карту
    */


    function handleCardClick(card){


        if(!card){

            return;

        }



        if(

            gameState.activePlayer !== "player"

        ){

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


    function handlePlayerUnitClick(unit){


        if(!unit){

            return;

        }




        if(

            gameState.activePlayer !== "player"

        ){

            return;

        }





        if(

            !window.Combat.canUnitAttack(unit)

        ){

            return;

        }






        if(

            selectedAttacker === unit.instanceId

        ){


            setSelectedAttacker(null);


            return;


        }






        setSelectedAttacker(

            unit.instanceId

        );


    }








    /*
        Атака существа противника
    */


    function handleOpponentUnitClick(unit){


        if(

            !selectedAttacker

        ){

            return;

        }







        const newState =


            window.Combat.attackUnit(


                gameState,


                "player",


                selectedAttacker,


                unit.instanceId


            );






        setGameState(newState);


        setSelectedAttacker(null);


    }








    /*
        Атака героя противника
    */


    function handleOpponentHeroClick(){


        if(

            !selectedAttacker

        ){

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


    function handleEndTurn(){


        if(

            gameState.gameOver

        ){

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
        Перезапуск игры
    */


    function handleRestart(){


        setSelectedAttacker(null);




        setGameState(


            window.State.createInitialGameState()


        );


    }








    /*
        Тестовое поле
    */


    function handleTestBoard(){


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








    return (


        <GameBoard


            gameState={gameState}


            selectedAttacker={selectedAttacker}



            onCardClick={handleCardClick}


            onPlayerUnitClick={handlePlayerUnitClick}


            onOpponentUnitClick={handleOpponentUnitClick}


            onOpponentHeroClick={handleOpponentHeroClick}



            onEndTurn={handleEndTurn}


            onRestart={handleRestart}


            onTestBoard={handleTestBoard}


        />


    );


}





window.Game = Game;
