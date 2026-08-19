/*
    ============================
    ENGINE.JS

    Главный игровой движок

    Создание состояния игры
    Создание бойцов
    Розыгрыш карт
    Проверка победы

    Подготовка под:
    - амуницию
    - эффекты
    - фракции
    - баффы
    ============================
*/



/*
    ============================
    TEST MODE
    ============================
*/


const TEST_MODE = true;



function getTestHand(){


    if(!TEST_MODE){

        return null;

    }


    return [

        "medved",

        "razboynik",

        "kort_aika",

        "voin_pikhotinets",

        "lyagushka"

    ];


}





function getTestOpponentHand(){


    if(!TEST_MODE){

        return null;

    }


    return [

        "volk",

        "voin_s_kopem",

        "medved"

    ];


}









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
        Активация тестового режима
    */


    if(TEST_MODE){



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









function addCombatLog(
    state,
    text
){


    return {


        ...state,


        combatLog:[

            ...(state.combatLog || []),

            text

        ]

    };


}









function checkGameOver(state){



    if(
        state.player.hp <= 0
    ){


        return {


            ...state,


            gameOver:true,


            winner:"opponent"


        };


    }




    if(
        state.opponent.hp <= 0
    ){


        return {


            ...state,


            gameOver:true,


            winner:"player"


        };


    }




    return state;


}









function getCardById(id){


    return (

        CARDS.find(

            c => c.id === id

        )

        ||

        null

    );


}









/*
    Создание боевой единицы

    Карта -> Существо
*/


function createCardInstance(id){



    const card =

        getCardById(id);





    if(!card)

        return null;







    const baseStats = {



        attack:

            card.attack || 0,



        health:

            card.health || 0,



        maxHealth:

            card.health || 0,



        defense:

            card.defense || 0,



        strength:

            card.strength || 0



    };







    let unit = {



        instanceId:


            id +

            "_" +

            Date.now() +

            "_" +

            Math.random()

            .toString(36)

            .slice(2),




        cardId:id,



        name:

            card.name,



        rarity:

            card.rarity || "common",




        faction:

            card.faction || null,




        tags:

            card.tags || [],






        baseStats:{


            ...baseStats


        },






        stats:{


            ...baseStats


        },







        modifiers:[],







        equipment:[],







        effects:

            card.effects || [],







        status:[],







        canAttack:false



    };







    if(
        typeof refreshUnitStats === "function"
    ){

        unit =

            refreshUnitStats(unit);

    }






    return unit;


}









function playCard(
    state,
    playerId,
    cardId
){



    const player =

        state[playerId];




    const card =

        getCardById(cardId);





    if(!card)

        return state;





    if(
        player.mana < card.cost
    )

        return state;






    const unit =

        createCardInstance(cardId);






    if(!unit)

        return state;







    return {


        ...state,



        [playerId]:{


            ...player,



            mana:

                player.mana -

                card.cost,





            hand:


                player.hand.filter(

                    id => id !== cardId

                ),





            board:[


                ...player.board,


                unit


            ]



        }



    };


}









function preparePlayerTurn(state){



    return {


        ...state,



        activePlayer:"player",




        player:{



            ...state.player,





            maxMana:

                Math.min(

                    10,

                    state.player.maxMana + 1

                ),





            mana:

                Math.min(

                    10,

                    state.player.maxMana + 1

                ),





            board:


                state.player.board.map(

                    unit => ({


                        ...unit,


                        canAttack:true


                    })

                )



        }


    };


}









function prepareOpponentTurn(state){



    return {


        ...state,



        activePlayer:"opponent",




        opponent:{



            ...state.opponent,





            maxMana:

                Math.min(

                    10,

                    state.opponent.maxMana + 1

                ),





            mana:

                Math.min(

                    10,

                    state.opponent.maxMana + 1

                ),





            board:


                state.opponent.board.map(

                    unit => ({


                        ...unit,


                        canAttack:true


                    })

                )



        }


    };


}









window.createInitialGameState =
createInitialGameState;


window.addCombatLog =
addCombatLog;


window.checkGameOver =
checkGameOver;


window.getCardById =
getCardById;


window.createCardInstance =
createCardInstance;


window.playCard =
playCard;


window.preparePlayerTurn =
preparePlayerTurn;


window.prepareOpponentTurn =
prepareOpponentTurn;


window.restartGame =
createInitialGameState;


window.TEST_MODE =
TEST_MODE;
