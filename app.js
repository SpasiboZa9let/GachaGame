/*
    ============================
    APP.JS

    Запуск игры

    Отвечает за:

    - создание состояния
    - запуск боя
    - хранение текущего state
    - связь игровых систем

    UI подключается позже

    ============================
*/






function startGame(){



    const createState =

        window.State?.createInitialGameState

        ||

        window.createInitialGameState;





    if(
        typeof createState !== "function"
    ){

        console.error(
            "STATE.JS не загружен"
        );

        return null;

    }







    let state =

        createState();








    /*
        Тестовый режим

        временно оставляем

        потом удалить
    */


    if(
        typeof TEST_MODE !== "undefined"

        &&

        TEST_MODE

        &&

        typeof createTestBoard === "function"

    ){

        state =

            createTestBoard(state);

    }









    window.gameState = state;







    console.log(

        "GAME STARTED",

        state

    );







    return state;


}









function updateGameState(newState){



    if(!newState){

        return;

    }





    window.gameState = newState;



    return newState;


}









function getGameState(){



    return window.gameState || null;


}









/*
    Глобальный запуск
*/



window.Game =

window.Game || {};




window.Game.start =

startGame;




window.Game.updateState =

updateGameState;




window.Game.getState =

getGameState;









/*
    Автостарт

    после загрузки всех файлов

*/


window.addEventListener(

    "load",

    () => {


        startGame();


    }

);
