function Game(){


    const [gameState,setGameState] =

        React.useState(

            () => createInitialGameState()

        );



    const [selectedAttacker,setSelectedAttacker] =

        React.useState(null);





    const player =
        gameState.player;



    const opponent =
        gameState.opponent;





    const handCards =

        (player.hand || [])

        .map(

            cardId =>

                getCardById(cardId)

        )

        .filter(

            card => card

        );









    function handleCardClick(card){


        if(!card)

            return;



        if(
            gameState.activePlayer !== "player"
        )

            return;



        const newState =

            playCard(

                gameState,

                "player",

                card.id

            );



        setGameState(
            newState
        );


    }









    function handlePlayerUnitClick(unit){


        if(!unit)

            return;



        if(
            gameState.activePlayer !== "player"
        )

            return;





        if(
            selectedAttacker === unit.instanceId
        ){


            setSelectedAttacker(null);


            return;


        }







        if(
            !canUnitAttack(unit)
        ){


            return;


        }






        setSelectedAttacker(

            unit.instanceId

        );


    }









    function handleOpponentUnitClick(unit){


        if(
            !selectedAttacker
        )

            return;





        const newState =

            attackUnit(

                gameState,

                "player",

                selectedAttacker,

                unit.instanceId

            );





        setGameState(
            newState
        );



        setSelectedAttacker(null);



    }









    /*
        Атака героя противника

        Вся логика теперь в combat.js
    */


    function handleOpponentHeroClick(){


        if(
            !selectedAttacker
        )

            return;





        const newState =

            attackUnit(

                gameState,

                "player",

                selectedAttacker,

                "hero"

            );





        setGameState(

            newState

        );





        setSelectedAttacker(null);



    }









    function handleEndTurn(){


        if(
            gameState.gameOver
        )

            return;




        if(
            gameState.activePlayer !== "player"
        )

            return;





        setSelectedAttacker(null);





        const newState =

            endTurn(

                gameState

            );





        setGameState(

            newState

        );



    }









    function handleRestart(){


        setSelectedAttacker(null);



        setGameState(

            restartGame()

        );


    }









    return (


        <div style={gameStyles.game}>


            {
                gameState.gameOver &&


                <div style={gameStyles.gameOver}>


                    <h2>


                        {

                            gameState.winner === "player"

                            ?

                            "🏆 ПОБЕДА"

                            :

                            "☠️ ПОРАЖЕНИЕ"


                        }


                    </h2>



                    <button

                        onClick={handleRestart}

                        style={gameStyles.restart}

                    >

                        Начать заново

                    </button>



                </div>


            }









            <section style={gameStyles.opponentSection}>



                <div

                    onClick={handleOpponentHeroClick}

                    style={

                        selectedAttacker

                        ?

                        gameStyles.enemyHeroClickable

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

                    onUnitClick={handleOpponentUnitClick}

                    selectedUnitId={null}

                />



            </section>









            <div style={gameStyles.center}>


                {

                    selectedAttacker

                    ?

                    <span style={gameStyles.attackMode}>

                        Выберите цель

                    </span>


                    :


                    <span>

                        Ход: {gameState.turn}

                    </span>


                }


            </div>









            <section style={gameStyles.playerSection}>


                <Board

                    units={player.board || []}

                    onUnitClick={handlePlayerUnitClick}

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

                onCardClick={handleCardClick}

            />









            <button

                onClick={handleEndTurn}

                style={gameStyles.endTurn}

            >

                Завершить ход

            </button>









            <div style={gameStyles.log}>


                {

                    (gameState.combatLog || [])

                    .slice(-8)

                    .map(

                        (text,index)=>(

                            <div key={index}>

                                {text}

                            </div>

                        )

                    )


                }


            </div>





        </div>


    );


}









const gameStyles = {



    game:{


        width:"100%",


        display:"flex",


        flexDirection:"column",


        alignItems:"center",


        gap:"10px",


        padding:"10px"


    },




    opponentSection:{


        width:"100%",


        display:"flex",


        flexDirection:"column",


        alignItems:"center"


    },




    playerSection:{


        width:"100%",


        display:"flex",


        flexDirection:"column",


        alignItems:"center"


    },




    center:{


        height:"35px",


        display:"flex",


        alignItems:"center",


        justifyContent:"center"


    },




    attackMode:{


        color:"#ffd700",


        fontWeight:"bold"


    },




    enemyHeroClickable:{


        cursor:"crosshair",


        filter:"drop-shadow(0 0 15px red)"


    },




    endTurn:{


        padding:"12px 35px",


        borderRadius:"8px",


        border:"none",


        background:"#444",


        color:"#fff",


        cursor:"pointer"


    },




    log:{


        width:"90%",


        maxHeight:"120px",


        overflow:"hidden",


        background:"#111",


        border:"1px solid #333",


        borderRadius:"8px",


        padding:"10px",


        fontSize:"13px"


    },




    gameOver:{


        position:"fixed",


        top:"40%",


        left:"50%",


        transform:"translate(-50%,-50%)",


        background:"#222",


        padding:"30px",


        borderRadius:"15px",


        zIndex:10


    },




    restart:{


        padding:"12px 25px",


        borderRadius:"8px",


        cursor:"pointer"


    }



};


<button
onClick={()=>{
    setGameState(
        createTestBoard(gameState)
    );
}}
>
🧪 Тестовое поле
</button>


window.Game = Game;
