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


        <div>





            <OpponentArea


                opponent={opponent}


                opponentHandCards={opponentHandCards}


                selectedAttacker={selectedAttacker}


                onOpponentUnitClick={onOpponentUnitClick}


                onOpponentHeroClick={onOpponentHeroClick}


            />









            <GameTurn


                selectedAttacker={selectedAttacker}


                turn={turn}


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





        </div>


    );


}







window.Battlefield = Battlefield;
