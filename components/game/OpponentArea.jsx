/*
============================
OpponentArea.jsx

Область противника

Показывает:
- имя противника
- руку
- героя
- поле существ

Логика боя остаётся в Game.jsx

============================
*/


function OpponentArea({


    opponent,

    opponentHandCards,

    selectedAttacker,

    onOpponentUnitClick,

    onOpponentHeroClick


}){



    return (


        <section>


            <h3>

                Противник

            </h3>





            <OpponentHand

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


    );


}




window.OpponentArea = OpponentArea;
