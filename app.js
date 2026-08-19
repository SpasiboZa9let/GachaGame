/*
    ============================
    APP.JS

    Точка запуска игры

    Отвечает за:
    
    - запуск React
    - создание Game
    - подключение к DOM

    ============================
*/



const rootElement =

    document.getElementById(
        "root"
    );






if(!rootElement){


    console.error(
        "ROOT элемент не найден"
    );


}







else {



    const root =

        ReactDOM.createRoot(
            rootElement
        );






    root.render(

        React.createElement(
            
            Game

        )

    );


}
