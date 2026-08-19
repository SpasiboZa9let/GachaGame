/*
    Система создания колоды
    Тридевятое царство
*/


const DECK_SIZE = 20;



/*
    Максимум копий карты
*/


const COPY_LIMITS = {

    common: 2,

    uncommon: 2,

    rare: 2,

    epic: 1,

    legendary: 1

};





/*
    Вес редкостей
*/


const RARITY_WEIGHTS = {


    common:55,


    uncommon:25,


    rare:12,


    epic:5,


    legendary:3


};







/*
    Случайная редкость
*/


function getRandomRarity(){


    const roll =
        Math.random()*100;



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








/*
    Случайная карта
    с учетом лимита копий
*/


function getRandomCard(
    usedCards
){



    let rarity =
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





    /*
        если редкость закончилась,
        ищем любую доступную
    */


    if(
        pool.length===0
    ){


        pool =

        CARDS.filter(

            card =>

                (
                    !usedCards[card.id]

                    ||

                    usedCards[card.id]
                    <
                    COPY_LIMITS[card.rarity]

                )

        );


    }






    if(
        pool.length===0
    ){

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









/*
    Создание колоды
*/


function createDeck(){



    const deck = [];



    const usedCards = {};





    /*
    Гарантируем одну сильную карту
*/


const firstCardPool =

CARDS.filter(

    card =>

        card.rarity === "rare"
        ||
        card.rarity === "epic"
        ||
        card.rarity === "legendary"

);



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





while(

    deck.length <
    DECK_SIZE

){



        const card =
            getRandomCard(
                usedCards
            );



        if(!card)
            break;




        deck.push(
            card.id
        );



        if(
            !usedCards[card.id]
        ){

            usedCards[card.id]=0;

        }


        usedCards[card.id]++;



    }





    return shuffleDeck(deck);


}









/*
    Перемешивание
*/


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









/*
    Стартовая рука
*/


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









/*
    Добор пока отключен
*/


function drawCard(
    state,
    playerId
){

    return state;

}







window.DECK_SIZE =
DECK_SIZE;


window.createDeck =
createDeck;


window.shuffleDeck =
shuffleDeck;


window.drawStartingHand =
drawStartingHand;


window.drawCard =
drawCard;


window.getRandomRarity =
getRandomRarity;
