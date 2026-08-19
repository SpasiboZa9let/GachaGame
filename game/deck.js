/*
    Система колоды и гача-распределения
*/


/*
    Шансы выпадения редкости

    common      55%
    uncommon    25%
    rare        12%
    epic         5%
    legendary    3%

*/


const RARITY_CHANCES = [

    {
        rarity:"common",
        chance:55
    },

    {
        rarity:"uncommon",
        chance:25
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
        chance:3
    }

];






/*
    Получить случайную редкость
*/


function getRandomRarity(){


    const roll =
        Math.random() * 100;



    let total = 0;



    for(
        let item of RARITY_CHANCES
    ){


        total += item.chance;



        if(
            roll <= total
        ){

            return item.rarity;

        }

    }



    return "common";

}







/*
    Получить случайную карту нужной редкости
*/


function getRandomCardByRarity(){


    const rarity =
        getRandomRarity();



    const pool =

        CARDS.filter(

            card =>

                card.rarity === rarity

        );



    /*
        Если вдруг нет карт
        такой редкости
    */


    if(
        pool.length === 0
    ){

        return CARDS[

            Math.floor(
                Math.random()
                *
                CARDS.length
            )

        ];

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
    Создание боевой колоды


    Пока формат:
    20 случайных карт


*/


function createDeck(){


    const deck = [];



    for(
        let i = 0;
        i < 20;
        i++
    ){


        const card =
            getRandomCardByRarity();



        deck.push(
            card.id
        );


    }



    return shuffleDeck(deck);


}








/*
    Перемешивание
*/


function shuffleDeck(deck){


    const newDeck =
        [
            ...deck
        ];



    for(
        let i = newDeck.length - 1;
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


    Всегда 5 карт

*/


function drawStartingHand(deck, count = 5){


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
    Добор отключён


    Позже подключим
    нормальный draw
*/


function drawCard(
    state,
    playerId
){


    return state;


}








window.RARITY_CHANCES =
RARITY_CHANCES;


window.getRandomRarity =
getRandomRarity;


window.getRandomCardByRarity =
getRandomCardByRarity;


window.createDeck =
createDeck;


window.shuffleDeck =
shuffleDeck;


window.drawStartingHand =
drawStartingHand;


window.drawCard =
drawCard;
