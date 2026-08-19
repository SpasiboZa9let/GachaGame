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





function createInitialGameState(){



    const playerHero =

        HEROES.find(

            h => h.id === "ilya_muromets"

        );





    const opponentHero =

        HEROES.find(

            h => h.id === "vasilisa_premudraya"

        );









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


                playerHero

                ?

                playerHero.maxHealth

                :

                10000,





            mana:1,



            maxMana:1,





            deck:

                playerStart.deck,





            hand:

                playerStart.hand,





            board:[]



        },









        opponent:{



            hero:opponentHero,




            hp:


                opponentHero

                ?

                opponentHero.maxHealth

                :

                10000,





            mana:1,



            maxMana:1,





            deck:

                opponentStart.deck,





            hand:

                opponentStart.hand,





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

            getTestHand();





        state.opponent.hand =

            getTestOpponentHand();







        state.player.mana = 10;


        state.player.maxMana = 10;





        state.opponent.mana = 10;


        state.opponent.maxMana = 10;







        state.combatLog.push(


            "🧪 Тестовый режим активирован."


        );


    }









    return state;


}








window.createInitialGameState =
createInitialGameState;
