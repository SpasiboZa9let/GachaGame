/*
    ============================
    DECK.JS

    Система создания колоды

    Тридевятое царство
    ============================
*/


window.Deck =
window.Deck || {};





const DECK_SIZE = 20;





const COPY_LIMITS = {


    common:2,

    uncommon:2,

    rare:2,

    epic:1,

    legendary:1


};







const RARITY_WEIGHTS = {


    common:55,

    uncommon:25,

    rare:12,

    epic:5,

    legendary:3


};









function getRandomRarity(){


    const roll =

        Math.random() * 100;



    let current = 0;




    for(
        let rarity in RARITY_WEIGHTS
    ){


        current +=

            RARITY_WEIGHTS[rarity];



        if(
            roll <= current
        ){

            return rarity;

        }


    }



    return "common";


}









function getRandomCard(
    usedCards
){



    if(
        typeof CARDS === "undefined"
        ||
        !Array.isArray(CARDS)
    ){

        return null;

    }





    const rarity =

        getRandomRarity();





    let pool =


        CARDS.filter(

            card =>


                card.rarity === rarity

                &&

                (
                    !usedCards[card.id]

                    ||

                    usedCards[card.id]

                    <

                    COPY_LIMITS[rarity]

                )


        );








    if(pool.length === 0){


        pool =


            CARDS.filter(

                card =>


                    !usedCards[card.id]

                    ||

                    usedCards[card.id]

                    <

                    COPY_LIMITS[card.rarity]


            );


    }






    if(pool.length === 0){

        return null;

    }






    return pool[

        Math.floor(

            Math.random()

            *

            pool.length

        )

    ];


}









function createDeck(){


    const deck = [];

    const usedCards = {};






    if(
        typeof CARDS === "undefined"
        ||
        !Array.isArray(CARDS)
    ){

        return deck;

    }









    const firstCardPool =


        CARDS.filter(

            card =>


                card.rarity === "rare"

                ||

                card.rarity === "epic"

                ||

                card.rarity === "legendary"


        );








    if(firstCardPool.length){



        const firstCard =


            firstCardPool[

                Math.floor(

                    Math.random()

                    *

                    firstCardPool.length

                )

            ];




        deck.push(

            firstCard.id

        );


        usedCards[firstCard.id]=1;


    }









    while(

        deck.length < DECK_SIZE

    ){



        const card =

            getRandomCard(

                usedCards

            );




        if(!card){

            break;

        }






        deck.push(

            card.id

        );





        usedCards[card.id] =

            (usedCards[card.id] || 0)

            + 1;


    }








    return shuffleDeck(deck);


}









function shuffleDeck(deck){



    const result =

        [...deck];






    for(
        let i=result.length-1;
        i>0;
        i--
    ){



        const j =


            Math.floor(

                Math.random()

                *

                (i+1)

            );






        [

            result[i],

            result[j]

        ] =

        [

            result[j],

            result[i]

        ];


    }






    return result;


}









function drawStartingHand(
    deck,
    count=5
){


    return {


        hand:

            deck.slice(
                0,
                count
            ),



        deck:

            deck.slice(
                count
            )


    };


}









function drawCard(
    state,
    playerId
){

    return state;

}













window.Deck.DECK_SIZE =

DECK_SIZE;


window.Deck.COPY_LIMITS =

COPY_LIMITS;


window.Deck.RARITY_WEIGHTS =

RARITY_WEIGHTS;



window.Deck.getRandomRarity =

getRandomRarity;


window.Deck.getRandomCard =

getRandomCard;


window.Deck.createDeck =

createDeck;


window.Deck.shuffleDeck =

shuffleDeck;


window.Deck.drawStartingHand =

drawStartingHand;


window.Deck.drawCard =

drawCard;
