/*
============================

PlayerHand.jsx

Рука игрока

Отвечает за:
- отображение карт игрока
- клики по картам

Логики игры нет

============================
*/


function PlayerHand({

    cards,

    onCardClick


}){


    return (


        <div className="player-hand">



            {

                (cards || []).map((card,index)=>(


                    <Card


                        key={

                            card.id + "_" + index

                        }


                        card={card}


                        mode="hand"


                        onClick={onCardClick}


                    />


                ))


            }



        </div>


    );


}




window.PlayerHand = PlayerHand;
