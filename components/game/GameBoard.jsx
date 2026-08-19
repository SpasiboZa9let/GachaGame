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


    const scale = Math.min(

        window.innerWidth / 1600,

        window.innerHeight / 900

    );





    return (


        <div className="game-viewport">



            <div

                className="game-scale"

                style={{

                    transform:

                        `scale(${scale})`

                }}

            >





                <div className="game-table">






                    <aside className="combat-log-panel">


                        <GameLog

                            log={gameState.combatLog}

                        />


                    </aside>







                    <main className="battlefield-panel">



                        <GameData

                            gameState={gameState}

                        >


                            {(data)=> (



                                <Battlefield


                                    player={data.player}


                                    opponent={data.opponent}


                                    handCards={data.handCards}


                                    opponentHandCards={

                                        data.opponentHandCards

                                    }



                                    selectedAttacker={

                                        selectedAttacker

                                    }



                                    onCardClick={

                                        onCardClick

                                    }


                                    onPlayerUnitClick={

                                        onPlayerUnitClick

                                    }


                                    onOpponentUnitClick={

                                        onOpponentUnitClick

                                    }


                                    onOpponentHeroClick={

                                        onOpponentHeroClick

                                    }



                                />



                            )}


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


            </div>


        </div>


    );


}



window.GameBoard = GameBoard;
