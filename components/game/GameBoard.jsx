/*
============================
GameBoard.jsx

Отображение игрового экрана

Логика остаётся в Game.jsx

Этот компонент только рисует:
- противника
- игрока
- поле
- руки
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


            {({


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









                    <OpponentArea

                        opponent={opponent}

                        opponentHandCards={opponentHandCards}

                        selectedAttacker={selectedAttacker}

                        onOpponentUnitClick={onOpponentUnitClick}

                        onOpponentHeroClick={onOpponentHeroClick}

                    />









                    <GameTurn

                        selectedAttacker={selectedAttacker}

                        turn={gameState.turn}

                    />









                    <PlayerArea

                        player={player}

                        selectedAttacker={selectedAttacker}

                        onPlayerUnitClick={onPlayerUnitClick}

                    />









                    <PlayerHand

                        cards={handCards}

                        onCardClick={onCardClick}

                    />









                    <GameControls

                        onEndTurn={onEndTurn}

                        onTestBoard={onTestBoard}

                    />









                    <GameLog

                        log={gameState.combatLog}

                    />







                </div>



            )}


        </GameData>


    );


}





window.GameBoard = GameBoard;
