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


    const player = gameState.player;

    const opponent = gameState.opponent;





    const handCards =

        (player.hand || [])

        .map(

            cardId =>

            window.Cards.getCardById(cardId)

        )

        .filter(Boolean);







    const opponentHandCards =

        (opponent.hand || [])

        .map(

            cardId =>

            window.Cards.getCardById(cardId)

        )

        .filter(Boolean);








    return (


        <div style={gameStyles.game}>





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









            <div style={gameStyles.turn}>


                {

                    selectedAttacker

                    ?

                    "⚔️ Выберите цель"

                    :

                    "Ход: " + gameState.turn

                }


            </div>









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


    );


}








const gameStyles = {


    game:{


        padding:"20px",

        display:"flex",

        flexDirection:"column",

        alignItems:"center",

        gap:"15px"


    },



    turn:{


        fontSize:"20px",

        fontWeight:"bold"


    },



    button:{


        padding:"12px 30px",

        background:"#444",

        color:"#fff",

        border:"none",

        borderRadius:"8px",

        cursor:"pointer"


    },



    target:{


        cursor:"crosshair",

        filter:"drop-shadow(0 0 15px red)"


    },



    log:{


        width:"90%",

        background:"#111",

        padding:"10px",

        borderRadius:"8px",

        fontSize:"14px"


    },



    gameOver:{


        position:"fixed",

        top:"40%",

        left:"50%",

        transform:"translate(-50%,-50%)",

        background:"#222",

        padding:"30px",

        borderRadius:"15px",

        zIndex:100


    },



    restart:{


        padding:"10px 25px",

        cursor:"pointer"


    }


};






window.GameBoard = GameBoard;
