/*
============================
Game.jsx

Главный контроллер игры

Отвечает за:
- состояние игры
- связь UI и игровых действий

Отображение:
components/game/GameBoard.jsx

Действия:
GameActions.js

============================
*/


function Game(){


    const [gameState,setGameState] = React.useState(
        () => window.State.createInitialGameState()
    );


    const [selectedAttacker,setSelectedAttacker] = React.useState(null);



    const actions = window.createGameActions({

        gameState,

        setGameState,

        selectedAttacker,

        setSelectedAttacker

    });



    return (

        <GameBoard

            gameState={gameState}

            selectedAttacker={selectedAttacker}


            onCardClick={actions.playCard}

            onPlayerUnitClick={actions.selectAttacker}

            onOpponentUnitClick={actions.attackUnit}

            onOpponentHeroClick={actions.attackHero}

            onEndTurn={actions.endTurn}

            onRestart={actions.restart}

            onTestBoard={actions.testBoard}

        />

    );


}



window.Game = Game;
