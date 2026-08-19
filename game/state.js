/*
    ============================
    STATE.JS

    Создание состояния игры

    Отвечает за:

    - выбор героев
    - создание колод
    - стартовую руку
    - игроков
    - поле боя

    НЕ содержит боевую логику
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









    return {



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



}









window.createInitialGameState =
createInitialGameState;
