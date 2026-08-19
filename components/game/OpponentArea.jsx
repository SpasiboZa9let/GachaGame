function OpponentArea({
    opponent,
    opponentHandCards,
    onHeroClick,
    onUnitClick,
    selectedAttacker
}) {


    return (

        <section style={styles.container}>


            <h3>
                Противник
            </h3>





            <OpponentHand

    cards={opponentHandCards}

/>







            <div

                onClick={onHeroClick}

                style={

                    selectedAttacker

                    ?

                    styles.target

                    :

                    {}

                }

            >


                <Hero

                    hero={opponent.hero}

                    hp={opponent.hp}

                    mana={opponent.mana}

                    maxMana={opponent.maxMana}

                />


            </div>







            <Board


                units={opponent.board || []}


                onUnitClick={onUnitClick}


                selectedUnitId={null}


            />



        </section>

    );


}








const styles = {


    container:{


        width:"100%",


        display:"flex",


        flexDirection:"column",


        alignItems:"center",


        gap:"10px"


    },



    target:{


        cursor:"crosshair",


        filter:
            "drop-shadow(0 0 15px red)"


    }


};








window.OpponentArea = OpponentArea;
