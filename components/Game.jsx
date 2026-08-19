/*
    ============================
    GAME.JSX

    Главный компонент игры

    Отвечает за:

    - состояние игры
    - управление ходом игрока
    - розыгрыш карт
    - выбор атакующего
    - атаки
    - вывод поля

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









    const handCards =


        (player.hand || [])

        .map(


            cardId =>


            window.Cards.getCardById(

                cardId

            )


        )


        .filter(Boolean);









    /*
        Разыграть карту
    */


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






        setGameState(

            newState

        );


    }









    /*
        Выбор своего существа
    */


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









    /*
        Атака существа противника
    */


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








        setGameState(

            newState

        );





        setSelectedAttacker(null);



    }









    /*
        Атака героя
    */


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







        setGameState(

            newState

        );







        setSelectedAttacker(null);


    }









    /*
        Завершение хода
    */


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







        setGameState(

            newState

        );





        setSelectedAttacker(null);


    }









    /*
        Перезапуск
    */


    function handleRestart(){



        setSelectedAttacker(null);




        setGameState(


            window.State.createInitialGameState()


        );


    }









    /*
        Тестовое поле
    */


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









<section>


<h3>

Противник

</h3>



<div

onClick={handleOpponentHeroClick}

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


onUnitClick={handleOpponentUnitClick}


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

style={gameStyles.button}

onClick={handleEndTurn}

>


Завершить ход


</button>








<button

style={gameStyles.button}

onClick={handleTestBoard}

>


🧪 Тестовое поле


</button>









<div style={gameStyles.log}>


<h4>

Лог боя

</h4>



{

(gameState.combatLog || [])

.slice(-10)

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








window.Game = Game;
