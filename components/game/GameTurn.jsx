/*
============================
GameTurn.jsx

Отображение текущего хода

Показывает:
- выбор цели при атаке
- номер текущего хода

============================
*/


function GameTurn({


    selectedAttacker,

    turn


}){


    return (


        <div style={window.gameStyles.turn}>


            {

                selectedAttacker

                ?

                "⚔️ Выберите цель"

                :

                "Ход: " + turn

            }


        </div>


    );


}




window.GameTurn = GameTurn;
