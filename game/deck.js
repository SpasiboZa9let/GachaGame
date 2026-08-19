/*
    ============================
    DECK.JS

    Генерация колод
    Рандомные карты
    Гача-шансы
    ============================
*/


/*
    Шансы редкости
*/

const RARITY_CHANCES = [

    {
        rarity:"common",
        chance:60
    },

    {
        rarity:"uncommon",
        chance:22
    },

    {
        rarity:"rare",
        chance:12
    },

    {
        rarity:"epic",
        chance:5
    },

    {
        rarity:"legendary",
        chance:1
    }

];





/*
    Получение случайной редкости
*/

function getRandomRarity(){


    const roll =
        Math.random() * 100;



    let current = 0;



    for(
        const item of RARITY_CHANCES
    ){

        current += item.chance;


        if(
            roll <= current
        ){

            return item.rarity;

        }

    }



    return "common";

}







/*
    Получение карты по редкости
*/


function getRandomCardByRarity(
    rarity
){

    const cards =

        CARDS.filter(

            card =>
                card.rarity === rarity

        );



    if(
        cards.length === 0
    ){

        return null;

    }



    return cards[

        Math.floor(

            Math.random()
            *
            cards.length

        )

    ];

}







/*
    Получение любой случайной карты
*/


function getRandomCard(){


    const rarity =
        getRandomRarity();



    let card =
        getRandomCardByRarity(
            rarity
        );



    /*
        если вдруг нет карты
        такой редкости
    */


    if(!card){

        card =
            CARDS[

                Math.floor(

                    Math.random()
                    *
                    CARDS.length

                )

            ];

    }



    return card;

}








/*
    Создание колоды

    30 карт
*/

function createDeck(){


    const deck = [];



    for(
        let i = 0;
        i < 30;
        i++
    ){

        const card =
            getRandomCard();



        if(card){

            deck.push(
                card.id
            );

        }

    }



    return shuffleDeck(
        deck
    );

}








/*
    Перемешивание
*/


function shuffleDeck(deck){


    const newDeck =
        [...deck];



    for(
        let i =
            newDeck.length - 1;

        i > 0;

        i--
    ){

        const j =
            Math.floor(
                Math.random()
                *
                (i + 1)
            );


        [
            newDeck[i],
            newDeck[j]

        ] =
        [
            newDeck[j],
            newDeck[i]
        ];

    }



    return newDeck;

}








/*
    Стартовая рука
*/


function createStartingHand(){


    const hand = [];



    for(
        let i = 0;
        i < 5;
        i++
    ){

        const card =
            getRandomCard();



        if(card){

            hand.push(
                card.id
            );

        }

    }





    /*
        3% шанс легендарки
    */


    if(
        Math.random() < 0.03
    ){

        const legendary =
            getRandomCardByRarity(
                "legendary"
            );


        if(
            legendary &&
            hand.length > 0
        ){

            const index =
                Math.floor(
                    Math.random()
                    *
                    hand.length
                );


            hand[index] =
                legendary.id;

        }

    }



    return hand;

}








/*
    Добор карты
*/


function drawCard(
    state,
    playerId
){


    const player =
        state[playerId];



    if(
        !player ||
        !player.deck ||
        player.deck.length === 0
    ){

        return state;

    }



    const cardId =
        player.deck[0];



    return {


        ...state,


        [playerId]:{


            ...player,


            deck:

                player.deck.slice(1),



            hand:

                [
                    ...player.hand,

                    cardId

                ]


        }


    };

}








window.getRandomRarity =
    getRandomRarity;


window.getRandomCardByRarity =
    getRandomCardByRarity;


window.getRandomCard =
    getRandomCard;


window.createDeck =
    createDeck;


window.shuffleDeck =
    shuffleDeck;


window.createStartingHand =
    createStartingHand;


window.drawCard =
    drawCard;
