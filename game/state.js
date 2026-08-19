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





function safeNumber(
    value,
    fallback
){


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





    const heroes =

        window.Heroes?.list

        ||

        window.HEROES

        ||

        [];







    const playerHero =


        heroes.find(

            h =>

            h.id === "ilya_muromets"

        )

        ||

        {


            id:"unknown",


            name:"Неизвестный герой",


            maxHealth:10000


        };








    const opponentHero =


        heroes.find(

            h =>

            h.id === "vasilisa_premudraya"

        )

        ||

        {


            id:"unknown",


            name:"Неизвестный герой",


            maxHealth:9000


        };









    const createDeckFunction =


        window.Deck?.createDeck

        ||

        window.createDeck;






    const shuffleFunction =


        window.Deck?.shuffleDeck

        ||

        window.shuffleDeck;








    const playerDeck =


        shuffleFunction(

            createDeckFunction()

        );






    const opponentDeck =


        shuffleFunction(

            createDeckFunction()

        );








    const drawHand =


        window.Deck?.drawStartingHand

        ||

        window.drawStartingHand;








    const playerStart =


        drawHand(

            playerDeck,

            5

        );








    const opponentStart =


        drawHand(

            opponentDeck,

            5

        );









    const state = {



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









    console.log(

        "STATE CREATED",

        {


            playerHP:

                state.player.hp,



            opponentHP:

                state.opponent.hp



        }

    );








    return state;


}









window.State =

window.State || {};




window.State.createInitialGameState =

createInitialGameState;
