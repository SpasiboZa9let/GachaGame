/*
    ============================
    APP.JS

    Запуск игры

    Создание состояния
    Создание колод
    Старт матча
    Первичный вывод

    ============================
*/



window.addEventListener(
    "load",
    function(){


        console.log(
            "=== Тридевятое царство запускается ==="
        );



        /*
            Проверка ядра
        */


        console.log(
            "CARDS:",
            window.CARDS
        );


        console.log(
            "HEROES:",
            window.HEROES
        );


        console.log(
            "STATE:",
            window.GameState
        );



        /*
            Создание игры
        */


        let state = null;



        if(
            window.createGameState
        ){

            state =
                window.createGameState();


        }
        else {


            console.error(
                "createGameState не найден"
            );


            return;

        }



        window.GAME_STATE = state;



        console.log(
            "GAME STATE CREATED",
            state
        );



        /*
            Первичный экран
        */


        renderGame(
            state
        );



    }

);






function renderGame(state){


    let root =
        document.getElementById(
            "game"
        );


    if(!root){

        return;

    }



    root.innerHTML = `


        <h1>
        Тридевятое царство:
        Были и Сказки
        </h1>


        <hr>


        <h2>
        ${state.player.hero.name}
        </h2>


        <p>
        Здоровье:
        ${state.player.hp}
        </p>


        <p>
        Мана:
        ${state.player.mana}
        /
        ${state.player.maxMana}
        </p>



        <h3>
        Поле игрока
        </h3>


        <div>
        ${
            state.player.board.length
            ?
            state.player.board.map(
                unit =>
                unit.name
            ).join("<br>")
            :
            "Пусто"
        }
        </div>



        <h3>
        Рука
        </h3>


        <div>

        ${
            state.player.hand.map(
                card =>
                card.name
            ).join("<br>")
        }

        </div>



        <br>


        <button id="endTurn">

            Завершить ход

        </button>


    `;



    let button =
        document.getElementById(
            "endTurn"
        );


    if(button){


        button.onclick =
            function(){


                if(
                    window.endTurn
                ){

                    window.endTurn(
                        state
                    );


                    renderGame(
                        state
                    );

                }


            };


    }



}
