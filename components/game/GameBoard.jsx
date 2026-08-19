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







            <section>


                <h3>

                    Противник

                </h3>





                <Hand

                    cards={opponentHandCards}

                />






                <div

                    onClick={onOpponentHeroClick}

                    style={

                        selectedAttacker

                        ?

                        gameStyles.target

                        :

                        {}

                    }

                >



                    <Hero

                        hero={opponent.hero}

                        hp={opponent.hp}

                        mana={opponent.mana}

                        maxMana={opponent.maxMana}

                    />



                </div>







                <Board

                    units={opponent.board || []}

                    onUnitClick={onOpponentUnitClick}

                    selectedUnitId={null}

                />



            </section>









            <div style={gameStyles.turn}>


                {

                    selectedAttacker

                    ?

                    "⚔️ Выберите цель"

                    :

                    "Ход: " + gameState.turn

                }


            </div>









            <section>


                <h3>

                    Игрок

                </h3>






                <Board

                    units={player.board || []}

                    onUnitClick={onPlayerUnitClick}

                    selectedUnitId={selectedAttacker}

                />








                <Hero

                    hero={player.hero}

                    hp={player.hp}

                    mana={player.mana}

                    maxMana={player.maxMana}

                />



            </section>









            <Hand

                cards={handCards}

                onCardClick={onCardClick}

            />









            <button

                style={gameStyles.button}

                onClick={onEndTurn}

            >

                Завершить ход

            </button>








            <button

                style={gameStyles.button}

                onClick={onTestBoard}

            >

                🧪 Тестовое поле

            </button>








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
