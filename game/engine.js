function createInitialGameState() {


    const playerHero =
        HEROES.find(
            hero =>
                hero.id ===
                "ilya_muromets"
        );


    const opponentHero =
        HEROES.find(
            hero =>
                hero.id ===
                "vasilisa_premudraya"
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


            hero:
                playerHero,


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


            hero:
                opponentHero,


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
) {


    return {


        ...state,


        combatLog:[

            ...(state.combatLog || []),

            message

        ]


    };


}




function checkGameOver(state) {


    if (!state) {
        return state;
    }


    if(state.gameOver){
        return state;
    }



    if(state.opponent.hp <=0){


        return {


            ...state,


            gameOver:true,


            winner:"player",


            combatLog:[

                ...state.combatLog,

                "Герой противника повержен.",

                "ПОБЕДА."

            ]

        };


    }




    if(state.player.hp <=0){


        return {


            ...state,


            gameOver:true,


            winner:"opponent",


            combatLog:[

                ...state.combatLog,

                "Ваш герой пал.",

                "ПОРАЖЕНИЕ."

            ]

        };


    }



    return state;

}





function getCardById(cardId){


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


    if(!card){
        return null;
    }



    return {


        instanceId:

            cardId +
            "_" +
            Date.now() +
            "_" +
            Math.random()
            .toString(36)
            .substring(2,8),



        cardId,


        attack:
            card.attack,


        health:
            card.health,


        maxHealth:
            card.health,


        defense:
            card.defense,


        strength:
            card.strength,


        canAttack:false,


        status:[]


    };


}




function getCardFromHand(
    player,
    cardId
){


    return player.hand.find(
        id =>
            id === cardId
    );


}





function playCard(
    state,
    playerId,
    cardId
){


    const player =
        state[playerId];


    if(
        state.activePlayer !== playerId
    ){
        return state;
    }



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



    if(
        player.mana < card.cost
    ){
        return state;
    }



    if(
        player.board.length >=5
    ){
        return state;
    }




    const unit =
        createCardInstance(cardId);




    return addCombatLog(


        {


            ...state,


            [playerId]:{


                ...player,


                mana:
                    player.mana-card.cost,


                hand:

                    player.hand.filter(
                        id =>
                            id!==cardId
                    ),


                board:[

                    ...player.board,

                    unit

                ]


            }


        },


        (
            playerId==="player"
            ?
            "Вы"
            :
            "Василиса"
        )
        +
        " сыграли "
        +
        card.name


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


window.playCard =
playCard;


window.restartGame =
restartGame;
