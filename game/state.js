/*
    ============================
    STATE.JS

    Создание состояния игры

    Создает:
    - героев
    - колоды
    - руки
    - здоровье
    - ману
    - поле

    Подготовка под:
    - режимы игры
    - сохранения
    - загрузку боя
    ============================
*/



function safeNumber(value, fallback){

    return (
        typeof value === "number"
        &&
        !isNaN(value)
    )
    ?
    value
    :
    fallback;

}





function createInitialGameState(){



    const playerHero =

        HEROES.find(

            h => h.id === "ilya_muromets"

        )
        ||
        {

            id:"unknown",

            name:"Неизвестный герой",

            maxHealth:10000

        };





    const opponentHero =

        HEROES.find(

            h => h.id === "vasilisa_premudraya"

        )
        ||
        {

            id:"unknown",

            name:"Неизвестный герой",

            maxHealth:9000

        };






    let playerDeck =

        shuffleDeck(

            createDeck()

        );



    let opponentDeck =

        shuffleDeck(

            createDeck()

        );






    const playerStart =

        drawStartingHand(

            playerDeck,

            5

        );





    const opponentStart =

        drawStartingHand(

            opponentDeck,

            5

        );






    let state = {



        turn:1,


        activePlayer:"player",


        gameOver:false,


        winner:null,



        combatLog:[

            "Бой начинается."

        ],




        player:{


            hero:playerHero,


            hp:

                safeNumber(

                    playerHero.maxHealth,

                    10000

                ),



            mana:1,


            maxMana:1,



            deck:

                playerStart.deck || [],



            hand:

                playerStart.hand || [],



            board:[]



        },







        opponent:{



            hero:opponentHero,



            hp:

                safeNumber(

                    opponentHero.maxHealth,

                    9000

                ),



            mana:1,


            maxMana:1,



            deck:

                opponentStart.deck || [],



            hand:

                opponentStart.hand || [],



            board:[]



        }



    };









    /*
        ТЕСТОВЫЙ РЕЖИМ
    */



    if(

        typeof TEST_MODE !== "undefined"

        &&

        TEST_MODE

    ){



        state.player.hand =

            typeof getTestHand === "function"

            ?

            getTestHand()

            :

            [];





        state.opponent.hand =

            typeof getTestOpponentHand === "function"

            ?

            getTestOpponentHand()

            :

            [];





        state.player.mana = 10;

        state.player.maxMana = 10;





        state.opponent.mana = 10;

        state.opponent.maxMana = 10;





        state.combatLog.push(

            "🧪 Тестовый режим активирован."

        );


    }







    console.log(

        "STATE CREATED",

        {

            playerHP:state.player.hp,

            opponentHP:state.opponent.hp,

            playerHero:state.player.hero,

            opponentHero:state.opponent.hero

        }

    );







    return state;


}







window.State =

window.State || {};



window.State.createInitialGameState =

createInitialGameState;
