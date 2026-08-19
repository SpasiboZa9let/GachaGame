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

onClick={onRestart}

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




window.GameBoard = GameBoard;
