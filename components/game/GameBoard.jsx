/*
============================

GameBoard.jsx

Главная игровая сцена

Отвечает только за сборку UI

Логика находится в:
Game.jsx
GameActions.js
game/

============================
*/


function GameBoard({

    gameState,

    selectedAttacker,

    onCardClick,

    onPlayerUnitClick,

    onOpponentUnitClick,

    onOpponentHeroClick,

    onEndTurn,

    onRestart,

    onTestBoard


}){


return (

<div className="game-table">



    <aside className="combat-log-panel">


        <GameLog

            gameState={gameState}

        />


    </aside>





    <main className="battlefield-panel">


        <GameData gameState={gameState}>


        {(data)=>{


            return (


                <Battlefield


                    player={data.player}


                    opponent={data.opponent}


                    handCards={data.handCards}


                    opponentHandCards={data.opponentHandCards}



                    selectedAttacker={selectedAttacker}



                    onCardClick={onCardClick}


                    onPlayerUnitClick={onPlayerUnitClick}


                    onOpponentUnitClick={onOpponentUnitClick}


                    onOpponentHeroClick={onOpponentHeroClick}


                />


            );


        }}


        </GameData>


    </main>







    <aside className="game-controls-panel">


        <GameControls


            onEndTurn={onEndTurn}


            onRestart={onRestart}


            onTestBoard={onTestBoard}


        />


    </aside>




</div>


);


}



window.GameBoard = GameBoard;
