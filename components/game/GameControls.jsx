/*
============================
GameControls.jsx

Кнопки управления боем

Отвечает за:
- завершение хода
- запуск тестового поля

Логику не содержит
============================
*/


function GameControls({


    onEndTurn,

    onTestBoard


}){


    return (


        <>


            <button

                style={window.gameStyles.button}

                onClick={onEndTurn}

            >

                Завершить ход

            </button>






            <button

                style={window.gameStyles.button}

                onClick={onTestBoard}

            >

                🧪 Тестовое поле

            </button>


        </>


    );


}




window.GameControls = GameControls;
