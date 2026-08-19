/*
============================
PlayerArea.jsx

Область игрока

Показывает:
- имя игрока
- поле существ
- героя

Логика боя остаётся в Game.jsx

============================
*/


function PlayerArea({


    player,

    selectedAttacker,

    onPlayerUnitClick


}){


    return (


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


    );


}




window.PlayerArea = PlayerArea;
