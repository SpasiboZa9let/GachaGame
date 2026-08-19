/*
============================
GameBoard.jsx

Главный экран боя

Отвечает только за сборку:

- окончание боя
- игровое поле
- кнопки
- лог

Данные подготавливает GameData

Отображение поля:
Battlefield.jsx

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


        <GameData gameState={gameState}>


            ({


                player,

                opponent,

                handCards,

                opponentHandCards


            }) => (



                <div style={window.gameStyles.game}>





                    <GameOver

                        gameState={gameState}

                        onRestart={onRestart}

                    />







                    <Battlefield


                        player={player}


                        opponent={opponent}


                        handCards={handCards}


                        opponentHandCards={opponentHandCards}


                        selectedAttacker={selectedAttacker}


                        onCardClick={onCardClick}


                        onPlayerUnitClick={onPlayerUnitClick}


                        onOpponentUnitClick={onOpponentUnitClick}


                        onOpponentHeroClick={onOpponentHeroClick}


                        turn={gameState.turn}


                    />








                    <GameControls


                        onEndTurn={onEndTurn}


                        onTestBoard={onTestBoard}


                    />









                    <GameLog


                        log={gameState.combatLog}


                    />





                </div>


            )


        </GameData>


    );


}





window.GameBoard = GameBoard;
