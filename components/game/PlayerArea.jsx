function PlayerArea({
    player,
    handCards,
    onCardClick,
    onUnitClick,
    selectedAttacker
}) {


    return (

        <section style={styles.container}>


            <h3>
                Игрок
            </h3>







            <Board


                units={player.board || []}


                onUnitClick={onUnitClick}


                selectedUnitId={selectedAttacker}


            />








            <Hero

                hero={player.hero}

                hp={player.hp}

                mana={player.mana}

                maxMana={player.maxMana}

            />









            <Hand


                cards={handCards}


                onCardClick={onCardClick}


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


    }


};








window.PlayerArea = PlayerArea;
