/*
============================
GameOver.jsx

Экран окончания боя

Показывает:
- победу
- поражение
- кнопку рестарта

============================
*/


function GameOver({

    gameState,

    onRestart

}){


    if(!gameState.gameOver){

        return null;

    }





    return (


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


    );


}





window.GameOver = GameOver;
