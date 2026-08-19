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


                    <div style={styles.game}>


                        <GameOver

                            gameState={gameState}

                            onRestart={onRestart}

                        />





                        <div style={styles.topPanel}>


                            <GameControls

                                onEndTurn={onEndTurn}

                                onTestBoard={onTestBoard}

                            />





                            <div style={styles.logBox}>


                                <GameLog

                                    log={gameState.combatLog}

                                />


                            </div>


                        </div>








                        <div style={styles.field}>


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


                        </div>




                    </div>


                );


            }}


        </GameData>


    );


}








const styles = {


    game:{


        width:"100%",


        minHeight:"100vh",


        padding:"10px",


        boxSizing:"border-box",


        display:"flex",


        flexDirection:"column",


        gap:"10px",


        alignItems:"center"


    },





    topPanel:{


        width:"100%",


        display:"flex",


        justifyContent:"space-between",


        alignItems:"center"


    },





    logBox:{


        width:"220px",


        height:"120px",


        overflow:"hidden"


    },





    field:{


        width:"100%",


        display:"flex",


        justifyContent:"center"


    }


};






window.GameBoard = GameBoard;
