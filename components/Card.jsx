/*
============================

Card.jsx

Игровая карта

Отвечает за:
- отображение карты
- стоимость
- название
- изображение
- характеристики
- редкость

Логики игры здесь нет

============================
*/


function Card({

    card,

    onClick,

    mode="hand"


}) {



    if(!card){

        return null;

    }





    const className =


        mode === "board"


        ?


        "card card-board"


        :


        "card card-hand";







    const rarity =


        card.rarity

        ?

        `rarity-${card.rarity}`

        :

        "";







    return (



        <div



            className={

                `${className} ${rarity}`

            }



            onClick={()=>{


                if(onClick){

                    onClick(card);

                }


            }}



        >







            {/* СТОИМОСТЬ */}


            <div className="card-cost">


                {card.cost || 0}


            </div>









            {/* НАЗВАНИЕ */}


            <div className="card-name">


                {card.name}



            </div>









            {/* АРТ */}


            <div className="card-image">



                {

                    card.image


                    ?


                    <img


                        src={card.image}


                        alt={card.name || ""}


                    />


                    :


                    <span>

                        АРТ

                    </span>


                }



            </div>









            {/* ХАРАКТЕРИСТИКИ */}



            <div className="card-stats">



                <span>


                    ⚔️

                    {

                        card.attack || 0

                    }


                </span>







                <span>


                    ❤️

                    {

                        card.health || 0

                    }


                </span>



            </div>









            {/* ФРАКЦИЯ */}



            {

                card.faction &&



                <div className="card-faction">


                    {card.faction}



                </div>


            }







        </div>



    );


}







window.Card = Card;
