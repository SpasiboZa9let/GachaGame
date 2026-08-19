/*
============================
GameControls.jsx

Кнопки управления боем

============================
*/


function GameControls({

    onEndTurn,

    onTestBoard

}){


    return (

        <>


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


        </>

    );


}



window.GameControls = GameControls;
