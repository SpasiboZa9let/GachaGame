/*
============================
Battlefield.jsx

Игровое поле

Отвечает за:
- противника
- игрока
- поле существ
- героев
- руки

Логики игры здесь нет

============================
*/


function Battlefield({


    player,

    opponent,

    handCards,

    opponentHandCards,

    selectedAttacker,

    onCardClick,

    onPlayerUnitClick,

    onOpponentUnitClick,

    onOpponentHeroClick,

    turn



}){


return (


<div className="battlefield">





    <section className="opponent-zone">


        <OpponentArea


            opponent={opponent}


            opponentHandCards={opponentHandCards}


            selectedAttacker={selectedAttacker}


            onOpponentUnitClick={onOpponentUnitClick}


            onOpponentHeroClick={onOpponentHeroClick}



        />


    </section>









    <section className="turn-zone">


        <GameTurn


            selectedAttacker={selectedAttacker}


            turn={turn}


        />


    </section>









    <section className="player-zone">


        <PlayerArea


            player={player}


            selectedAttacker={selectedAttacker}


            onPlayerUnitClick={onPlayerUnitClick}


        />


    </section>









    <section className="hand-zone">


        <PlayerHand


            cards={handCards}


            onCardClick={onCardClick}


        />


    </section>






</div>


);


}





window.Battlefield = Battlefield;
