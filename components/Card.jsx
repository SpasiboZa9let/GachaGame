function Card({ 
    card, 
    onClick,
    mode="hand"
}) {


    if (!card) {
        return null;
    }



    const className =

        mode === "board"

        ?

        "card card-board"

        :

        "card card-hand";





    return (


        <div

            className={className}

            onClick={() =>
                onClick &&
                onClick(card)
            }

        >



            <div className="card-cost">

                {card.cost}

            </div>




            <div className="card-name">

                {card.name}

            </div>





            <div className="card-image">


                {
                    card.image

                    ?

                    <img

                        src={card.image}

                        alt=""

                    />

                    :

                    <span>
                        АРТ
                    </span>

                }


            </div>





            <div className="card-stats">


                <span>
                    ⚔️ {card.attack}
                </span>


                <span>
                    ❤️ {card.health}
                </span>


            </div>


        </div>


    );

}



window.Card = Card;
