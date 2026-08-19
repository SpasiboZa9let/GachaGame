/*
============================
GameBoard.jsx

Главный экран боя

Отвечает только за сборку:

- окончание боя
- игровое поле
- кнопки
- лог

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


            {(data) => {


                const player = data.player;

                const opponent = data.opponent;

                const handCards = data.handCards;

                const opponentHandCards = data.opponentHandCards;



                return (


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


                );


            }}


        </GameData>


    );


}




window.GameBoard = GameBoard;
