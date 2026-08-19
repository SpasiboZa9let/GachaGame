/*
    Основной игровой движок
*/


function createInitialGameState(){


    const playerHero =
        HEROES.find(
            hero =>
                hero.id === "ilya_muromets"
        );


    const opponentHero =
        HEROES.find(
            hero =>
                hero.id === "vasilisa_premudraya"
        );



    const playerStart =
        drawStartingHand(
            createDeck(),
            5
        );



    const opponentStart =
        drawStartingHand(
            createDeck(),
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
                9000,


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








function addCombatLog(
    state,
    message
){


    return {


        ...state,


        combatLog:[

            ...(state.combatLog || []),

            message

        ]


    };


}









function checkGameOver(state){


    if(!state)
        return state;



    if(state.gameOver)
        return state;





    if(
        state.opponent.hp <= 0
    ){


        return {


            ...state,


            gameOver:true,


            winner:"player",


            opponent:{


                ...state.opponent,


                hp:0


            },


            combatLog:[

                ...(state.combatLog || []),

                "Герой противника повержен.",

                "ПОБЕДА."

            ]


        };


    }







    if(
        state.player.hp <=0
    ){


        return {


            ...state,


            gameOver:true,


            winner:"opponent",


            player:{


                ...state.player,


                hp:0


            },


            combatLog:[

                ...(state.combatLog || []),

                "Ваш герой пал.",

                "ПОРАЖЕНИЕ."

            ]


        };


    }



    return state;


}









function getCardById(cardId){


    if(
        !Array.isArray(CARDS)
    ){

        console.error(
            "Карты не загружены"
        );

        return null;

    }



    return (

        CARDS.find(

            card =>
                card.id === cardId

        )
        ||
        null

    );


}









function createCardInstance(cardId){



    const card =
        getCardById(cardId);



    if(!card)
        return null;





    return {


        instanceId:

            cardId
            +
            "_"
            +
            Date.now()
            +
            "_"
            +
            Math.random()
            .toString(36)
            .substring(2,8),



        cardId:cardId,



        attack:
            card.attack || 0,


        health:
            card.health || 0,


        maxHealth:
            card.health || 0,



        defense:
            card.defense || 0,



        strength:
            card.strength || 0,



        canAttack:false,



        status:[]



    };


}









function getCardFromHand(
    player,
    cardId
){


    if(
        !player ||
        !Array.isArray(player.hand)
    ){

        return null;

    }



    return player.hand.find(

        id =>
            id === cardId

    )
    ||
    null;


}









function playCard(
    state,
    playerId,
    cardId
){



    if(
        !state ||
        state.gameOver
    )
        return state;




    const player =
        state[playerId];



    if(!player)
        return state;




    if(
        state.activePlayer !== playerId
    )
        return state;





    if(
        !getCardFromHand(
            player,
            cardId
        )
    ){

        return state;

    }






    const card =
        getCardById(cardId);



    if(!card)
        return state;





    if(
        player.mana < card.cost
    ){

        console.log(
            "Недостаточно маны"
        );

        return state;

    }






    if(
        player.board.length >=5
    ){

        return state;

    }







    const unit =
        createCardInstance(
            cardId
        );



    if(!unit)
        return state;






    const newState = {


        ...state,


        [playerId]:{


            ...player,


            mana:

                player.mana -
                card.cost,



            hand:

                player.hand.filter(

                    id =>
                        id !== cardId

                ),



            board:[

                ...player.board,

                unit

            ]


        }


    };






    return addCombatLog(

        newState,


        (
            playerId==="player"
            ?
            "Вы"
            :
            "Василиса"
        )

        +

        " сыграли карту «"

        +

        card.name

        +

        "»."

    );

}









function restartGame(){


    return createInitialGameState();


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


window.getCardFromHand =
getCardFromHand;


window.playCard =
playCard;


window.restartGame =
restartGame;
