/*
    ============================
    GAME.JSX

    Главный контроллер игры

    Логика:
    - состояние игры
    - атаки
    - ходы
    - карты
    - рестарт

    Отрисовка:
    - Battlefield
    - SidePanel
    - GameOver

    ============================
*/


function Game(){



    const [gameState,setGameState] =

        React.useState(

            () =>

            window.State.createInitialGameState()

        );





    const [selectedAttacker,setSelectedAttacker] =

        React.useState(null);






    const player =

        gameState.player;



    const opponent =

        gameState.opponent;








    const playerHandCards =


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









    function handleCardClick(card){


        if(!card){

            return;

        }



        if(

            gameState.activePlayer !== "player"

        ){

            return;

        }







        const newState =


            window.CardPlay.playCard(

                gameState,

                "player",

                card.id

            );







        setGameState(newState);


    }









    function handlePlayerUnitClick(unit){



        if(!unit){

            return;

        }





        if(

            gameState.activePlayer !== "player"

        ){

            return;

        }







        if(

            !window.Combat.canUnitAttack(unit)

        ){

            return;

        }








        if(

            selectedAttacker === unit.instanceId

        ){


            setSelectedAttacker(null);


            return;


        }







        setSelectedAttacker(

            unit.instanceId

        );


    }









    function handleOpponentUnitClick(unit){



        if(

            !selectedAttacker

        ){

            return;

        }








        const newState =


            window.Combat.attackUnit(

                gameState,

                "player",

                selectedAttacker,

                unit.instanceId

            );







        setGameState(newState);



        setSelectedAttacker(null);


    }









    function handleOpponentHeroClick(){



        if(

            !selectedAttacker

        ){

            return;

        }








        const newState =


            window.Combat.attackUnit(

                gameState,

                "player",

                selectedAttacker,

                "hero"

            );







        setGameState(newState);



        setSelectedAttacker(null);


    }









    function handleEndTurn(){



        if(

            gameState.gameOver

        ){

            return;

        }








        const newState =


            window.Turns.endTurn(

                gameState

            );







        setGameState(newState);



        setSelectedAttacker(null);


    }









    function handleRestart(){



        setSelectedAttacker(null);





        setGameState(

            window.State.createInitialGameState()

        );


    }









    function handleTestBoard(){



        if(

            typeof window.createTestBoard !== "function"

        ){

            console.warn(

                "createTestBoard не найден"

            );


            return;

        }







        setGameState(

            window.createTestBoard(

                gameState

            )

        );


    }









    return (

        <div style={styles.page}>





            <GameOver


                gameOver={gameState.gameOver}


                winner={gameState.winner}


                onRestart={handleRestart}


            />









            <div style={styles.turn}>


                {

                selectedAttacker

                ?

                "⚔️ Выберите цель"

                :

                "Ход: " + gameState.turn

                }


            </div>









            <div style={styles.layout}>


                <div style={styles.field}>


                    <Battlefield



                        opponent={opponent}


                        opponentHandCards={opponentHandCards}



                        player={player}


                        playerHandCards={playerHandCards}



                        onOpponentHeroClick={
                            handleOpponentHeroClick
                        }



                        onOpponentUnitClick={
                            handleOpponentUnitClick
                        }



                        onPlayerUnitClick={
                            handlePlayerUnitClick
                        }



                        onCardClick={
                            handleCardClick
                        }



                        selectedAttacker={
                            selectedAttacker
                        }


                    />


                </div>








                <SidePanel


                    combatLog={
                        gameState.combatLog
                    }


                    onEndTurn={
                        handleEndTurn
                    }


                    onTestBoard={
                        handleTestBoard
                    }


                />



            </div>


        </div>

    );


}









const styles = {



    page:{


        width:"100%",


        minHeight:"100vh",


        padding:"20px",


        display:"flex",


        flexDirection:"column",


        gap:"15px"


    },







    turn:{


        textAlign:"center",


        fontSize:"22px",


        fontWeight:"bold"


    },







    layout:{


        display:"flex",


        alignItems:"flex-start",


        gap:"20px",


        width:"100%"


    },







    field:{


        flex:1


    }


};








window.Game = Game;
